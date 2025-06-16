package com.art.backend.config;

import com.art.backend.model.Admin;
import com.art.backend.repository.AdminRepository;

import lombok.extern.slf4j.Slf4j;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class AdminInitializer {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminInitializer(final AdminRepository adminRepository, final PasswordEncoder passwordEncoder) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Bean
    public CommandLineRunner initAdmin() {
        return args -> {
            final String adminUsername = System.getenv("ADMIN_USERNAME");
            final String adminPassword = System.getenv("ADMIN_PASSWORD");

            if (adminUsername == null || adminUsername.isBlank() ||
                    adminPassword == null || adminPassword.isBlank()) {
                log.error("⚠️ Missing environment variables: ADMIN_USERNAME and/or ADMIN_PASSWORD");
                return;
            }

            if (adminRepository.existsByUsername(adminUsername)) {
                log.info("✅ Admin '{}' already exists", adminUsername);
                return;
            }

            adminRepository.save(new Admin(adminUsername, passwordEncoder.encode(adminPassword)));
            log.info("🚀 Admin '{}' created", adminUsername);
        };
    }
}
