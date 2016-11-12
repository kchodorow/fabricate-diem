package com.fabdm.project;

import com.google.gson.TypeAdapterFactory;
import com.ryanharter.auto.value.gson.GsonTypeAdapterFactory;

/**
 * Gson converter.
 */
@GsonTypeAdapterFactory
public abstract class GsonFactory implements TypeAdapterFactory {
    public static TypeAdapterFactory create() {
        return new AutoValueGson_GsonFactory();
    }
}
