package com.art.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class InMemoryRateLimiter {

    private final Map<String, List<Instant>> attempts = new ConcurrentHashMap<>();

    private int maxRequests;
    private int timeWindowSeconds;

    @Value("${ratelimiter.requests}")
    public void setMaxRequests(final int maxRequests) {
        this.maxRequests = maxRequests;
    }

    @Value("${ratelimiter.timeWindowSeconds}")
    public void setTimeWindowSeconds(final int timeWindowSeconds) {
        this.timeWindowSeconds = timeWindowSeconds;
    }

    public synchronized boolean isAllowed(final String key) {
        final Instant now = Instant.now();
        List<Instant> timestamps = attempts.getOrDefault(key, new ArrayList<>());

        timestamps = timestamps.stream()
                .filter(t -> Duration.between(t, now).getSeconds() < timeWindowSeconds)
                .toList();

        if (timestamps.size() >= maxRequests) {
            log.debug("Rate limit hit for key={}", key);
            return false;
        }

        final List<Instant> updatedTimestamps = new ArrayList<>(timestamps);
        updatedTimestamps.add(now);
        attempts.put(key, updatedTimestamps);
        return true;
    }

    synchronized void reset(final String key) {
        attempts.remove(key);
    }

    synchronized void clearAll() {
        attempts.clear();
    }
}
