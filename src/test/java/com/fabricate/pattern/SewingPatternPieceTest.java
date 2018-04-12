package com.fabricate.pattern;

import com.fabricate.math.AnchorPoint;
import com.fabricate.math.Vector2;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertArrayEquals;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.fail;


@RunWith(JUnit4.class)
public class SewingPatternPieceTest {
  @Test
  public void testCreate() throws Exception {
    AnchorPoint line[] = createAnchorPoints(new Vector2[] {
      Vector2.create(0, 0),
      Vector2.create(0, 20),
      Vector2.create(20, 20),
      Vector2.create(20, 0)
    });
    SewingPatternPiece piece = SewingPatternPiece.builder().addLine(line).build();
    AnchorPoint[] outerEdge = piece.outerEdge();
    assertArrayEquals(outerEdge, line);
  }

  @Test
  public void testFindOuter() throws Exception {
    AnchorPoint l1[] = createAnchorPoints(new Vector2[] {
      Vector2.create(0, 0),
      Vector2.create(0, 20),
    });
    AnchorPoint l2[] = createAnchorPoints(new Vector2[] {
      Vector2.create(0, 5),
      Vector2.create(0, 15),
    });
    SewingPatternPiece piece = SewingPatternPiece.builder().addLine(l1).addLine(l2).build();
    AnchorPoint[] outerEdge = piece.outerEdge();
    assertArrayEquals(outerEdge, l1);
  }

  @Test
  public void testOverlap() throws Exception {
    AnchorPoint l1[] = createAnchorPoints(new Vector2[] {
      Vector2.create(0, 0),
      Vector2.create(0, 20),
    });
    AnchorPoint l2[] = createAnchorPoints(new Vector2[] {
      Vector2.create(0, 10),
      Vector2.create(0, 0),
    });
    try {
      SewingPatternPiece.builder().addLine(l1).addLine(l2);
      fail("Should not allow identical points");
    } catch (InvalidPatternPieceException expected) {
      assertThat(expected.getMessage(), is(
        "Pattern piece lines cannot come to the same point"));
    }
  }

  private AnchorPoint[] createAnchorPoints(Vector2[] vector2s) {
    AnchorPoint[] anchorPoints = new AnchorPoint[vector2s.length];
    for (int i = 0; i < anchorPoints.length; ++i) {
      anchorPoints[i] = new AnchorPoint(vector2s[i]);
    }
    return anchorPoints;
  }
}
