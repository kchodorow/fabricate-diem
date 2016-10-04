package com.fabdm.project;

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
        this.article = ARTICLES[(int) Math.floor(Math.random() * ARTICLES.length)];
        this.adjective = ADJECTIVES[(int) Math.floor(Math.random() * ADJECTIVES.length)];
    }

    String getDescription() {
        boolean plural = article.endsWith("s") && ! article.endsWith("ss");
        String aOrAn = "A" + (adjective.matches("^[aeiou].*") && !plural ? "n" : "");
        return aOrAn + (plural ? " pair of " : " ") + adjective + " " + article;
    }

    String getUri() {
        return adjective.replaceAll(" ", "-") + "-" + article.replaceAll(" ", "-");
    }
}
