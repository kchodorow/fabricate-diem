package com.fabricate.math;

import com.google.auto.value.AutoValue;
import com.google.auto.value.extension.memoized.Memoized;
import javafx.geometry.BoundingBox;

import java.util.ArrayList;

@AutoValue
public abstract class BezierCurve {
  private static final double INTERSECTION_THRESHOLD = .01;

  public static BezierCurve create(AnchorPoint start, AnchorPoint end) {
    return new AutoValue_BezierCurve(start, end);
  }

  public abstract AnchorPoint start();
  public abstract AnchorPoint end();

  @Memoized
  public BoundingBox boundingBox() {
    ArrayList<Double> tvalues = new ArrayList<>();
    double a, b, c, t;
    double x0 = start().point().x();
    double x1 = start().ccwCp().x();
    double x2 = end().cwCp().x();
    double x3 = end().point().x();
    double y0 = start().point().y();
    double y1 = start().ccwCp().y();
    double y2 = end().cwCp().y();
    double y3 = end().point().y();
    for (int i = 0; i < 2; ++i) {
      if (i == 0) {
        b = 6 * x0 - 12 * x1 + 6 * x2;
        a = -3 * x0 + 9 * x1 - 9 * x2 + 3 * x3;
        c = 3 * x1 - 3 * x0;
      } else {
        b = 6 * y0 - 12 * y1 + 6 * y2;
        a = -3 * y0 + 9 * y1 - 9 * y2 + 3 * y3;
        c = 3 * y1 - 3 * y0;
      }

      if (Math.abs(a) < INTERSECTION_THRESHOLD) {  // Numerical robustness
        if (Math.abs(b) < INTERSECTION_THRESHOLD) { // Numerical robustness
            continue;
        }
        t = -c / b;
        if (0 < t && t < 1) {
          tvalues.add(t);
        }
        continue;
      }
      double b2ac = b * b - 4 * c * a;
      if (b2ac < 0) {
        continue;
      }
      double sqrtb2ac = Math.sqrt(b2ac);
      double t1 = (-b + sqrtb2ac) / (2 * a);
      if (0 < t1 && t1 < 1) {
        tvalues.add(t1);
      }
      double t2 = (-b - sqrtb2ac) / (2 * a);
      if (0 < t2 && t2 < 1) {
        tvalues.add(t2);
      }
    }

    int j = tvalues.size();
    double x, y, mt;
    double minX = Double.MAX_VALUE;
    double minY = Double.MAX_VALUE;
    double maxX = Double.MIN_VALUE;
    double maxY = Double.MIN_VALUE;
    while (j-- > 0) {
      t = tvalues.get(j);
      mt = 1 - t;
      x = (mt * mt * mt * x0) + (3 * mt * mt * t * x1) + (3 * mt * t * t * x2) + (t * t * t * x3);
      if (x < minX) {
        minX = x;
      }
      if (x > maxX) {
        maxX = x;
      }

      y = (mt * mt * mt * y0) + (3 * mt * mt * t * y1) + (3 * mt * t * t * y2) + (t * t * t * y3);
      if (y < minY) {
        minY = y;
      }
      if (y > maxY) {
        maxY = y;
      }
    }

    // Check the control points.
    minX = x0 < minX ? x0 : minX;
    maxX = x0 > maxX ? x0 : maxX;
    minY = y0 < minY ? y0 : minY;
    maxY = y0 > maxY ? y0 : maxY;
    minX = x3 < minX ? x3 : minX;
    maxX = x3 > maxX ? x3 : maxX;
    minY = y3 < minY ? y3 : minY;
    maxY = y3 > maxY ? y3 : maxY;

    double width = maxX - minX;
    double height = maxY - minY;
    return new BoundingBox(minX, minY, width, height);
  }

  public boolean intersects(BezierCurve other) {
    BoundingBox bbox1 = boundingBox();
    BoundingBox bbox2 = other.boundingBox();
    if (!bbox1.intersects(bbox2)) {
      return false;
    }
    double area1 = bbox1.getHeight() * bbox1.getWidth();
    double area2 = bbox2.getHeight() * bbox2.getWidth();
    if (area1 + area2 < INTERSECTION_THRESHOLD) {
      return true;
    }

    BezierCurve[] newCurves1 = split(.5);
    BezierCurve[] newCurves2 = other.split(.5);
    return newCurves1[0].intersects(newCurves2[0])
      || newCurves1[1].intersects(newCurves2[0])
      || newCurves1[0].intersects(newCurves2[1])
      || newCurves1[1].intersects(newCurves2[1]);
  }

  private BezierCurve[] split(double t) {
    return new BezierCurve[0];
  }
}
