package com.fabdm.project;

import static com.google.common.truth.Truth.assertThat;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

/**
 * Tests for {@link RandomName}.
 */
@RunWith(JUnit4.class)
public class RandomNameTest {
    @Test
    public void testPlural() {
        RandomName name = new RandomName("underwear", "slouchy");
        assertThat(name.getDescription()).isEqualTo("A pair of slouchy underwear");
    }
}
