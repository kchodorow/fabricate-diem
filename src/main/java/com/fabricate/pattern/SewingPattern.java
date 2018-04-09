package com.fabricate.pattern;

import java.util.ArrayList;

public class SewingPattern {
  private final SewingPatternPiece pieces[];

  private SewingPattern(SewingPatternPiece pieces[]) {
    this.pieces = pieces;
  }

  public SewingPatternPiece[] getPieces() {
    return pieces;
  }

  static SewingPatternBuilder builder() {
    return new SewingPatternBuilder();
  }

  static class SewingPatternBuilder {
    private final ArrayList<SewingPatternPiece> pieces;

    private SewingPatternBuilder() {
      pieces = new ArrayList<SewingPatternPiece>();
    }

    public SewingPatternBuilder addPiece(SewingPatternPiece piece) {
      pieces.add(piece);
      return this;
    }

    public SewingPattern build() {
      return new SewingPattern(pieces.toArray(new SewingPatternPiece[pieces.size()]));
    }
  }
}

