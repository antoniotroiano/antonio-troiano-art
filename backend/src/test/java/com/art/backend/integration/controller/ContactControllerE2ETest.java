package com.art.backend.integration.controller;

import java.time.Instant;

import com.art.backend.integration.TestConfig;
import com.art.backend.model.dto.ContactRequest;
import com.art.backend.model.dto.ContactResponse;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestInstance.Lifecycle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.context.annotation.Import;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@TestInstance(Lifecycle.PER_CLASS)
@ActiveProfiles("test-postgres")
@Import(TestConfig.class)
class ContactControllerE2ETest {

    @Autowired
    private TestRestTemplate restTemplate;

    private ContactRequest baseRequest;

    @BeforeEach
    void setup() {
        baseRequest = new ContactRequest();
        baseRequest.setName("Max");
        baseRequest.setEmail("max@example.com");
        baseRequest.setSubject("Test");
        baseRequest.setMessage("Hallo!");
        baseRequest.setFormDisplayedAt(Instant.now().minusSeconds(10));
        baseRequest.setHoneypot("");
    }

    @Test
    @Disabled
    void givenValidContactRequest_whenSend_thenReturns202() {
        final HttpEntity<ContactRequest> entity = new HttpEntity<>(baseRequest);
        final ResponseEntity<ContactResponse> response =
                restTemplate.postForEntity("/api/mail/contact", entity, ContactResponse.class);

        assertEquals(HttpStatus.ACCEPTED, response.getStatusCode());
        assertTrue(response.getBody().isSuccess());
        assertEquals("Mail sent successfully.", response.getBody().getMessage());
    }

    @Test
    void givenHoneypotFilled_whenSend_thenReturns400() {
        baseRequest.setHoneypot("spam");

        final HttpEntity<ContactRequest> entity = new HttpEntity<>(baseRequest);
        final ResponseEntity<ContactResponse> response =
                restTemplate.postForEntity("/api/mail/contact", entity, ContactResponse.class);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertFalse(response.getBody().isSuccess());
        assertEquals("Bot detection triggered.", response.getBody().getMessage());
    }

    @Test
    void givenFormSubmittedTooQuickly_whenSend_thenReturns400() {
        baseRequest.setFormDisplayedAt(Instant.now());

        final HttpEntity<ContactRequest> entity = new HttpEntity<>(baseRequest);
        final ResponseEntity<ContactResponse> response =
                restTemplate.postForEntity("/api/mail/contact", entity, ContactResponse.class);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertFalse(response.getBody().isSuccess());
        assertEquals("Submitting too fast. Please wait a moment.", response.getBody().getMessage());
    }

    @Test
    void givenMissingRequiredFields_whenSend_thenReturns400() {
        baseRequest.setFormDisplayedAt(null);

        final HttpEntity<ContactRequest> entity = new HttpEntity<>(baseRequest);
        final ResponseEntity<ContactResponse> response =
                restTemplate.postForEntity("/api/mail/contact", entity, ContactResponse.class);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertFalse(response.getBody().isSuccess());
        assertEquals("Missing form data", response.getBody().getMessage());
    }
}
