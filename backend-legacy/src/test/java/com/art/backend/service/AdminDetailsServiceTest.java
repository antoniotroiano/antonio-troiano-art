package com.art.backend.service;

import com.art.backend.model.Admin;
import com.art.backend.repository.AdminRepository;

import org.junit.jupiter.api.Test;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class AdminDetailsServiceTest {

    private final AdminRepository adminRepository = mock(AdminRepository.class);
    private final UserDetailsService subjectUnderTest = new AdminDetailsService(adminRepository);

    @Test
    void loadUserByUsernameTest() {
        // Given
        final Admin admin = new Admin("name", "password");
        when(adminRepository.findByUsername(any())).thenReturn(Optional.of(admin));

        // When
        final UserDetails userName = subjectUnderTest.loadUserByUsername("name");

        // Then
        assertNotNull(userName);
        assertEquals("name", userName.getUsername());
        assertEquals("password", userName.getPassword());
    }

    @Test
    void loadUserByUsernameNotFoundTest() {
        // Given / When / Then
        assertThrows(UsernameNotFoundException.class, () -> subjectUnderTest.loadUserByUsername("name"));
    }
}