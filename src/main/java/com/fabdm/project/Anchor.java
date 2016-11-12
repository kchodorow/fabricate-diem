package com.fabdm.project;

import com.google.gson.Gson;
import com.google.gson.TypeAdapter;
import com.google.auto.value.AutoValue;

/**
 * Anchor point.
 */
@AutoValue
public abstract class Anchor {
    public static TypeAdapter<Anchor> typeAdapter(Gson gson) {
        return new AutoValue_Anchor.GsonTypeAdapter(gson);
    }

    public static Anchor create(String uuid, Vector2 anchor, Vector2 cwCp, Vector2 ccwCp) {
        return new AutoValue_Anchor(uuid, anchor, cwCp, ccwCp);
    }

    public abstract String uuid();
    public abstract Vector2 anchor();
    public abstract Vector2 cwCp();
    public abstract Vector2 ccwCp();

    public String toJson() {
        return new StringBuilder()
                .append("anchor : ").append(anchor().toJson()).append(", ")
                .append("cwcp : ").append(cwCp().toJson()).append(", ")
                .append("ccwcp : ").append(ccwCp().toJson())
                .toString();
    }
}
