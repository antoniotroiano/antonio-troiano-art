package com.art.backend.model.dto;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class AuthRequestTest {

    @Test
    void whenConstructed_thenFieldsAreSetCorrectly() {
        // Given
        final String username = "admin";
        final String password = "12345";

        // When
        final AuthRequest request = new AuthRequest(username, password);

        // Then
        assertThat(request.getUsername()).isEqualTo(username);
        assertThat(request.getPassword()).isEqualTo(password);
    }
}
