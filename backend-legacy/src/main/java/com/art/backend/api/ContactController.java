package com.art.backend.api;

import java.time.Instant;

import com.art.backend.model.dto.ContactRequest;
import com.art.backend.model.dto.ContactResponse;
import com.art.backend.service.InMemoryRateLimiter;
import com.art.backend.service.MailService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/mail/contact")
public class ContactController {

    private static final long MINIMUM_WAIT_MILLIS = 5000L;

    private final MailService mailService;
    private final InMemoryRateLimiter inMemoryRateLimiter;

    public ContactController(final MailService mailService, final InMemoryRateLimiter inMemoryRateLimiter) {
        this.mailService = mailService;
        this.inMemoryRateLimiter = inMemoryRateLimiter;
    }

    @PostMapping
    public ResponseEntity<ContactResponse> handleContact(@RequestBody final ContactRequest contactRequest,
            final HttpServletRequest request) {
        final String ip = extractClientIp(request);
        log.info("Received contact request from with subject='{}'", contactRequest.getSubject());

        if (!inMemoryRateLimiter.isAllowed(ip)) {
            log.warn("Rate limit exceeded for IP={}", ip);
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
                    .body(new ContactResponse(false, "Please wait a few seconds before sending again."));
        }

        if (contactRequest.getHoneypot() != null && !contactRequest.getHoneypot().isBlank()) {
            log.warn("Bot detected via honeypot field from IP={}", ip);
            return ResponseEntity.badRequest().body(new ContactResponse(false, "Bot detection triggered."));
        }

        if (contactRequest.getFormDisplayedAt() == null) {
            log.warn("Missing formDisplayedAt field from IP={}", ip);
            return ResponseEntity.badRequest().body(new ContactResponse(false, "Missing form data"));
        }

        final long elapsed = Instant.now().toEpochMilli() - contactRequest.getFormDisplayedAt().toEpochMilli();
        if (elapsed < MINIMUM_WAIT_MILLIS) {
            log.warn("Form submitted too quickly ({} ms) from IP={}", elapsed, ip);
            return ResponseEntity.badRequest()
                    .body(new ContactResponse(false, "Submitting too fast. Please wait a moment."));
        }

        mailService.sendContactMailAsync(
                contactRequest.getName(),
                contactRequest.getEmail(),
                contactRequest.getSubject(),
                contactRequest.getMessage());
        log.info("Contact mail sent successfully for subject={}", contactRequest.getSubject());
        return ResponseEntity.accepted().body(new ContactResponse(true, "Mail sent successfully."));
    }

    private static String extractClientIp(final HttpServletRequest request) {
        final String xfHeader = request.getHeader("X-Forwarded-For");
        return xfHeader != null ? xfHeader.split(",")[0] : request.getRemoteAddr();
    }
}
