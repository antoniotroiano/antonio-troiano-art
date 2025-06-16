package com.art.backend.service;

import com.art.backend.utils.TestUtils;
import com.art.backend.exception.MailSendException;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.mail.javamail.JavaMailSender;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.doAnswer;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class MailServiceTest {

    private final JavaMailSender mailSender = mock(JavaMailSender.class);
    private final MailService subjectUnderTest = new MailService(mailSender);

    @BeforeEach
    void setup() {
        TestUtils.setField(subjectUnderTest, "mailTo", "test@example.com");
    }

    @Test
    void sendContactMailAsync_sendsMailSuccessfully() {
        // Given
        final String name = "Max Mustermann";
        final String email = "max@example.com";
        final String subject = "Betreff";
        final String message = "Hallo\nTest";

        final MimeMessage mimeMessage = mock(MimeMessage.class);
        when(mailSender.createMimeMessage()).thenReturn(mimeMessage);

        // When
        subjectUnderTest.sendContactMailAsync(name, email, subject, message);

        // Then
        verify(mailSender).send(mimeMessage);
    }

    @Test
    void sendContactMailAsync_throwsMailSendExceptionOnMessagingException() {
        // Given
        final String name = "Max Mustermann";
        final String email = "max@example.com";
        final String subject = "Betreff";
        final String message = "Hallo\nTest";

        final MimeMessage mimeMessage = mock(MimeMessage.class);
        when(mailSender.createMimeMessage()).thenReturn(mimeMessage);
        doAnswer(invocation -> {
            throw new MailSendException("Failed", new MessagingException("Failed"));
        }).when(mailSender).send(mimeMessage);

        // When / Then
        assertThrows(MailSendException.class,
                () -> subjectUnderTest.sendContactMailAsync(name, email, subject, message));
    }
}
