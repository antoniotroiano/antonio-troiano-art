package com.art.backend.api;

import java.util.Map;

import com.art.backend.service.instagram.InstagramService;
import com.art.backend.service.instagram.InstagramTokenService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/instagram")
public class InstagramController {

    private final InstagramTokenService tokenService;
    private final InstagramService instagramService;

    public InstagramController(final InstagramTokenService tokenService, final InstagramService instagramService) {
        this.tokenService = tokenService;
        this.instagramService = instagramService;
    }

    @GetMapping
    public ResponseEntity<?> getInstagramPosts() {
        log.info("Fetching Instagram posts...");
        try {
            final String token = tokenService.getAccessToken();

            final Object feed = instagramService.fetchInstagramFeed(token);
            return ResponseEntity.ok(feed);
        } catch (final Exception e) {
            log.error("Instagram API failed {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Instagram API failed", "details", e.getMessage()));
        }
    }
}
