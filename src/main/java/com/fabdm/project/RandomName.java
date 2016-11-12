package com.fabdm.project;

import com.google.common.annotations.VisibleForTesting;
import com.google.common.collect.ImmutableList;

/**
 * Generate a random article of clothing.
 */
class RandomName {
    private static final String[] ARTICLES = {
            "blouse",
            "bodice",
            "bolero",
            "boy shorts",
            "bra",
            "cape",
            "coat",
            "corset",
            "dress",
            "jacket",
            "kilt",
            "mantle",
            "negligee",
            "overalls",
            "pajamas",
            "pants",
            "shirt",
            "shorts",
            "skirt",
            "slacks",
            "teddy",
            "teeshirt",
            "underwear"
    };

    private static final ImmutableList<String> PLURALS = ImmutableList.of("underwear");

    private static final String[] ADJECTIVES = {
            "bohemian",
            "boho",
            "cargo",
            "comfy",
            "delicate",
            "earth mother",
            "elegant",
            "fantasy",
            "holiday",
            "gothic",
            "hippy",
            "hipster",
            "medieval",
            "preppy",
            "punky",
            "regal",
            "sexy",
            "slouchy",
            "superhero",
            "Victorian"
    };

    private final String article;
    private final String adjective;

    RandomName() {
        this(ARTICLES[(int) Math.floor(Math.random() * ARTICLES.length)],
                ADJECTIVES[(int) Math.floor(Math.random() * ADJECTIVES.length)]);
    }

    @VisibleForTesting
    RandomName(String article, String adjective) {
        this.article = article;
        this.adjective = adjective;
    }

    String getDescription() {
        boolean plural = PLURALS.contains(article)
                || (article.endsWith("s") && ! article.endsWith("ss"));
        String aOrAn = "A" + (adjective.matches("^[aeiou].*") && !plural ? "n" : "");
        return aOrAn + (plural ? " pair of " : " ") + adjective + " " + article;
    }

    String getUri() {
        return adjective.replaceAll(" ", "-") + "-" + article.replaceAll(" ", "-");
    }
}
