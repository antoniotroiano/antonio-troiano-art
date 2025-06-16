package com.art.backend.service.instagram;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;

import com.art.backend.model.InstagramToken;
import com.art.backend.repository.InstagramTokenRepository;

import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class InstagramTokenService {

    private final InstagramTokenRepository instagramTokenRepository;

    @Value("${instagram.initial-token}")
    private String initialToken;

    public InstagramTokenService(final InstagramTokenRepository instagramTokenRepository) {
        this.instagramTokenRepository = instagramTokenRepository;
    }

    @PostConstruct
    public void init() {
        try {
            final boolean exists = instagramTokenRepository.existsById(1L);
            if (!exists && initialToken != null && !initialToken.isBlank()) {
                final InstagramToken token = new InstagramToken();
                token.setAccessToken(initialToken);
                token.setLastRefreshed(Instant.now());
                token.setVersion(0L);

                log.info("Initial Instagram token: {}", initialToken);
                instagramTokenRepository.save(token);
                log.info(instagramTokenRepository.findAll().toString());
                log.info("Initial Instagram token inserted into database.");
            } else {
                log.info("Instagram token already exists in DB or no initial token configured.");
            }
        } catch (final Exception e) {
            log.error("Failed to initialize Instagram token", e);
        }
    }

    public String getAccessToken() {
        return loadToken();
    }

    private String loadToken() {
        return instagramTokenRepository.findById(1L)
                .orElseThrow(() -> new IllegalStateException("Instagram token not found"))
                .getAccessToken();
    }

    @Transactional
    void saveToken(final String token) {
        final InstagramToken tokenEntity = instagramTokenRepository.findById(1L)
                .orElse(new InstagramToken());

        tokenEntity.setAccessToken(token);
        tokenEntity.setLastRefreshed(Instant.now());

        instagramTokenRepository.save(tokenEntity);
    }

    Instant loadLastRefreshTime() {
        return instagramTokenRepository.findById(1L)
                .orElseThrow(() -> new IllegalStateException("Instagram token not found"))
                .getLastRefreshed();
    }

    void saveLastRefreshTime(final Instant time) {
        final InstagramToken tokenEntity = instagramTokenRepository.findById(1L)
                .orElseThrow(() -> new IllegalStateException("Instagram token not found"));

        tokenEntity.setLastRefreshed(time);
        instagramTokenRepository.save(tokenEntity);
    }
}
