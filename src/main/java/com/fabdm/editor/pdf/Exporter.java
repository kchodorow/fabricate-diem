package com.fabdm.editor.pdf;

import com.fabdm.project.Anchor;
import com.fabdm.project.Model;
import com.fabdm.project.Piece;
import com.fabdm.project.Project;
import com.fabdm.project.Vector2;
import com.google.common.base.Preconditions;
import com.google.common.collect.ImmutableList;
import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Font;
import com.itextpdf.text.FontFactory;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.pdf.PdfContentByte;
import com.itextpdf.text.pdf.PdfWriter;

import java.io.Closeable;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.util.List;

/**
 * Exports a pattern to a PDF.
 */
public class Exporter {
    private final Document document;
    private final Project project;

    Exporter(Project project) {
        this.document = new Document(PageSize.LETTER);
        this.project = project;
    }

    private void drawPattern(Model model, PdfContentByte canvas) {
        List<Piece> pieces = model.pieces();
        for (Piece piece : pieces) {
            List<Anchor> anchors = piece.anchors();
            Preconditions.checkState(anchors.size() >= 1);
            Anchor start = anchors.get(0);
            Anchor end;
            canvas.moveTo(start.anchor().xAsPixels(), start.anchor().yAsPixels());
            for (int i = 0; i < anchors.size() - 1; ++i) {
                start = anchors.get(i);
                end = anchors.get(i + 1);
                canvas.curveTo(
                        start.ccwCp().xAsPixels(), start.ccwCp().yAsPixels(),
                        end.cwCp().xAsPixels(), end.cwCp().yAsPixels(),
                        end.anchor().xAsPixels(), end.anchor().yAsPixels());
            }
            start = anchors.get(anchors.size() - 1);
            end = anchors.get(0);
            canvas.curveTo(
                    start.ccwCp().xAsPixels(), start.ccwCp().yAsPixels(),
                    end.cwCp().xAsPixels(), end.cwCp().yAsPixels(),
                    end.anchor().xAsPixels(), end.anchor().yAsPixels());

        }
        canvas.stroke();
    }

    String generate(Model model) throws PdfException {
        String filename = project.getUri() + ".pdf";
        try (CloseablePdf pdf = new CloseablePdf(document, filename)) {
            addPreamble(document);
            drawPattern(model, pdf.getWriter().getDirectContent());
        }
        return filename;
    }

    private void addPreamble(Document document) throws PdfException {
        Font titleFont = FontFactory.getFont(FontFactory.HELVETICA, 16, Font.BOLDITALIC);
        Chunk fabdm = new Chunk("Fabricate Diem", titleFont);
        Chunk title = new Chunk(project.getDescription(), titleFont);
        try {
            document.add(fabdm);
            document.add(title);
        } catch (DocumentException e) {
            throw new PdfException(e.getMessage());
        }
    }

    private class CloseablePdf implements Closeable {
        private final Document document;
        private final PdfWriter writer;

        CloseablePdf(Document document, String filename) throws PdfException {
            this.document = document;
            FileOutputStream fos;
            try {
                fos = new FileOutputStream(filename);
            } catch (FileNotFoundException e) {
                throw new PdfException(e.getMessage());
            }
            try {
                this.writer = PdfWriter.getInstance(document, fos);
            } catch (DocumentException e) {
                throw new PdfException(e.getMessage());
            }
            document.open();
        }

        PdfWriter getWriter() {
            return writer;
        }

        @Override
        public void close() {
            document.close();
        }
    }

    class PdfException extends Exception {
        PdfException(String message) {
            super("Error generating PDF: " + message);
        }
    }

    public static void main(String args[]) throws PdfException {
        Model model = Model.create(ImmutableList.of(
            Piece.create("piece", ImmutableList.of(
                Anchor.create(
                    "whatever",
                    Vector2.create(100, 100),
                    Vector2.create(20, 200),
                    Vector2.create(180, 200))), ImmutableList.of())));
        new Exporter(new Project()).generate(model);
    }
}
