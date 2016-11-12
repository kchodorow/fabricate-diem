package com.fabdm.project;

import static com.google.common.truth.Truth.assertThat;

import com.google.common.collect.ImmutableList;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

/**
 * Tests for {@link Model}.
 */
@RunWith(JUnit4.class)
public class ModelTest {
    @Test
    public void testEmptyJson() {
        Model model = Model.create(ImmutableList.of());
        assertThat(model.toJson()).isEqualTo("pieces : {}");
    }

    @Test
    public void testPieceJson() {
        Piece piece = Piece.create("id", ImmutableList.of(), ImmutableList.of());
        assertThat(piece.toJson()).isEqualTo("anchors : {}");
    }
    @Test
    public void testAnchorJson() {
        Anchor anchor = Anchor.create(
                "id", Vector2.create(1, 2), Vector2.create(3, 4), Vector2.create(5, 6));
        assertThat(anchor.toJson()).isEqualTo(
                "anchor : {x : 1, y : 2}, cwcp : {x : 3, y : 4}, ccwcp : {x : 5, y : 6}");
    }

    @Test
    public void testVector2Json() {
        Vector2 vec = Vector2.create(3, 11);
        assertThat(vec.toJson()).isEqualTo("{x : 3, y : 11}");
    }

}
