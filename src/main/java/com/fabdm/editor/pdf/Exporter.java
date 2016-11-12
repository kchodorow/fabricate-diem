package com.fabdm.editor.pdf;

import com.fabdm.project.Model;
import com.fabdm.project.Anchor;
import com.fabdm.project.Piece;
import com.fabdm.project.Vector2;
import com.google.common.base.Preconditions;
import com.google.common.collect.ImmutableList;
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
        ImmutableList<Piece> pieces = model.pieces();
        for (Piece piece : pieces) {
            ImmutableList<Anchor> anchors = piece.anchors();
            Preconditions.checkState(anchors.size() >= 1);
            Anchor start = anchors.get(0);
            Anchor end;
            canvas.moveTo(start.anchor().x(), start.anchor().y());
            for (int i = 0; i < anchors.size() - 1; ++i) {
                start = anchors.get(i);
                end = anchors.get(i + 1);
                canvas.curveTo(
                        start.ccwcp().x(), start.ccwcp().y(),
                        end.cwcp().x(), end.cwcp().y(),
                        end.anchor().x(), end.anchor().y());
            }
            start = anchors.get(anchors.size() - 1);
            end = anchors.get(0);
            canvas.curveTo(
                    start.ccwcp().x(), start.ccwcp().y(),
                    end.cwcp().x(), end.cwcp().y(),
                    end.anchor().x(), end.anchor().y());

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

        Model model = Model.create(ImmutableList.of(
                Piece.create("piece", ImmutableList.of(
                        Anchor.create(
                                "whatever",
                                Vector2.create(100, 100),
                                Vector2.create(20, 200),
                                Vector2.create(180, 200))), ImmutableList.of())));
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
