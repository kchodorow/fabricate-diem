package com.fabdm.editor.pdf;

import com.fabdm.project.Vector2;
import com.google.common.base.Preconditions;

/**
 * Expands bezier curves.
 */
public class Expander {
    private final Vector2 p0;
    private final Vector2 p1;
    private final Vector2 p2;
    private final Vector2 p3;
    /**
     * Derivative formula:
     * -3*P0*(1 - t)^2 +
     * P1*(3*(1 - t)^2 - 6*(1 - t)*t) +
     * P2*(6*(1 - t)*t - 3*t^2) +
     * 3*P3*t^2
     *
     * Normalizing formula:
     * x: -|tan(y(t))|
     * y: |tan(x(t))|
     */

    Expander(Vector2 p0, Vector2 p1, Vector2 p2, Vector2 p3) {
        this.p0 = p0;
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
    }

    private Vector2 getNormal(double t) {
        Vector2 normalizedTangent = getNormalizedTangent(0);
        return Vector2.create(-normalizedTangent.y(), normalizedTangent.x());
    }

    private Vector2 getNormalizedTangent(double t) {
        Preconditions.checkArgument(t >= 0 && t <= 1);
        Vector2 tangent = getTangent(t);
        double length = tangent.length();
        return Vector2.create(tangent.x() / length, tangent.y() / length);
    }

    private Vector2 getTangent(double t) {
        double x = getTangent(t, p0.x(), p1.x(), p2.x(), p3.x());
        double y = getTangent(t, p0.y(), p1.y(), p2.y(), p3.y());
        return Vector2.create(x, y);
    }

    private double getTangent(double t, double p0, double p1, double p2, double p3) {
        return -3 * p0 * Math.pow(1 - t, 2)
            + p1 * (3 * Math.pow(1 - t, 2) - 6 * (1 - t) * t)
            + p2 * (6 * Math.pow(1 - t, 2) * t - 3 * Math.pow(t, 2))
            + 3 * p3 * Math.pow(t, 2);
    }
}
