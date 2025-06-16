package com.art.backend.registration;

import com.art.backend.model.RegistrationToken;
import com.art.backend.repository.TokenRepository;

import lombok.extern.slf4j.Slf4j;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.UUID;

@Slf4j
@Component
public class RegistrationTokenGenerator {

    private final TokenRepository tokenRepository;

    public RegistrationTokenGenerator(final TokenRepository tokenRepository) {
        this.tokenRepository = tokenRepository;
    }

    @Bean
    public CommandLineRunner createToken() {
        return args -> {
            if (tokenRepository.count() == 0) {
                String token;
                do {
                    token = UUID.randomUUID().toString();
                } while (tokenRepository.findByToken(token).isPresent());

                tokenRepository.save(new RegistrationToken(token, LocalDateTime.now().plusHours(1)));
                log.info("🚀 One-time admin registration token: {}", token);
            }
        };
    }
}
