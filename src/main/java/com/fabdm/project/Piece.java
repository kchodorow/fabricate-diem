package com.fabdm.project;

import com.google.gson.Gson;
import com.google.gson.TypeAdapter;
import com.google.auto.value.AutoValue;

import javax.annotation.Nullable;
import java.util.List;

/**
 * A piece of the pattern.
 */
@AutoValue
public abstract class Piece {
    public static TypeAdapter<Piece> typeAdapter(Gson gson) {
        return new AutoValue_Piece.GsonTypeAdapter(gson);
    }

    public static Piece create(
            String description, String uuid, List<Anchor> anchors, List<Model.Edge> edges) {
        return new AutoValue_Piece(description, uuid, anchors, edges);
    }

    @Nullable
    public abstract String description();
    @Nullable
    public abstract String uuid();
    public abstract List<Anchor> anchors();
    public abstract List<Model.Edge> edges();

    public String toJson() {
        StringBuilder builder = new StringBuilder("description : \"" + description()
            + "\", anchors : {");
        for (Anchor anchor : anchors()) {
            builder.append(anchor.toJson());
        }
        builder.append("}");
        return builder.toString();
    }
}
