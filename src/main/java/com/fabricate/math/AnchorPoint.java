package com.fabricate.math;

import com.google.common.annotations.VisibleForTesting;

public class AnchorPoint {
  private final Vector2 point;
  private final Vector2 cwCp;
  private final Vector2 ccwCp;

  @VisibleForTesting
  AnchorPoint(Vector2 point) {
    this.point = point;
    this.cwCp = point;
    this.ccwCp = point;
  }

  public AnchorPoint(Vector2 point, Vector2 cwCp, Vector2 ccwCp) {
    this.point = point;
    this.cwCp = cwCp;
    this.ccwCp = ccwCp;
  }

  public Vector2 cwCp() {
    return cwCp;
  }
  public Vector2 ccwCp() {
    return ccwCp;
  }

  public Vector2 point() {
    return point;
  }
}
