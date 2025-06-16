package com.art.backend.service.instagram;

import java.time.Instant;
import java.util.Optional;

import com.art.backend.model.InstagramToken;
import com.art.backend.repository.InstagramTokenRepository;

import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class InstagramTokenServiceTest {

    private final InstagramTokenRepository repository = mock(InstagramTokenRepository.class);
    private final InstagramTokenService subjectUnderTest = new InstagramTokenService(repository);

    @Test
    void init_insertsTokenIfNotExistsAndInitialTokenIsSet() throws Exception {
        // Given
        when(repository.existsById(1L)).thenReturn(false);
        setInitialToken("initial-token");

        // When
        subjectUnderTest.init();

        // Then
        final ArgumentCaptor<InstagramToken> captor = ArgumentCaptor.forClass(InstagramToken.class);
        verify(repository).save(captor.capture());

        final InstagramToken saved = captor.getValue();
        assertEquals("initial-token", saved.getAccessToken());
    }

    @Test
    void init_doesNotInsertIfTokenExists() throws Exception {
        // Given
        when(repository.existsById(1L)).thenReturn(true);
        setInitialToken("initial-token");

        // When
        subjectUnderTest.init();

        // Then
        verify(repository, never()).save(any());
    }

    @Test
    void init_doesNotInsertIfInitialTokenIsBlank() throws Exception {
        // Given
        when(repository.existsById(1L)).thenReturn(false);
        setInitialToken("  ");

        // When
        subjectUnderTest.init();

        // Then
        verify(repository, never()).save(any());
    }

    @Test
    void getAccessToken_returnsToken() {
        // Given
        final InstagramToken token = createToken();
        when(repository.findById(1L)).thenReturn(Optional.of(token));

        // When
        final String accessToken = subjectUnderTest.getAccessToken();

        // Then
        assertEquals(token.getAccessToken(), accessToken);
    }

    @Test
    void getAccessToken_throwsIfTokenNotFound() {
        // Given
        when(repository.findById(1L)).thenReturn(Optional.empty());

        // When/Then
        final IllegalStateException ex = assertThrows(IllegalStateException.class, subjectUnderTest::getAccessToken);
        assertEquals("Instagram token not found", ex.getMessage());
    }

    @Test
    void saveToken_updatesAndSavesToken() {
        // Given
        final InstagramToken existingToken = createToken();
        when(repository.findById(1L)).thenReturn(Optional.of(existingToken));

        // When
        subjectUnderTest.saveToken("new-token");

        // Then
        final ArgumentCaptor<InstagramToken> captor = ArgumentCaptor.forClass(InstagramToken.class);
        verify(repository).save(captor.capture());

        final InstagramToken saved = captor.getValue();
        assertEquals("new-token", saved.getAccessToken());
        assertNotNull(saved.getLastRefreshed());
    }

    @Test
    void saveToken_createsNewTokenIfNoneExists() {
        // Given
        when(repository.findById(1L)).thenReturn(Optional.empty());

        // When
        subjectUnderTest.saveToken("new-token");

        // Then
        final ArgumentCaptor<InstagramToken> captor = ArgumentCaptor.forClass(InstagramToken.class);
        verify(repository).save(captor.capture());

        final InstagramToken saved = captor.getValue();
        assertEquals("new-token", saved.getAccessToken());
        assertNotNull(saved.getLastRefreshed());
    }

    @Test
    void loadLastRefreshTime_returnsInstant() {
        // Given
        final Instant now = Instant.now();
        final InstagramToken token = createToken();
        token.setLastRefreshed(now);
        when(repository.findById(1L)).thenReturn(Optional.of(token));

        // When
        final Instant lastRefreshed = subjectUnderTest.loadLastRefreshTime();

        // Then
        assertEquals(now, lastRefreshed);
    }

    @Test
    void loadLastRefreshTime_throwsIfNotFound() {
        // Given
        when(repository.findById(1L)).thenReturn(Optional.empty());

        // When/Then
        final IllegalStateException ex = assertThrows(IllegalStateException.class,
                subjectUnderTest::loadLastRefreshTime);
        assertEquals("Instagram token not found", ex.getMessage());
    }

    @Test
    void saveLastRefreshTime_updatesAndSaves() {
        // Given
        final InstagramToken token = createToken();
        when(repository.findById(1L)).thenReturn(Optional.of(token));
        final Instant newTime = Instant.now();

        // When
        subjectUnderTest.saveLastRefreshTime(newTime);

        // Then
        final ArgumentCaptor<InstagramToken> captor = ArgumentCaptor.forClass(InstagramToken.class);
        verify(repository).save(captor.capture());

        final InstagramToken saved = captor.getValue();
        assertEquals(newTime, saved.getLastRefreshed());
    }

    @Test
    void saveLastRefreshTime_throwsIfNotFound() {
        // Given
        when(repository.findById(1L)).thenReturn(Optional.empty());
        final Instant now = Instant.now();

        // When/Then
        final IllegalStateException ex = assertThrows(IllegalStateException.class, () -> {
            subjectUnderTest.saveLastRefreshTime(now);
        });
        assertEquals("Instagram token not found", ex.getMessage());
    }

    private void setInitialToken(final String token) throws Exception {
        final var field = InstagramTokenService.class.getDeclaredField("initialToken");
        field.setAccessible(true);
        field.set(subjectUnderTest, token);
    }

    private static InstagramToken createToken() {
        final InstagramToken token = new InstagramToken();
        token.setAccessToken("my-token");
        token.setLastRefreshed(Instant.now());
        token.setVersion(0L);
        return token;
    }
}