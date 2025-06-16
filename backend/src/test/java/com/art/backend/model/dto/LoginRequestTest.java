package com.art.backend.model.dto;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class LoginRequestTest {

    @Test
    void whenCreated_thenFieldsAreSetCorrectly() {
        // Given
        final String username = "admin";
        final String password = "secret";

        // When
        final LoginRequest request = new LoginRequest(username, password);

        // Then
        assertThat(request.username()).isEqualTo(username);
        assertThat(request.password()).isEqualTo(password);
    }
}
