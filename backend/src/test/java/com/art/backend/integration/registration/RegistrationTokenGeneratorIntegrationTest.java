package com.art.backend.integration.registration;

import java.time.LocalDateTime;

import com.art.backend.integration.TestConfig;
import com.art.backend.registration.RegistrationTokenGenerator;
import com.art.backend.model.RegistrationToken;
import com.art.backend.repository.TokenRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ActiveProfiles;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@ActiveProfiles("test")
@Import(TestConfig.class)
class RegistrationTokenGeneratorIntegrationTest {

    @Autowired
    private TokenRepository tokenRepository;

    @Autowired
    private RegistrationTokenGenerator generator;

    @BeforeEach
    void setUp() {
        tokenRepository.deleteAll();
    }

    @Test
    void shouldGenerateTokenIfNoneExists() throws Exception {
        assertThat(tokenRepository.count()).isEqualTo(0);

        generator.createToken().run();

        assertThat(tokenRepository.count()).isEqualTo(1);
        final RegistrationToken token = tokenRepository.findAll().get(0);
        assertThat(token.getToken()).isNotNull();
        assertThat(token.getExpirationDate()).isAfter(LocalDateTime.now());
    }

    @Test
    void shouldNotGenerateTokenIfAlreadyExists() throws Exception {
        tokenRepository.save(new RegistrationToken("existing-token", LocalDateTime.now().plusHours(2)));

        generator.createToken().run();

        assertThat(tokenRepository.count()).isEqualTo(1);
        assertThat(tokenRepository.findByToken("existing-token")).isPresent();
    }
}
