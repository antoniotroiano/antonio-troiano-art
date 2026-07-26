package com.example;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Sample Test Klasse")
public class SampleTest {

    @Test
    @DisplayName("Ein einfacher Test")
    public void testSimple() {
        // Arrange
        int expected = 2;

        // Act
        int actual = 1 + 1;

        // Assert
        assertEquals(expected, actual, "1 + 1 sollte 2 sein");
    }

    @Test
    @DisplayName("Test mit String")
    public void testString() {
        String message = "Hello, World!";
        assertNotNull(message);
        assertTrue(message.contains("World"));
    }
}

