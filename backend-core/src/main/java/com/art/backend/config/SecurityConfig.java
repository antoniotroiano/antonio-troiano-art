package com.art.backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Configuration
public class SecurityConfig {

    @Value("${app.cors.allowed-origins}")
    private List<String> allowedOrigins;

    public SecurityConfig() {
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        log.info("app.cors.allowed-origins={}", allowedOrigins);

        final CorsConfiguration publicConfig = new CorsConfiguration();
        publicConfig.setAllowedOrigins(allowedOrigins);
        publicConfig.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        publicConfig.setAllowedHeaders(List.of("Content-Type"));
        publicConfig.setAllowCredentials(false);

        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", publicConfig);

        return source;
    }
}

