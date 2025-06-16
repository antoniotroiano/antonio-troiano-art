package com.art.backend.model.dto;

import java.time.LocalDate;
import java.util.Set;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;

import static org.assertj.core.api.Assertions.assertThat;

class BlogPostRequestTest {

    private Validator validator;

    @BeforeEach
    void setUp() {
        final ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }

    @Test
    void whenValidBlogPost_thenNoViolations() {
        // Given
        final BlogPostRequest request = new BlogPostRequest();
        request.setTitle("Valid Title");
        request.setAuthor("Author Name");
        request.setDate(LocalDate.now());
        request.setContent("Valid content.");
        request.setCover("optional-cover.jpg");
        request.setCategory("optional-category");
        request.setDescription("optional description");

        // When
        final Set<ConstraintViolation<BlogPostRequest>> violations = validator.validate(request);

        // Then
        assertThat(violations).isEmpty();
    }

    @Test
    void whenTitleIsBlank_thenValidationFails() {
        // Given
        final BlogPostRequest request = new BlogPostRequest();
        request.setTitle(" ");
        request.setAuthor("Author Name");
        request.setDate(LocalDate.now());
        request.setContent("Content");

        // When
        final Set<ConstraintViolation<BlogPostRequest>> violations = validator.validate(request);

        // Then
        assertThat(violations).anyMatch(v -> v.getPropertyPath().toString().equals("title"));
    }

    @Test
    void whenAuthorIsNull_thenValidationFails() {
        // Given
        final BlogPostRequest request = new BlogPostRequest();
        request.setTitle("Valid");
        request.setAuthor(null);
        request.setDate(LocalDate.now());
        request.setContent("Content");

        // When
        final Set<ConstraintViolation<BlogPostRequest>> violations = validator.validate(request);

        // Then
        assertThat(violations).anyMatch(v -> v.getPropertyPath().toString().equals("author"));
    }

    @Test
    void whenDateIsNull_thenValidationFails() {
        // Given
        final BlogPostRequest request = new BlogPostRequest();
        request.setTitle("Valid");
        request.setAuthor("Author");
        request.setDate(null);
        request.setContent("Content");

        // When
        final Set<ConstraintViolation<BlogPostRequest>> violations = validator.validate(request);

        // Then
        assertThat(violations).anyMatch(v -> v.getPropertyPath().toString().equals("date"));
    }

    @Test
    void whenContentIsBlank_thenValidationFails() {
        // Given
        final BlogPostRequest request = new BlogPostRequest();
        request.setTitle("Valid");
        request.setAuthor("Author");
        request.setDate(LocalDate.now());
        request.setContent(" ");

        // When
        final Set<ConstraintViolation<BlogPostRequest>> violations = validator.validate(request);

        // Then
        assertThat(violations).anyMatch(v -> v.getPropertyPath().toString().equals("content"));
    }
}
