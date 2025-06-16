package com.art.backend.service.instagram;

import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestOperations;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class InstagramServiceTest {

    private final RestOperations restTemplate = mock(RestOperations.class);
    private final InstagramService subjectUnderTest = new InstagramService(restTemplate);

    @Test
    void fetchInstagramFeed_returnsDataSuccessfully() {
        // Given
        final String accessToken = "valid_token";
        final Map<String, Object> responseBody = Map.of("data", List.of("post1", "post2"));
        final ResponseEntity<Map> responseEntity = new ResponseEntity<>(responseBody, HttpStatus.OK);

        when(restTemplate.getForEntity(anyString(), eq(Map.class))).thenReturn(responseEntity);

        // When
        final Object data = subjectUnderTest.fetchInstagramFeed(accessToken);

        // Then
        assertNotNull(data);
        assertTrue(data instanceof List);
        assertEquals(List.of("post1", "post2"), data);

        final ArgumentCaptor<String> uriCaptor = ArgumentCaptor.forClass(String.class);
        verify(restTemplate).getForEntity(uriCaptor.capture(), eq(Map.class));
        final String calledUri = uriCaptor.getValue();
        assertTrue(calledUri.contains("access_token=" + accessToken));
    }

    @Test
    void fetchInstagramFeed_handlesRestClientException() {
        // Given
        final String accessToken = "invalid_token";

        when(restTemplate.getForEntity(anyString(), eq(Map.class)))
                .thenThrow(new RuntimeException("Network error"));

        // When & Then
        final RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            subjectUnderTest.fetchInstagramFeed(accessToken);
        });

        assertEquals("Network error", exception.getMessage());
    }
}
