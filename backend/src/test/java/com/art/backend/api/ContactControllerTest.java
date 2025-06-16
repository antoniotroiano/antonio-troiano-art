package com.art.backend.api;

import java.time.Instant;

import com.art.backend.model.dto.ContactRequest;
import com.art.backend.service.InMemoryRateLimiter;
import com.art.backend.service.MailService;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = ContactController.class,
        excludeAutoConfiguration = SecurityAutoConfiguration.class)
class ContactControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private MailService mailService;

    @MockitoBean
    private InMemoryRateLimiter inMemoryRateLimiter;

    @Autowired
    private ObjectMapper objectMapper;

    private ContactRequest validRequest;

    @BeforeEach
    void setup() {
        validRequest = new ContactRequest();
        validRequest.setName("Max Mustermann");
        validRequest.setEmail("max@example.com");
        validRequest.setSubject("Test Subject");
        validRequest.setMessage("Test message");
        validRequest.setFormDisplayedAt(Instant.now().minusMillis(6000));
        validRequest.setHoneypot(null);
    }

    @Test
    void handleContact_shouldReturnAccepted_whenValid() throws Exception {
        when(inMemoryRateLimiter.isAllowed(anyString())).thenReturn(true);
        doNothing().when(mailService).sendContactMailAsync(anyString(), anyString(), anyString(), anyString());

        mockMvc.perform(post("/api/mail/contact")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(validRequest))
                        .header("X-Forwarded-For", "1.2.3.4"))
                .andExpect(status().isAccepted())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("Mail sent successfully."));

        verify(mailService).sendContactMailAsync(eq("Max Mustermann"), eq("max@example.com"), eq("Test Subject"),
                eq("Test message"));
    }

    @Test
    void handleContact_shouldReturnTooManyRequests_whenRateLimited() throws Exception {
        when(inMemoryRateLimiter.isAllowed(anyString())).thenReturn(false);

        mockMvc.perform(post("/api/mail/contact")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(validRequest))
                        .header("X-Forwarded-For", "1.2.3.4"))
                .andExpect(status().isTooManyRequests())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Please wait a few seconds before sending again."));

        verify(mailService, never()).sendContactMailAsync(anyString(), anyString(), anyString(), anyString());
    }

    @Test
    void handleContact_shouldReturnBadRequest_whenHoneypotFilled() throws Exception {
        validRequest.setHoneypot("I am a bot");

        when(inMemoryRateLimiter.isAllowed(anyString())).thenReturn(true);

        mockMvc.perform(post("/api/mail/contact")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(validRequest)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Bot detection triggered."));

        verify(mailService, never()).sendContactMailAsync(anyString(), anyString(), anyString(), anyString());
    }

    @Test
    void handleContact_shouldReturnBadRequest_whenFormDisplayedAtMissing() throws Exception {
        validRequest.setFormDisplayedAt(null);

        when(inMemoryRateLimiter.isAllowed(anyString())).thenReturn(true);

        mockMvc.perform(post("/api/mail/contact")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(validRequest)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Missing form data"));

        verify(mailService, never()).sendContactMailAsync(anyString(), anyString(), anyString(), anyString());
    }

    @Test
    void handleContact_shouldReturnBadRequest_whenSubmittedTooFast() throws Exception {
        // Form displayed less than MINIMUM_WAIT_MILLIS ago (e.g. 1000 ms ago)
        validRequest.setFormDisplayedAt(Instant.now());

        when(inMemoryRateLimiter.isAllowed(anyString())).thenReturn(true);

        mockMvc.perform(post("/api/mail/contact")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(validRequest)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Submitting too fast. Please wait a moment."));

        verify(mailService, never()).sendContactMailAsync(anyString(), anyString(), anyString(), anyString());
    }
}
