package com.art.backend.service.instagram;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestOperations;
import org.springframework.web.util.UriComponentsBuilder;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class InstagramService {

    private static final String INSTAGRAM_URL = "https://graph.instagram.com/me/media";

    private final RestOperations restTemplate;

    public InstagramService(final RestOperations restTemplate) {
        this.restTemplate = restTemplate;
    }

    public Object fetchInstagramFeed(final String accessToken) {
        final String uri = UriComponentsBuilder
                .fromUriString(INSTAGRAM_URL)
                .queryParam("fields", "id,media_type,media_url,permalink,caption")
                .queryParam("access_token", accessToken)
                .toUriString();

        final ResponseEntity<Map> response = restTemplate.getForEntity(uri, Map.class);
        if (!response.getStatusCode().is2xxSuccessful()) {
            log.error("Error during fetch Instagram feed. Status code: {}", response.getStatusCode());
        }
        if (response.getBody().get("error") != null) {
            log.error("Error during fetch Instagram feed. Error: {}", response.getBody().get("error").toString());
        }
        return response.getBody().get("data");
    }
}
