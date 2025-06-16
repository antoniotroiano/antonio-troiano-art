package com.art.backend.integration.config;

import com.art.backend.config.AdminInitializer;
import com.art.backend.integration.TestConfig;
import com.art.backend.model.Admin;
import com.art.backend.repository.AdminRepository;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestInstance.Lifecycle;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;

import uk.org.webcompere.systemstubs.environment.EnvironmentVariables;
import uk.org.webcompere.systemstubs.jupiter.SystemStub;
import uk.org.webcompere.systemstubs.jupiter.SystemStubsExtension;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@ExtendWith(SystemStubsExtension.class)
@SpringBootTest
@ActiveProfiles("test")
@TestInstance(Lifecycle.PER_CLASS)
@Import(TestConfig.class)
class AdminInitializerIntegrationTest {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @SystemStub
    private EnvironmentVariables environmentVariables;

    @Test
    void givenValidEnvVars_whenInitRuns_thenAdminIsCreated() throws Exception {
        // Given
        environmentVariables.set("ADMIN_USERNAME", "admin");
        environmentVariables.set("ADMIN_PASSWORD", "password");

        // When
        final AdminInitializer initializer = new AdminInitializer(adminRepository, passwordEncoder);
        initializer.initAdmin().run();

        // Then
        assertThat(adminRepository.existsByUsername("admin")).isTrue();
        final Admin admin = adminRepository.findByUsername("admin").orElseThrow();
        assertThat(passwordEncoder.matches("password", admin.getPassword())).isTrue();
    }

    @Test
    void givenMissingEnvVars_whenInitRuns_thenAdminIsNotCreated() throws Exception {
        // Given
        environmentVariables.remove("ADMIN_USERNAME");
        environmentVariables.remove("ADMIN_PASSWORD");

        final AdminInitializer initializer = new AdminInitializer(adminRepository, passwordEncoder);

        // When
        initializer.initAdmin().run();

        // Then
        assertThat(adminRepository.count()).isZero();
    }

    @Test
    void givenAdminAlreadyExists_whenInitRuns_thenNoDuplicateCreated() throws Exception {
        // Given
        final String username = "admin";
        final String password = "password";

        environmentVariables.set("ADMIN_USERNAME", username);
        environmentVariables.set("ADMIN_PASSWORD", password);

        adminRepository.save(new Admin(username, passwordEncoder.encode(password)));

        final AdminInitializer initializer = new AdminInitializer(adminRepository, passwordEncoder);

        // When
        initializer.initAdmin().run();

        // Then
        assertThat(adminRepository.count()).isOne();
    }
}
