package com.art.backend.internal;

import java.io.Serial;
import java.time.LocalDateTime;
import java.util.Optional;

import com.art.backend.model.Admin;
import com.art.backend.model.RegistrationToken;
import com.art.backend.model.dto.AdminRegistrationRequest;
import com.art.backend.model.dto.AuthRequest;
import com.art.backend.repository.AdminRepository;
import com.art.backend.repository.TokenRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import jakarta.servlet.http.HttpSession;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = AuthController.class,
        excludeAutoConfiguration = {SecurityAutoConfiguration.class})
class AuthControllerTest {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private AdminRepository adminRepository;

    @MockitoBean
    private PasswordEncoder passwordEncoder;

    @MockitoBean
    private TokenRepository tokenRepository;

    @MockitoBean
    private AuthenticationManager authenticationManager;

    @Test
    void registerAdmin_shouldReturnOk_whenNewUser() throws Exception {
        final AuthRequest request = new AuthRequest("user1", "pass123");

        when(adminRepository.findByUsername("user1")).thenReturn(Optional.empty());
        when(passwordEncoder.encode("pass123")).thenReturn("encodedPass");

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(content().string("Admin registered"));

        verify(adminRepository).save(any(Admin.class));
    }

    @Test
    void registerAdmin_shouldReturnBadRequest_whenUserExists() throws Exception {
        final AuthRequest request = new AuthRequest("user1", "pass123");
        when(adminRepository.findByUsername("user1")).thenReturn(Optional.of(new Admin()));

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Admin already exists"));
    }

    @Test
    void registerAdminWithToken_shouldRegisterAndDeleteToken_whenValid() throws Exception {
        final String token = "valid-token";
        final AdminRegistrationRequest adminRequest = new AdminRegistrationRequest();
        adminRequest.setUsername("newuser");
        adminRequest.setPassword("newpass");
        final RegistrationToken registrationToken = new RegistrationToken();
        registrationToken.setToken(token);
        registrationToken.setExpirationDate(LocalDateTime.now().plusDays(1));

        when(tokenRepository.findByToken(token)).thenReturn(Optional.of(registrationToken));
        when(adminRepository.findByUsername("newuser")).thenReturn(Optional.empty());
        when(passwordEncoder.encode("newpass")).thenReturn("encodedPass");

        mockMvc.perform(post("/api/auth/register/token")
                        .param("token", token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(adminRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Admin successfully registered!"));

        verify(adminRepository).save(any(Admin.class));
        verify(tokenRepository).deleteByToken(token);
    }

    @Test
    void registerAdminWithToken_shouldReturnForbidden_whenTokenInvalid() throws Exception {
        final String token = "invalid-token";
        final AdminRegistrationRequest adminRequest = new AdminRegistrationRequest();
        adminRequest.setUsername("newuser");
        adminRequest.setPassword("newpass");

        when(tokenRepository.findByToken(token)).thenReturn(Optional.empty());

        mockMvc.perform(post("/api/auth/register/token")
                        .param("token", token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(adminRequest)))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.message").value("Invalid token"));
    }

    @Test
    void registerAdminWithToken_shouldReturnForbidden_whenTokenExpired() throws Exception {
        final String token = "expired-token";
        final AdminRegistrationRequest adminRequest = new AdminRegistrationRequest();
        adminRequest.setUsername("newuser");
        adminRequest.setPassword("newpass");
        final RegistrationToken registrationToken = new RegistrationToken();
        registrationToken.setToken(token);
        registrationToken.setExpirationDate(LocalDateTime.now().minusDays(1));

        when(tokenRepository.findByToken(token)).thenReturn(Optional.of(registrationToken));

        mockMvc.perform(post("/api/auth/register/token")
                        .param("token", token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(adminRequest)))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.message").value("Token has expired"));

        verify(tokenRepository).deleteByToken(token);
    }

    @Test
    void registerAdminWithToken_shouldReturnBadRequest_whenUsernameExists() throws Exception {
        final String token = "valid-token";
        final AdminRegistrationRequest adminRequest = new AdminRegistrationRequest();
        adminRequest.setUsername("newuser");
        adminRequest.setPassword("newpass");
        final RegistrationToken registrationToken = new RegistrationToken();
        registrationToken.setToken(token);
        registrationToken.setExpirationDate(LocalDateTime.now().plusDays(1));

        when(tokenRepository.findByToken(token)).thenReturn(Optional.of(registrationToken));
        when(adminRepository.findByUsername("newuser")).thenReturn(Optional.of(new Admin()));

        mockMvc.perform(post("/api/auth/register/token")
                        .param("token", token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(adminRequest)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("Username already exists"));
    }

    @Test
    void login_shouldReturnOk_whenCredentialsValid() throws Exception {
        final AuthRequest request = new AuthRequest("user1", "pass123");
        final Authentication authentication = mock(Authentication.class);

        when(authenticationManager.authenticate(any())).thenReturn(authentication);

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Login successful"));
    }

    @Test
    void login_shouldReturnUnauthorized_whenBadCredentials() throws Exception {
        final AuthRequest request = new AuthRequest("user1", "wrongpass");

        when(authenticationManager.authenticate(any())).thenThrow(new BadCredentialsException("Bad credentials"));

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isUnauthorized())
                .andExpect(content().string("Invalid credentials"));
    }

    @Test
    void login_shouldReturnUnauthorized_whenOtherAuthenticationException() throws Exception {
        final AuthRequest request = new AuthRequest("user1", "pass123");

        when(authenticationManager.authenticate(any())).thenThrow(new AuthenticationException("Auth failed") {

            @Serial private static final long serialVersionUID = -1701214429330333245L;
        });

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isUnauthorized())
                .andExpect(content().string("Authentication failed"));
    }

    @Test
    void getCurrentAdmin_shouldReturnUsername_whenAuthenticated() throws Exception {
        final Admin admin = new Admin("user1", "pass");
        final Authentication authentication = mock(Authentication.class);
        when(authentication.isAuthenticated()).thenReturn(true);
        when(authentication.getPrincipal()).thenReturn(admin);

        mockMvc.perform(get("/api/auth/me")
                        .principal(authentication))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username").value("user1"));
    }

    @Test
    void getCurrentAdmin_shouldReturnUnauthorized_whenNotAuthenticated() throws Exception {
        mockMvc.perform(get("/api/auth/me"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void logout_shouldInvalidateSession_andReturnOk() throws Exception {
        final HttpSession session = mock(HttpSession.class);

        mockMvc.perform(post("/api/auth/logout")
                        .sessionAttr("SESSION", session))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Logged out"));
    }
}
