package com.art.backend.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class InMemoryRateLimiterTest {

    private InMemoryRateLimiter rateLimiter;

    @BeforeEach
    void setUp() {
        rateLimiter = new InMemoryRateLimiter();
        rateLimiter.setMaxRequests(5);
        rateLimiter.setTimeWindowSeconds(1);
    }

    @Test
    void givenNewKey_whenRequestsBelowLimit_thenAllowed() {
        // Given
        final String key = "user1";

        // When & Then
        for (int i = 0; i < 5; i++) {
            final boolean allowed = rateLimiter.isAllowed(key);
            assertTrue(allowed, "Request " + (i + 1) + " should be allowed");
        }
    }

    @Test
    void givenRequestsExceedingLimit_whenIsAllowed_thenBlocked() {
        // Given
        final String key = "user2";

        // When: 5 requests allowed
        for (int i = 0; i < 5; i++) {
            assertTrue(rateLimiter.isAllowed(key));
        }

        // 6th request blocked
        final boolean allowed = rateLimiter.isAllowed(key);

        // Then
        assertFalse(allowed, "6th request should be blocked due to rate limit");
    }

    @Test
    void givenOldRequests_whenIsAllowed_thenWindowSlides() throws InterruptedException {
        // Given
        final String key = "user3";

        for (int i = 0; i < 4; i++) {
            assertTrue(rateLimiter.isAllowed(key));
        }

        Thread.sleep(1100);

        final boolean allowed = rateLimiter.isAllowed(key);

        // Then
        assertTrue(allowed, "Request after sliding window should be allowed");
    }

    @Test
    void givenKey_whenReset_thenRequestsAreCleared() {
        // Given
        final String key = "user4";

        for (int i = 0; i < 5; i++) {
            assertTrue(rateLimiter.isAllowed(key));
        }

        // When
        rateLimiter.reset(key);

        // Then
        assertTrue(rateLimiter.isAllowed(key), "Request after reset should be allowed");
    }

    @Test
    void givenMultipleKeys_whenClearAll_thenAllCleared() {
        // Given
        final String key1 = "user5";
        final String key2 = "user6";

        for (int i = 0; i < 5; i++) {
            assertTrue(rateLimiter.isAllowed(key1));
            assertTrue(rateLimiter.isAllowed(key2));
        }

        // When
        rateLimiter.clearAll();

        // Then
        assertTrue(rateLimiter.isAllowed(key1), "Request after clearAll should be allowed for key1");
        assertTrue(rateLimiter.isAllowed(key2), "Request after clearAll should be allowed for key2");
    }
}
