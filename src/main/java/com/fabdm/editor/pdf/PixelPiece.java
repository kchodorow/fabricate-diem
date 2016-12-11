package com.fabdm.editor.pdf;

import com.fabdm.project.Anchor;
import com.fabdm.project.Vector2;
import com.google.common.collect.Lists;
import com.google.auto.value.AutoValue;

import java.util.List;

/**
 * Pixel-scale versions of Three.js models.
 */
@AutoValue
abstract class PixelPiece {
    public static PixelPiece create(List<Anchor> anchors) {
        List<PixelAnchor> pixelAnchors = Lists.newArrayList();
        for (Anchor anchor : anchors) {
            pixelAnchors.add(PixelAnchor.create(anchor));
        }
        return new AutoValue_PixelPiece(pixelAnchors);
    }

    public abstract List<PixelAnchor> anchors();
}

@AutoValue
abstract class PixelAnchor {
    public static PixelAnchor create(Anchor anchor) {
        return PixelAnchor.create(
            toPixels(anchor.anchor()), toPixels(anchor.cwCp()), toPixels(anchor.ccwCp()));
    }

    public static PixelAnchor create(Vector2 anchor, Vector2 cwCp, Vector2 ccwCp) {
        return new AutoValue_PixelAnchor(anchor, cwCp, ccwCp);
    }

    private static Vector2 toPixels(Vector2 vector) {
        return Vector2.create(vector.xAsPixels(), vector.yAsPixels());
    }

    public abstract Vector2 anchor();
    public abstract Vector2 cwCp();
    public abstract Vector2 ccwCp();
}
