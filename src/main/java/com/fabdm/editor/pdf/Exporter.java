package com.fabdm.editor.pdf;

import com.fabdm.editor.Model;
import com.fabdm.editor.Model.Anchor;
import com.fabdm.editor.Model.Piece;
import com.google.common.base.Preconditions;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.pdf.PdfContentByte;
import com.itextpdf.text.pdf.PdfWriter;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;

/**
 * Exports a pattern to a PDF.
 */
public class Exporter {
    private final Document document = new Document(PageSize.LETTER);
    private PdfWriter writer;

    Exporter() {
        try {
            this.writer = PdfWriter.getInstance(document, new FileOutputStream("foo.pdf"));
        } catch (DocumentException | FileNotFoundException e) {
            e.printStackTrace();
        }
    }

    void drawPattern(Model model, PdfContentByte canvas) {
        Piece pieces[] = model.getPieces();
        for (Piece piece : pieces) {
            Anchor anchors[] = piece.getAnchors();
            Preconditions.checkState(anchors.length >= 1);
            Anchor start = anchors[0];
            Anchor end;
            canvas.moveTo(start.getAnchor().x, start.getAnchor().y);
            for (int i = 0; i < anchors.length - 1; ++i) {
                start = anchors[i];
                end = anchors[i + 1];
                canvas.curveTo(
                        start.getCcwcp().x, start.getCcwcp().y,
                        end.getCwcp().x, end.getCwcp().y,
                        end.getAnchor().x, end.getAnchor().y);
            }
            start = anchors[anchors.length - 1];
            end = anchors[0];
            canvas.curveTo(
                    start.getCcwcp().x, start.getCcwcp().y,
                    end.getCwcp().x, end.getCwcp().y,
                    end.getAnchor().x, end.getAnchor().y);

        }
        canvas.stroke();
    }

    void drawGrid(PdfContentByte canvas) {
        for (float x = 0; x < PageSize.LETTER.getWidth(); x+=72f) {
            for (float y = 0; y < PageSize.LETTER.getHeight(); y+=72f) {
                canvas.circle(x, y, 1f);
            }
        }
        canvas.fill();

        Model model = new Model(new Piece[]{
                new Piece(new Anchor[]{
                        new Anchor(
                                new Model.Vector2(100, 100),
                                new Model.Vector2(20, 200),
                                new Model.Vector2(180, 200))})});
        drawPattern(model, canvas);
    }

    void generate() {
        document.open();
        drawGrid(writer.getDirectContent());
        document.close();
    }

    public static void main(String args[]) {
        new Exporter().generate();
    }

}
