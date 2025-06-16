package com.art.backend.exception;

import java.io.Serial;

import org.springframework.http.HttpStatus;

public class ApiException extends RuntimeException {

    @Serial
    private static final long serialVersionUID = -6237626224691496690L;
    private final HttpStatus status;

    public ApiException(final String message, final HttpStatus status) {
        super(message);
        this.status = status;
    }

    public HttpStatus getStatus() {
        return status;
    }
}
