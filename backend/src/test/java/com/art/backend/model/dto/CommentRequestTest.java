package com.art.backend.model.dto;

import java.util.Set;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;

import static org.assertj.core.api.Assertions.assertThat;

class CommentRequestTest {

    private Validator validator;

    @BeforeEach
    void setUp() {
        final ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }

    @Test
    void whenValidCommentRequest_thenNoViolations() {
        // Given
        final CommentRequest request = new CommentRequest();
        request.setName("Jane Doe");
        request.setContent("This is a valid comment.");
        request.setHoneypot("");
        request.setFormDisplayedAt(System.currentTimeMillis());

        // When
        final Set<ConstraintViolation<CommentRequest>> violations = validator.validate(request);

        // Then
        assertThat(violations).isEmpty();
    }

    @Test
    void whenNameIsBlank_thenValidationFails() {
        // Given
        final CommentRequest request = new CommentRequest();
        request.setName(" ");
        request.setContent("Valid comment");

        // When
        final Set<ConstraintViolation<CommentRequest>> violations = validator.validate(request);

        // Then
        assertThat(violations).anyMatch(v -> v.getPropertyPath().toString().equals("name"));
    }

    @Test
    void whenContentIsBlank_thenValidationFails() {
        // Given
        final CommentRequest request = new CommentRequest();
        request.setName("John");
        request.setContent(" ");

        // When
        final Set<ConstraintViolation<CommentRequest>> violations = validator.validate(request);

        // Then
        assertThat(violations).anyMatch(v -> v.getPropertyPath().toString().equals("content"));
    }

    @Test
    void whenNameTooLong_thenValidationFails() {
        // Given
        final CommentRequest request = new CommentRequest();
        request.setName("a".repeat(101));
        request.setContent("Valid");

        // When
        final Set<ConstraintViolation<CommentRequest>> violations = validator.validate(request);

        // Then
        assertThat(violations).anyMatch(v -> v.getPropertyPath().toString().equals("name"));
    }

    @Test
    void whenContentTooLong_thenValidationFails() {
        // Given
        final CommentRequest request = new CommentRequest();
        request.setName("John");
        request.setContent("a".repeat(1001));

        // When
        final Set<ConstraintViolation<CommentRequest>> violations = validator.validate(request);

        // Then
        assertThat(violations).anyMatch(v -> v.getPropertyPath().toString().equals("content"));
    }
}
