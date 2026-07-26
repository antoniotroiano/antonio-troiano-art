package com.art.backend.integration.controller;

import java.time.LocalDateTime;
import java.util.UUID;

import com.art.backend.integration.TestConfig;
import com.art.backend.model.Admin;
import com.art.backend.model.RegistrationToken;
import com.art.backend.model.dto.AdminRegistrationRequest;
import com.art.backend.model.dto.AuthRequest;
import com.art.backend.repository.AdminRepository;
import com.art.backend.repository.TokenRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
@ActiveProfiles("test")
@Import(TestConfig.class)
class ErrorHandlingIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private TokenRepository tokenRepository;

    @Autowired
    private AdminRepository adminRepository;

    @Test
    void givenInvalidRoute_whenRequest_thenReturns404() throws Exception {
        mockMvc.perform(get("/api/invalid/route"))
                .andExpect(status().isNotFound());
    }

    @Test
    void givenWrongHttpMethod_whenRequest_thenReturns405() throws Exception {
        mockMvc.perform(put("/api/auth/login"))
                .andExpect(status().isMethodNotAllowed());
    }

    @Test
    void givenUnauthenticatedAccess_whenGetCurrentAdmin_thenReturns401() throws Exception {
        mockMvc.perform(get("/api/auth/me"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void givenInvalidCredentials_whenLogin_thenReturns401() throws Exception {
        final AuthRequest request = new AuthRequest("wrongUser", "wrongPass");
        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJson(request)))
                .andExpect(status().isUnauthorized())
                .andExpect(content().string(containsString("Invalid credentials")));
    }

    @Test
    void givenInvalidToken_whenRegisterAdmin_thenReturns403() throws Exception {
        final AdminRegistrationRequest registrationRequest = new AdminRegistrationRequest();
        registrationRequest.setUsername("user");
        registrationRequest.setPassword("pass");

        mockMvc.perform(post("/api/auth/register/token")
                        .param("token", "invalid-token")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJson(registrationRequest)))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.message").value("Invalid token"));
    }

    @Test
    void givenExpiredToken_whenRegisterAdmin_thenReturns403() throws Exception {
        final String tokenValue = UUID.randomUUID().toString();
        final RegistrationToken token = new RegistrationToken(tokenValue, LocalDateTime.now().minusMinutes(1));
        tokenRepository.save(token);

        final AdminRegistrationRequest registrationRequest = new AdminRegistrationRequest();
        registrationRequest.setUsername("user");
        registrationRequest.setPassword("pass");

        mockMvc.perform(post("/api/auth/register/token")
                        .param("token", tokenValue)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJson(registrationRequest)))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.message").value("Token has expired"));
    }

    @Test
    void givenExistingUsername_whenRegisterAdmin_thenReturns400() throws Exception {
        adminRepository.save(new Admin("existingUser", "secret"));

        final AuthRequest request = new AuthRequest("existingUser", "anotherPass");

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJson(request)))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Admin already exists"));
    }

    private static String asJson(final Object obj) throws JsonProcessingException {
        return new ObjectMapper().writeValueAsString(obj);
    }
}
