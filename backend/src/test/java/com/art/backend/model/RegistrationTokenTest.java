package com.art.backend.model;

import java.time.LocalDateTime;
import java.util.UUID;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class RegistrationTokenTest {

    @Test
    void givenTokenAndExpiration_whenCreating_thenFieldsAreSetCorrectly() {
        // Given
        final String token = UUID.randomUUID().toString();
        final LocalDateTime expiration = LocalDateTime.now().plusDays(1);

        // When
        final RegistrationToken regToken = new RegistrationToken(token, expiration);

        // Then
        assertEquals(token, regToken.getToken());
        assertEquals(expiration, regToken.getExpirationDate());
    }
}
