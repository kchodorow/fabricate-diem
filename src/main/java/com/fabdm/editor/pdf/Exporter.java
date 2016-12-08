package com.fabdm.editor.pdf;

import com.fabdm.project.Anchor;
import com.fabdm.project.Model;
import com.fabdm.project.Piece;
import com.fabdm.project.Project;
import com.google.common.base.Preconditions;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Font;
import com.itextpdf.text.FontFactory;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
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
            PdfPieceIterator pdfIterator = new PdfPieceIterator(piece);
            for (PdfPage page : pdfIterator) {
                document.newPage();
                drawPieceOnPage(piece, page, canvas);
            }
        }
    }

    private void drawPieceOnPage(Piece piece, PdfPage page, PdfContentByte canvas) {
        List<Anchor> anchors = piece.anchors();
        Preconditions.checkState(anchors.size() >= 1);
        Anchor start = anchors.get(0);
        Anchor end;
        canvas.moveTo(
            start.anchor().xAsPixels() + page.offsetX(),
            start.anchor().yAsPixels() + page.offsetY());
        for (int i = 1; i < anchors.size(); ++i) {
            end = anchors.get(i);
            canvas.curveTo(
                start.cwCp().xAsPixels() + page.offsetX(),
                start.cwCp().yAsPixels() + page.offsetY(),
                end.ccwCp().xAsPixels() + page.offsetX(),
                end.ccwCp().yAsPixels() + page.offsetY(),
                end.anchor().xAsPixels() + page.offsetX(),
                end.anchor().yAsPixels() + page.offsetY());
            start = end;
        }
        end = anchors.get(0);
        canvas.curveTo(
            start.cwCp().xAsPixels() + page.offsetX(),
            start.cwCp().yAsPixels() + page.offsetY(),
            end.ccwCp().xAsPixels() + page.offsetX(),
            end.ccwCp().yAsPixels() + page.offsetY(),
            end.anchor().xAsPixels() + page.offsetX(),
            end.anchor().yAsPixels() + page.offsetY());
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
        Font descFont = FontFactory.getFont(FontFactory.HELVETICA, 12, Font.ITALIC);
        try {
            document.add(new Paragraph("Fabricate Diem", descFont));
            document.add(new Paragraph(project.getDescription(), titleFont));
            document.add(new Paragraph("http://www.fabdm.com/TODO/" + project.getUri(), descFont));
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
}
