package com.fabricate.pattern;

import com.fabricate.math.AnchorPoint;
import com.fabricate.math.Vector2;
import com.google.common.collect.Sets;

import java.util.ArrayList;
import java.util.HashSet;

/**
 * A piece that can be cut out of fabric. This represents the pattern piece in a single size.
 */
public class SewingPatternPiece {

  // Generally this will be size of 1, for a simple shape. If there are interior holes in the
  // pattern piece, though, it will be more.
  private final CuttingLine[] cuttingLines;
  // Grainlines tend to be lines, not vectors, but a vector could be handy for directional
  // fabric, like elephant-print PJs.
  private final Vector2 grainline;
  private final CuttingLine outerEdge;

  private SewingPatternPiece(CuttingLine[] cuttingLines, Vector2 grainline) {
    this.cuttingLines = cuttingLines;
    this.grainline = grainline;
    this.outerEdge = findOuterCuttingLine();
  }

  public AnchorPoint[] outerEdge() {
    return outerEdge.anchorPoints();
  }

  private CuttingLine findOuterCuttingLine() {
    if (cuttingLines.length == 1) {
      return cuttingLines[0];
    }
    Vector2 minAnchorPoint = Vector2.create(Double.MAX_VALUE, Double.MAX_VALUE);
    CuttingLine outerEdge = null;
    for (CuttingLine line : cuttingLines) {
      for (AnchorPoint anchorPoint : line.anchorPoints()) {
        Vector2 anchor = anchorPoint.point();
        if (anchor.x() <= minAnchorPoint.x() && anchor.y() <= minAnchorPoint.y()) {
          minAnchorPoint = anchorPoint.point();
          outerEdge = line;
        }
      }
    }
    return outerEdge;
  }

  public static SewingPatternPieceBuilder builder() {
    return new SewingPatternPieceBuilder();
  }

  static class SewingPatternPieceBuilder {
    private ArrayList<CuttingLine> cuttingLines;
    private Vector2 grainline;
    private HashSet<Vector2> points;

    private SewingPatternPieceBuilder() {
      this.cuttingLines = new ArrayList<>(1);
      this.points = Sets.newHashSet();
      this.grainline = Vector2.create(0, 1);
    }

    SewingPatternPieceBuilder addLine(AnchorPoint[] anchorPoints)
      throws InvalidPatternPieceException {
      // Check that there are no overlapping points.
      for (AnchorPoint anchorPoint : anchorPoints) {
        Vector2 point = anchorPoint.point();
        if (points.contains(point)) {
          throw new InvalidPatternPieceException(
            "Pattern piece lines cannot come to the same point");
        }
        points.add(point);
      }
      cuttingLines.add(new CuttingLine(anchorPoints));
      return this;
    }

    public SewingPatternPieceBuilder setGrainlineVector(Vector2 grainline) {
      this.grainline = grainline;
      return this;
    }

    public SewingPatternPiece build() {
      return new SewingPatternPiece(
        cuttingLines.toArray(new CuttingLine[cuttingLines.size()]),
        grainline);
    }

  }

}
