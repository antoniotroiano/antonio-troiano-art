package com.art.backend.exception;

import java.util.List;
import java.util.Map;

import com.art.backend.model.dto.ApiErrorResponse;
import com.art.backend.model.dto.ContactResponse;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;

import static org.junit.jupiter.api.Assertions.*;

class GlobalExceptionHandlerTest {

    private GlobalExceptionHandler handler;

    @BeforeEach
    void setUp() {
        handler = new GlobalExceptionHandler();
    }

    @Test
    void givenBlogPostNotFoundException_whenHandled_thenReturnsNotFound() {
        // Given
        final var ex = new BlogPostNotFoundException(1L);

        // When
        final ResponseEntity<Map<String, String>> response = handler.handleNotFound(ex);

        // Then
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals(Map.of("error", "Blog post not found with id: 1"), response.getBody());
    }

    @Test
    void givenCommentNotFoundException_whenHandled_thenReturnsNotFoundWithMap() {
        // Given
        final var ex = new CommentNotFoundException(1L);

        // When
        final ResponseEntity<Map<String, String>> response = handler.handleCommentNotFound(ex);

        // Then
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals(Map.of("error", "Comment with id 1 not found"), response.getBody());
    }

    @Test
    void givenMailSendException_whenHandled_thenReturnsInternalServerError() {
        // Given
        final var ex = new MailSendException("Failed to send mail");

        // When
        final ResponseEntity<ContactResponse> response = handler.handleMailSendException(ex);

        // Then
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertFalse(response.getBody().isSuccess());
        assertEquals("There was an error sending the message. Please try again later.",
                response.getBody().getMessage());
    }

    @Test
    void givenImageNotFoundException_whenHandled_thenReturnsNotFound() {
        // Given
        final var ex = new ImageNotFoundException(1L);

        // When
        final ResponseEntity<Map<String, String>> response = handler.handleImageNotFoundException(ex);

        // Then
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals(Map.of("error", "Image with id 1 not found."), response.getBody());
    }

    @Test
    void givenMethodArgumentNotValidException_whenHandled_thenReturnsBadRequestWithErrors() {
        // Given
        final BindingResult bindingResult = Mockito.mock(BindingResult.class);
        final var fieldError1 = new FieldError("object", "field1", "must not be blank");
        final var fieldError2 = new FieldError("object", "field2", "must be valid");

        Mockito.when(bindingResult.getFieldErrors()).thenReturn(List.of(fieldError1, fieldError2));
        final var ex = new MethodArgumentNotValidException(null, bindingResult);

        // When
        final ResponseEntity<Map<String, String>> response = handler.handleValidationExceptions(ex);

        // Then
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        final Map<String, String> errors = response.getBody();
        assertEquals(2, errors.size());
        assertEquals("must not be blank", errors.get("field1"));
        assertEquals("must be valid", errors.get("field2"));
    }

    @Test
    void givenApiException_whenHandled_thenReturnsCorrectStatusAndBody() {
        // Given
        final var ex = new ApiException("API error occurred", HttpStatus.CONFLICT);

        // When
        final ResponseEntity<ApiErrorResponse> response = handler.handleApiException(ex);

        // Then
        assertEquals(HttpStatus.CONFLICT, response.getStatusCode());
        assertEquals("API error occurred", response.getBody().message());
        assertEquals(HttpStatus.CONFLICT.value(), response.getBody().status());
    }

    @Test
    void givenIllegalArgumentException_whenHandled_thenReturnsBadRequest() {
        // Given
        final var ex = new IllegalArgumentException("Invalid argument");

        // When
        final ResponseEntity<Map<String, String>> response = handler.handleIllegalArgument(ex);

        // Then
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals(Map.of("error", "Invalid argument"), response.getBody());
    }

    @Test
    void givenAccessDeniedException_whenHandled_thenReturnsForbidden() {
        // Given
        final var ex = new AccessDeniedException("Access denied message");

        // When
        final ResponseEntity<Map<String, String>> response = handler.handleAccessDenied(ex);

        // Then
        assertEquals(HttpStatus.FORBIDDEN, response.getStatusCode());
        assertEquals(Map.of("error", "Access denied"), response.getBody());
    }

    @Test
    void givenAuthenticationException_whenHandled_thenReturnsUnauthorized() {
        // Given
        final var ex = new AuthenticationException("Authentication failed") {

        };

        // When
        final ResponseEntity<Map<String, String>> response = handler.handleAuthenticationException(ex);

        // Then
        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
        assertEquals(Map.of("error", "Authentication failed"), response.getBody());
    }

    @Test
    void givenGenericException_whenHandled_thenReturnsInternalServerError() {
        // Given
        final var ex = new RuntimeException("Some error");

        // When
        final ResponseEntity<ApiErrorResponse> response = handler.handleGeneric(ex);

        // Then
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertEquals("Unexpected error occurred", response.getBody().message());
        assertEquals(500, response.getBody().status());
    }
}
