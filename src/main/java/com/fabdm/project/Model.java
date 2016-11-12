package com.fabdm.project;

import com.google.gson.Gson;
import com.google.gson.TypeAdapter;
import com.google.auto.value.AutoValue;

import java.util.List;

/**
 * Representation of an "edit" event in the browser.
 */
@AutoValue
public abstract class Model {
    public static TypeAdapter<Model> typeAdapter(Gson gson) {
        return new AutoValue_Model.GsonTypeAdapter(gson);
    }

    public static Model create(List<Piece> pieces) {
        return new AutoValue_Model(pieces);
    }

    public abstract List<Piece> pieces();

    public String toJson() {
        StringBuilder builder = new StringBuilder("pieces : {");
        for (Piece piece : pieces()) {
            builder.append(piece.toJson());
        }
        builder.append("}");
        return builder.toString();
    }

    static class Edge {
        String startId;
        String endId;
    }

}
