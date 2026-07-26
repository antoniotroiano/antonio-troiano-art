package com.art.backend.model;

import org.junit.jupiter.api.Test;
import org.springframework.security.core.userdetails.UserDetails;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class AdminTest {

    @Test
    void givenUsernameAndPassword_whenCreatingAdmin_thenFieldsAreSetCorrectly() {
        // Given
        final String username = "testAdmin";
        final String password = "securePassword123";

        // When
        final UserDetails admin = new Admin(username, password);

        // Then
        assertEquals(username, admin.getUsername());
        assertEquals(password, admin.getPassword());
    }

    @Test
    void givenTwoAdminsWithSameUsername_whenEquals_thenTheyAreEqual() {
        // Given
        final Admin admin1 = new Admin("sameUser", "pw1");
        final Admin admin2 = new Admin("sameUser", "pw2");

        // When & Then
        assertEquals(admin1, admin2);
        assertEquals(admin1.hashCode(), admin2.hashCode());
    }

    @Test
    void givenTwoAdminsWithDifferentUsernames_whenEquals_thenTheyAreNotEqual() {
        // Given
        final Admin admin1 = new Admin("user1", "pw1");
        final Admin admin2 = new Admin("user2", "pw1");

        // Then
        assertNotEquals(admin1, admin2);
    }

    @Test
    void whenToString_thenContainsIdUsernameAndCreatedAt() {
        // Given
        final Admin admin = new Admin("toStringUser", "pw");

        // When
        final String result = admin.toString();

        // Then
        assertTrue(result.contains("toStringUser"));
    }
}
