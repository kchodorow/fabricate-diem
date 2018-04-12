package com.fabricate.pattern;

import com.fabricate.math.AnchorPoint;
import com.fabricate.math.BezierCurve;
import com.google.common.base.Preconditions;

/**
 * Generally this will be analogous to a pattern piece. However, pieces with interior holes will
 * need multiple cutting lines.
 */
class CuttingLine {
  private final AnchorPoint[] anchorPoints;
  private final BezierCurve[] segments;

  CuttingLine(AnchorPoint[] anchorPoints) {
    Preconditions.checkArgument(
      anchorPoints.length > 0, "There must be at least one anchor point");
    this.anchorPoints = anchorPoints;
    this.segments = new BezierCurve[anchorPoints.length];
    for (int i = 0; i < anchorPoints.length - 1; ++i) {
      this.segments[i] = BezierCurve.create(anchorPoints[i], anchorPoints[i + 1]);
    }
    // Close loop.
    this.segments[anchorPoints.length - 1] = BezierCurve.create(
      anchorPoints[anchorPoints.length - 1], anchorPoints[0]);
  }

  public AnchorPoint[] anchorPoints() {
    return anchorPoints;
  }

  public boolean intersects(CuttingLine other) {
    for (BezierCurve segment : segments) {
      for (BezierCurve otherSegment : other.segments) {
        if (segment.intersects(otherSegment)) {
          return true;
        }
      }
    }
    return false;
  }
}
