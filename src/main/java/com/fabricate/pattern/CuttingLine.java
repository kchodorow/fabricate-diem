package com.fabricate.pattern;

/**
 * Generally this will be analogous to a pattern piece. However, pieces with interior holes will
 * need multiple cutting lines.
 */
class CuttingLine {
  private final AnchorPoint[] anchorPoints;

  CuttingLine(AnchorPoint[] anchorPoints) {
    this.anchorPoints = anchorPoints;
  }

  public AnchorPoint[] anchorPoints() {
    return anchorPoints;
  }
}
