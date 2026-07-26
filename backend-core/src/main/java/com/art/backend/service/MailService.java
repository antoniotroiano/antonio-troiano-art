package com.art.backend.service;

import com.art.backend.exception.MailSendException;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;

@Slf4j
@Service
public class MailService {

    private final JavaMailSender mailSender;

    @Value("${mail.to}")
    private String mailTo;

    MailService(final JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Async
    public void sendContactMailAsync(final String name, final String email, final String subject,
            final String requestType, final String message) {
        log.debug("Preparing contact mail to {}", mailTo);

        try {
            final MimeMessage mimeMessage = mailSender.createMimeMessage();
            final MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);

            helper.setFrom(mailTo, "Kontaktformular");
            helper.setTo(mailTo);
            helper.setReplyTo(email, name);
            helper.setSubject("Neue Kontaktanfrage von: " + name);

            final String html = """
                    <h2>Kontaktanfrage</h2>
                    <p><strong>Name:</strong> %s</p>
                    <p><strong>Email:</strong> %s</p>
                    <p><strong>Betreff:</strong> %s</p>
                    <p><strong>Anfragetyp:</strong> %s</p>
                    <p><strong>Nachricht:</strong></p>
                    <p>%s</p>
                    """.formatted(name, email, subject, requestType, message.replace("\n", "<br>"));

            helper.setText(html, true);

            mailSender.send(mimeMessage);

            log.info("Contact mail sent to {}", mailTo);
        } catch (final MessagingException e) {
            log.error(e.getMessage(), e);
            throw new MailSendException("Failed to send contact mail", e);
        } catch (final UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }
    }
}
