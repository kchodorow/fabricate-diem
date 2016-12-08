package com.fabdm.editor.pdf;

import com.fabdm.project.Anchor;
import com.fabdm.project.Piece;
import com.fabdm.project.Vector2;
import com.google.auto.value.AutoValue;
import com.itextpdf.text.PageSize;

import java.util.Iterator;
import java.util.List;

/**
 * A wrapper for Piece with helpers for converting it to PDF representation.
 */
class PdfPieceIterator implements Iterable<PdfPage>, Iterator<PdfPage> {

    private final int pagesHigh;
    private int currentPageX = 0;
    private int currentPageY = 0;
    private int current = 0;
    private int total;

    PdfPieceIterator(Piece piece) {
        Vector2 min = getMin(piece.anchors());
        Vector2 max = getMax(piece.anchors());
        double width = max.xAsPixels() - min.xAsPixels();
        double height = max.yAsPixels() - min.yAsPixels();
        int pagesWide = (int) Math.ceil(width / PageSize.LETTER.getWidth());
        this.pagesHigh = (int) Math.ceil(height / PageSize.LETTER.getHeight());
        this.total = pagesWide * pagesHigh;
        currentPageY = pagesHigh - 1;
    }

    @Override
    public Iterator<PdfPage> iterator() {
        return this;
    }

    @Override
    public boolean hasNext() {
        return current < total;
    }

    @Override
    public PdfPage next() {
        PdfPage page = PdfPage.create(
            -currentPageX * PageSize.LETTER.getWidth(),
            -currentPageY * PageSize.LETTER.getHeight());

        currentPageY--;
        if (currentPageY == 0) {
            currentPageX++;
            currentPageY = pagesHigh - 1;
        }
        current++;
        return page;
    }

    private Vector2 getMin(List<Anchor> anchors) {
        double minX = Double.MAX_VALUE;
        double minY = Double.MAX_VALUE;
        for (Anchor anchor : anchors) {
            if (anchor.anchor().x() < minX) {
                minX = anchor.anchor().x();
            }
            if (anchor.cwCp().x() < minX) {
                minX = anchor.cwCp().x();
            }
            if (anchor.ccwCp().x() < minX) {
                minX = anchor.ccwCp().x();
            }

            if (anchor.anchor().y() < minY) {
                minY = anchor.anchor().x();
            }
            if (anchor.cwCp().y() < minY) {
                minY = anchor.cwCp().y();
            }
            if (anchor.ccwCp().y() < minY) {
                minY = anchor.ccwCp().y();
            }
        }
        return Vector2.create(minX, minY);
    }

    private Vector2 getMax(List<Anchor> anchors) {
        double maxX = Double.MIN_VALUE;
        double maxY = Double.MIN_VALUE;
        for (Anchor anchor : anchors) {
            if (anchor.anchor().x() > maxX) {
                maxX = anchor.anchor().x();
            }
            if (anchor.cwCp().x() > maxX) {
                maxX = anchor.cwCp().x();
            }
            if (anchor.ccwCp().x() > maxX) {
                maxX = anchor.ccwCp().x();
            }

            if (anchor.anchor().y() > maxY) {
                maxY = anchor.anchor().x();
            }
            if (anchor.cwCp().y() > maxY) {
                maxY = anchor.cwCp().y();
            }
            if (anchor.ccwCp().y() > maxY) {
                maxY = anchor.ccwCp().y();
            }
        }
        return Vector2.create(maxX, maxY);
    }
}

@AutoValue
abstract class PdfPage {
    public static PdfPage create(float offsetX, float offsetY) {
        return new AutoValue_PdfPage(offsetX, offsetY);
    }

    public abstract float offsetX();
    public abstract float offsetY();
}
