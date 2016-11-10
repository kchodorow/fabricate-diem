package com.fabdm.editor;

/**
 * Representation of an "edit" event in the browser.
 */
public class Model {
    private final Piece[] pieces;

    public Model(Piece pieces[]) {
        this.pieces = pieces;
    }

    public Piece[] getPieces() {
        return pieces;
    }

    public static class Piece {
        String id;
        private final Anchor[] anchors;
        Edge[] edges;

        public Piece(Anchor anchors[]) {
            this.anchors = anchors;
        }

        public Anchor[] getAnchors() {
            return anchors;
        }
    }

    public static class Anchor {
        String id;
        private final Vector2 anchor;
        private final Vector2 cwcp;
        private final Vector2 ccwcp;

        public Anchor(Vector2 anchor, Vector2 cwcp, Vector2 ccwcp) {
            this.anchor = anchor;
            this.cwcp = cwcp;
            this.ccwcp = ccwcp;
        }

        public Vector2 getAnchor() {
            return anchor;
        }
        public Vector2 getCwcp() {
            return cwcp;
        }
        public Vector2 getCcwcp() {
            return ccwcp;
        }
    }

    static class Edge {
        String startId;
        String endId;
    }

    public static class Vector2 {
        public final int x;
        public final int y;

        public Vector2(int x, int y) {
            this.x = x;
            this.y = y;
        }
    }
}
