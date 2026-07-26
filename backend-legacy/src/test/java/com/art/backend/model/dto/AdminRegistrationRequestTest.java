package com.art.backend.model.dto;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class AdminRegistrationRequestTest {

    @Test
    void whenSetUsernameAndPassword_thenFieldsAreCorrect() {
        // Given
        final AdminRegistrationRequest request = new AdminRegistrationRequest();

        // When
        request.setUsername("adminUser");
        request.setPassword("securePass");

        // Then
        assertThat(request.getUsername()).isEqualTo("adminUser");
        assertThat(request.getPassword()).isEqualTo("securePass");
    }
}
