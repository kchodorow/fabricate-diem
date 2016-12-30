package com.fabdm.editor.pdf;

import com.fabdm.project.Model;
import com.fabdm.project.Piece;
import com.fabdm.project.Project;
import com.fabdm.project.Vector2;
import com.google.common.base.Preconditions;
import com.google.common.collect.Lists;
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

    private static int inchesToPixels(double inches) {
        return (int) (inches * Vector2.PIXELS_PER_INCH);
    }

    // TODO: make seam allowance customizable.
    private final int SEAM_ALLOWANCE = inchesToPixels(5.0 / 8.0);
    private final Document document;
    private final Project project;

    Exporter(Project project) {
        this.document = new Document(PageSize.LETTER);
        this.project = project;
    }

    private void drawPattern(Model model, PdfContentByte canvas) {
        List<Piece> pieces = model.pieces();
        for (Piece piece : pieces) {
            PixelPiece pixelPiece = PixelPiece.create(piece.anchors());
            List<PixelAnchor> seamAllowance = expand(pixelPiece);
            PdfPieceIterator pdfIterator = new PdfPieceIterator(piece);
            for (PdfPage page : pdfIterator) {
                document.newPage();
                drawPieceOnPage(pixelPiece.anchors(), page, canvas);
                drawPieceOnPage(seamAllowance, page, canvas);
            }
        }
    }

    private List<PixelAnchor> expand(PixelPiece piece) {
        List<PixelAnchor> anchors = piece.anchors();
        List<PixelAnchor> allowanceAnchors = Lists.newArrayList();
        int numAnchors = anchors.size();
        for (int i = 0; i < numAnchors; ++i) {
            PixelAnchor anchor = anchors.get(i);
            Vector2 anchorPt = anchor.anchor();
            Vector2 normalCw = getNormal(
                anchors.get(i), anchors.get((i + 1) % numAnchors), Expander.NEAR_P0);
            Vector2 normalCcw = getNormal(
                getPrev(anchors, i), anchors.get(i), Expander.NEAR_P3);
            Vector2 sum = Vector2.create(
                normalCw.x() + normalCcw.x(), normalCw.y() + normalCcw.y());
            Vector2 unitVec = Vector2.getNormalizedVector(sum);

            double offsetX = unitVec.x() * SEAM_ALLOWANCE;
            double offsetY = unitVec.y() * SEAM_ALLOWANCE;
            Vector2 newAnchor = Vector2.create(
                anchorPt.x() + offsetX, anchorPt.y() + offsetY);
            Vector2 newCwCp = Vector2.create(
                anchor.cwCp().x() + offsetX, anchor.cwCp().y() + offsetY);
            Vector2 newCcwCp = Vector2.create(
                anchor.ccwCp().x() + offsetX, anchor.ccwCp().y() + offsetY);
            PixelAnchor newAnchorPt = PixelAnchor.create(newAnchor, newCwCp, newCcwCp);
            allowanceAnchors.add(newAnchorPt);
        }
        return allowanceAnchors;
    }

    private PixelAnchor getPrev(List<PixelAnchor> anchors, int i) {
        if (i == 0) {
            return anchors.get(anchors.size() - 1);
        }
        return anchors.get(i - 1);
    }

    private Expander createExpander(PixelAnchor start, PixelAnchor end) {
        Vector2 p0 = start.anchor();
        Vector2 p1 = start.cwCp();
        Vector2 p2 = end.ccwCp();
        Vector2 p3 = end.anchor();
        return new Expander(p0, p1, p2, p3);
    }

    private Vector2 getNormal(PixelAnchor start, PixelAnchor end, double t) {
        return createExpander(start, end).getNormal(t);
    }

    private void drawPieceOnPage(List<PixelAnchor> anchors, PdfPage page, PdfContentByte canvas) {
        Preconditions.checkState(anchors.size() >= 1);
        PixelAnchor start = anchors.get(0);
        PixelAnchor end;
        canvas.moveTo(
            start.anchor().x() + page.offsetX(),
            start.anchor().y() + page.offsetY());
        for (int i = 1; i < anchors.size(); ++i) {
            end = anchors.get(i);
            canvas.curveTo(
                start.cwCp().x() + page.offsetX(),
                start.cwCp().y() + page.offsetY(),
                end.ccwCp().x() + page.offsetX(),
                end.ccwCp().y() + page.offsetY(),
                end.anchor().x() + page.offsetX(),
                end.anchor().y() + page.offsetY());
            start = end;
        }
        end = anchors.get(0);
        canvas.curveTo(
            start.cwCp().x() + page.offsetX(),
            start.cwCp().y() + page.offsetY(),
            end.ccwCp().x() + page.offsetX(),
            end.ccwCp().y() + page.offsetY(),
            end.anchor().x() + page.offsetX(),
            end.anchor().y() + page.offsetY());

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
            document.add(new Paragraph(project.getTitle(), titleFont));
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
