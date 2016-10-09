package com.fabdm.editor;

/**
 * Representation of an "edit" event in the browser.
 */
public class Model {
    Piece[] pieces;

    static class Piece {
        String id;
        Anchor[] anchors;
        Edge[] edges;
    }

    static class Anchor {
        String id;
        Vector2 anchor;
        Vector2 cwcp;
        Vector2 ccwcp;
    }

    static class Edge {
        String startId;
        String endId;
    }

    static class Vector2 {
        int x;
        int y;
    }
}
