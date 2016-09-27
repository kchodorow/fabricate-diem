package com.kchodorow.diem.editor;

/**
 * Generate a random article of clothing.
 */
public class RandomName {
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
            "earth mother",
            "elegant",
            "fantasy",
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

    public RandomName() {
        this.article = ARTICLES[(int) Math.floor(Math.random() * ARTICLES.length)];
        this.adjective = ADJECTIVES[(int) Math.floor(Math.random() * ADJECTIVES.length)];
    }

    public String getDescription() {
        boolean plural = article.endsWith("s") && ! article.endsWith("ss");
        String aOrAn = "A" + (adjective.matches("^[aeiou].*") && !plural ? "n" : "");
        return aOrAn + (plural ? " pair of " : "") + adjective + " " + article;
    }

    public String getUri() {
        return adjective + "-" + article;
    }
}
