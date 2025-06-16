package com.art.backend.service.instagram;

import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class InstagramTokenRefresher {

    private final InstagramTokenService tokenService;
    private final RestTemplate restTemplate;

    @Value("${instagram.api.refresh-url}")
    String refreshUrlTemplate;

    public InstagramTokenRefresher(final InstagramTokenService tokenService, final RestTemplate restTemplate) {
        this.tokenService = tokenService;
        this.restTemplate = restTemplate;
    }

    @Scheduled(cron = "0 0 3 */55 * *")
    public void refreshToken() {
        try {
            final String currentToken = tokenService.getAccessToken();
            final String url = String.format(refreshUrlTemplate, currentToken);

            final Map response = restTemplate.getForObject(url, Map.class);
            final String newToken = (String) response.get("access_token");

            if (newToken != null) {
                tokenService.saveToken(newToken);
                log.info("✅ Refreshed Instagram access token: {}", newToken);
            } else {
                log.warn("⚠️ Failed to refresh Instagram access token");
            }
        } catch (final Exception e) {
            log.error("❌ Error refreshing Instagram access token", e);
        }
    }
}
