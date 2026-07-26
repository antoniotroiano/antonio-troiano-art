package com.art.backend.exception;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import com.art.backend.model.dto.ApiErrorResponse;
import com.art.backend.model.dto.ContactResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.async.AsyncRequestNotUsableException;
import org.springframework.web.servlet.NoHandlerFoundException;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MailSendException.class)
    public ResponseEntity<ContactResponse> handleMailSendException(final MailSendException ex) {
        log.error("MailSendException caught: {}", ex.getMessage(), ex);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ContactResponse(false, "There was an error sending the message. Please try again later."));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(final MethodArgumentNotValidException ex) {
        final Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors()
                .forEach(error -> errors.put(error.getField(), error.getDefaultMessage()));
        return ResponseEntity.badRequest().body(errors);
    }

    @ExceptionHandler(ApiException.class)
    public ResponseEntity<ApiErrorResponse> handleApiException(final ApiException ex) {
        return ResponseEntity.status(ex.getStatus())
                .body(new ApiErrorResponse(ex.getMessage(), ex.getStatus().value()));
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, String>> handleIllegalArgument(final IllegalArgumentException ex) {
        log.warn("Invalid argument: {}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", ex.getMessage()));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiErrorResponse> handleGeneric(final Exception ex) {
        log.error("Unhandled exception caught: ", ex);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ApiErrorResponse("Unexpected error occurred", 500));
    }

    @ExceptionHandler(NoHandlerFoundException.class)
    public ResponseEntity<Map<String, String>> handleNoHandlerFound(final NoHandlerFoundException ex) {
        final String path = ex.getRequestURL();
        final String method = ex.getHttpMethod();

        if (shouldSuppressLog(path)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Not found"));
        }

        log.warn("No handler found for {} {}", method, path);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Resource not found"));
    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<Map<String, String>> handleMethodNotSupported(
            final HttpRequestMethodNotSupportedException ex) {
        log.warn("Request method '{}' not supported for {}", ex.getMethod(), ex.getSupportedHttpMethods());
        return ResponseEntity.status(HttpStatus.METHOD_NOT_ALLOWED).body(Map.of("error", "Method not allowed"));
    }

    @ExceptionHandler(NoResourceFoundException.class)
    public ResponseEntity<Void> handleNoResourceFound(final NoResourceFoundException ex) {
        final String msg = ex.getMessage();

        if (shouldSuppressResourceLogs(msg)) {
            log.debug("Ignored missing static resource request: {}", msg);
            return ResponseEntity.notFound().build();
        }

        log.warn("No resource found exception: {}", msg);
        return ResponseEntity.notFound().build();
    }

    @ExceptionHandler(AsyncRequestNotUsableException.class)
    public ResponseEntity<Void> handleAsyncRequestNotUsable(final AsyncRequestNotUsableException ex) {
        log.debug("Client aborted the request prematurely: {}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }

    private static boolean shouldSuppressResourceLogs(final String msg) {
        return msg != null && (
                msg.contains("favicon.ico") ||
                        msg.contains("robots.txt") ||
                        msg.contains("hudson") ||
                        msg.contains("get.php") ||
                        msg.contains("login.html") ||
                        msg.contains(".git") ||
                        msg.contains("cgi-bin") ||
                        msg.contains(".env.old.") ||
                        msg.contains(".env.example.") ||
                        msg.contains("api/customers") ||
                        msg.contains("api/profiles")
        );
    }

    private static boolean shouldSuppressLog(final String path) {
        if (path == null || path.isBlank() || path.equals("/")) {
            return true;
        }

        final Set<String> ignoredPaths = Set.of(
                "/favicon.ico",
                "/js/lkk_ch.js",
                "/js/twint_ch.js",
                "/wordpress",
                "/boaform/admin/formLogin",
                "/squid-internal-mgr/cachemgr.cgi",
                "/get.php",
                "/api/session/properties"
        );
        return ignoredPaths.contains(path) || path.endsWith(".php") || path.endsWith(".cgi") || path.endsWith(".asp");
    }
}
