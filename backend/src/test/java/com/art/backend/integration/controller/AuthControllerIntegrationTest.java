package com.art.backend.integration.controller;

import java.time.LocalDateTime;

import com.art.backend.integration.TestConfig;
import com.art.backend.model.Admin;
import com.art.backend.model.RegistrationToken;
import com.art.backend.model.dto.AdminRegistrationRequest;
import com.art.backend.model.dto.AuthRequest;
import com.art.backend.repository.AdminRepository;
import com.art.backend.repository.TokenRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestInstance.Lifecycle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@AutoConfigureTestDatabase
@TestInstance(Lifecycle.PER_CLASS)
@ActiveProfiles("test-postgres")
@Import(TestConfig.class)
class AuthControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private TokenRepository tokenRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Test
    void givenValidRequest_whenRegister_thenOk() throws Exception {
        final var request = new AuthRequest("newadmin", "password123");

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(content().string(containsString("Admin registered")));
    }

    @Test
    void givenExistingUsername_whenRegister_thenBadRequest() throws Exception {
        adminRepository.save(new Admin("admin", passwordEncoder.encode("pw")));

        final var request = new AuthRequest("admin", "pw");

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(content().string(containsString("Admin already exists")));
    }

    @Test
    void givenValidToken_whenRegisterWithToken_thenOk() throws Exception {
        final var token = new RegistrationToken("token123", LocalDateTime.now().plusMinutes(10));
        tokenRepository.save(token);

        final var request = new AdminRegistrationRequest();
        request.setUsername("tokadmin");
        request.setPassword("secure");

        mockMvc.perform(post("/api/auth/register/token")
                        .param("token", "token123")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Admin successfully registered!"));
    }

    @Test
    void givenExpiredToken_whenRegisterWithToken_thenForbidden() throws Exception {
        final var token = new RegistrationToken("expiredToken", LocalDateTime.now().minusMinutes(5));
        tokenRepository.save(token);

        final var request = new AdminRegistrationRequest();
        request.setUsername("expiredadmin");
        request.setPassword("pw");

        mockMvc.perform(post("/api/auth/register/token")
                        .param("token", "expiredToken")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(request)))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.message").value("Token has expired"));
    }

    @Test
    void givenValidCredentials_whenLogin_thenOk() throws Exception {
        adminRepository.save(new Admin("loginadmin", passwordEncoder.encode("pw")));

        final var request = new AuthRequest("loginadmin", "pw");

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Login successful"));
    }

    @Test
    void givenInvalidCredentials_whenLogin_thenUnauthorized() throws Exception {
        final var request = new AuthRequest("nouser", "wrong");

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(request)))
                .andExpect(status().isUnauthorized())
                .andExpect(content().string(containsString("Invalid credentials")));
    }

    @Test
    void givenLoggedIn_whenGetCurrentAdmin_thenReturnsUsername() throws Exception {
        final var admin = new Admin("sessionuser", passwordEncoder.encode("pw"));
        adminRepository.save(admin);

        final var session = mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(new AuthRequest("sessionuser", "pw"))))
                .andExpect(status().isOk())
                .andReturn()
                .getRequest()
                .getSession();

        mockMvc.perform(get("/api/auth/me").session((MockHttpSession) session))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username").value("sessionuser"));
    }

    @Test
    void givenNoSession_whenGetCurrentAdmin_thenUnauthorized() throws Exception {
        mockMvc.perform(get("/api/auth/me"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.message").value("Not logged in"));
    }

    @Test
    void givenLoggedIn_whenLogout_thenSessionInvalidated() throws Exception {
        final var admin = new Admin("logoutuser", passwordEncoder.encode("pw"));
        adminRepository.save(admin);

        final var session = mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(new AuthRequest("logoutuser", "pw"))))
                .andExpect(status().isOk())
                .andReturn()
                .getRequest()
                .getSession();

        mockMvc.perform(post("/api/auth/logout").session((MockHttpSession) session))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Logged out"));
    }
}
