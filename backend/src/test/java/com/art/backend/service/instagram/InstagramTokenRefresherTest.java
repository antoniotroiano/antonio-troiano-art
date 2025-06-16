package com.art.backend.service.instagram;

import java.util.Map;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.springframework.web.client.RestTemplate;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class InstagramTokenRefresherTest {

    private final InstagramTokenService tokenService = mock(InstagramTokenService.class);
    private final RestTemplate restTemplate = mock(RestTemplate.class);
    private final InstagramTokenRefresher subjectUnderTest = new InstagramTokenRefresher(tokenService, restTemplate);

    @BeforeEach
    void setup() {
        subjectUnderTest.refreshUrlTemplate = "https://api.instagram.com/refresh?token=%s";
    }

    @Test
    void refreshToken_successfulRefresh_savesNewToken() {
        // Given
        final String oldToken = "old_token";
        final String newToken = "new_token";
        final Map<String, Object> response = Map.of("access_token", newToken);

        when(tokenService.getAccessToken()).thenReturn(oldToken);
        when(restTemplate.getForObject(anyString(), eq(Map.class))).thenReturn(response);

        // When
        subjectUnderTest.refreshToken();

        // Then
        verify(tokenService).saveToken(newToken);

        final ArgumentCaptor<String> urlCaptor = ArgumentCaptor.forClass(String.class);
        verify(restTemplate).getForObject(urlCaptor.capture(), eq(Map.class));
        final String calledUrl = urlCaptor.getValue();
        assertTrue(calledUrl.contains(oldToken));
    }

    @Test
    void refreshToken_noNewToken_logsWarningAndDoesNotSave() {
        // Given
        final String oldToken = "old_token";
        final Map<String, Object> response = Map.of();

        when(tokenService.getAccessToken()).thenReturn(oldToken);
        when(restTemplate.getForObject(anyString(), eq(Map.class))).thenReturn(response);

        // When
        subjectUnderTest.refreshToken();

        // Then
        verify(tokenService, never()).saveToken(anyString());
    }

    @Test
    void refreshToken_exceptionDuringRefresh_logsError() {
        // Given
        final String oldToken = "old_token";
        when(tokenService.getAccessToken()).thenReturn(oldToken);
        when(restTemplate.getForObject(anyString(), eq(Map.class))).thenThrow(new RuntimeException("HTTP Error"));

        // When
        subjectUnderTest.refreshToken();

        // Then
        verify(tokenService, never()).saveToken(anyString());
    }
}
