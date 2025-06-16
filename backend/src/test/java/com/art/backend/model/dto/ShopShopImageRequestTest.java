package com.art.backend.model.dto;

import java.util.List;
import java.util.Set;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;

import static org.assertj.core.api.Assertions.assertThat;

class ShopShopImageRequestTest {

    private Validator validator;

    @BeforeEach
    void setUp() {
        final ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }

    @Test
    void whenValidImageRequest_thenNoViolations() {
        // Given
        final ShopImageRequest request = new ShopImageRequest();
        request.setTitle("Artwork 1");
        request.setDescription("An abstract painting");
        request.setShopImageUrls(List.of("https://cdn.example.com/img1.jpg"));
        request.setYouTubeLink("https://youtube.com/watch?v=xyz123");

        // When
        final Set<ConstraintViolation<ShopImageRequest>> violations = validator.validate(request);

        // Then
        assertThat(violations).isEmpty();
    }

    @Test
    void whenTitleIsBlank_thenValidationFails() {
        // Given
        final ShopImageRequest request = new ShopImageRequest();
        request.setTitle(" ");
        request.setDescription("desc");
        request.setShopImageUrls(List.of("img.jpg"));

        // When
        final Set<ConstraintViolation<ShopImageRequest>> violations = validator.validate(request);

        // Then
        assertThat(violations).anyMatch(v -> v.getPropertyPath().toString().equals("title"));
    }

    @Test
    void whenDescriptionIsBlank_thenValidationFails() {
        // Given
        final ShopImageRequest request = new ShopImageRequest();
        request.setTitle("Title");
        request.setDescription(" ");
        request.setShopImageUrls(List.of("img.jpg"));

        // When
        final Set<ConstraintViolation<ShopImageRequest>> violations = validator.validate(request);

        // Then
        assertThat(violations).anyMatch(v -> v.getPropertyPath().toString().equals("description"));
    }

    @Test
    void whenImageUrlsIsEmpty_thenValidationFails() {
        // Given
        final ShopImageRequest request = new ShopImageRequest();
        request.setTitle("Title");
        request.setDescription("Desc");
        request.setShopImageUrls(List.of());

        // When
        final Set<ConstraintViolation<ShopImageRequest>> violations = validator.validate(request);

        // Then
        assertThat(violations).anyMatch(v -> v.getPropertyPath().toString().equals("shopImageUrls"));
    }

    @Test
    void whenImageUrlsContainsBlank_thenValidationFails() {
        // Given
        final ShopImageRequest request = new ShopImageRequest();
        request.setTitle("Title");
        request.setDescription("Desc");
        request.setShopImageUrls(List.of(" "));

        // When
        final Set<ConstraintViolation<ShopImageRequest>> violations = validator.validate(request);

        // Then
        assertThat(violations).anyMatch(v -> v.getPropertyPath().toString().contains("shopImageUrls"));
    }

    @Test
    void whenYouTubeLinkIsInvalid_thenValidationFails() {
        // Given
        final ShopImageRequest request = new ShopImageRequest();
        request.setTitle("Title");
        request.setDescription("Desc");
        request.setShopImageUrls(List.of("img.jpg"));
        request.setYouTubeLink("not-a-url");

        // When
        final Set<ConstraintViolation<ShopImageRequest>> violations = validator.validate(request);

        // Then
        assertThat(violations).anyMatch(v -> v.getPropertyPath().toString().equals("youTubeLink"));
    }
}
