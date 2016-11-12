package com.fabdm.project;

import com.google.gson.Gson;
import com.google.gson.TypeAdapter;
import com.google.auto.value.AutoValue;

/**
 * 2D vector.
 */
@AutoValue
public abstract class Vector2 {
    public static TypeAdapter<Vector2> typeAdapter(Gson gson) {
        return new AutoValue_Vector2.GsonTypeAdapter(gson);
    }

    public static Vector2 create(int x, int y) {
        return new AutoValue_Vector2(x, y);
    }

    public abstract int x();
    public abstract int y();

    public String toJson() {
        return "{x : " + x() + ", y : " + y() + "}";
    }
}
