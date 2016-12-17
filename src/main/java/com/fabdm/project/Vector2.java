package com.fabdm.project;

import com.google.common.base.Preconditions;
import com.google.gson.Gson;
import com.google.gson.TypeAdapter;
import com.google.auto.value.AutoValue;

/**
 * 2D vector.
 */
@AutoValue
public abstract class Vector2 {
    public static int PIXELS_PER_INCH = 72;
    private static int INCHES_PER_THREE_UNIT = 6;

    public static TypeAdapter<Vector2> typeAdapter(Gson gson) {
        return new AutoValue_Vector2.GsonTypeAdapter(gson);
    }

    public static Vector2 create(double x, double y) {
        return new AutoValue_Vector2(x, y);
    }

    public abstract double x();
    public abstract double y();

    public double length() {
        return Math.sqrt(x() * x() + y() * y());
    }

    public String toJson() {
        return "{x : " + x() + ", y : " + y() + "}";
    }

    public int xAsPixels() {
        return (int) (x() * PIXELS_PER_INCH * INCHES_PER_THREE_UNIT);
    }

    public int yAsPixels() {
        return (int) (y() * PIXELS_PER_INCH * INCHES_PER_THREE_UNIT);
    }

    public static Vector2 getNormalizedVector(Vector2 vec) {
        // TOOD: throw non-runtime exception.
        Preconditions.checkArgument(vec.x() != 0 || vec.y() != 0);
        double length = Math.sqrt(vec.x() * vec.x() + vec.y() * vec.y());
        double x = vec.x() / length;
        double y = vec.y() / length;
        return Vector2.create(x, y);
    }
}
