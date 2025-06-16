package com.art.backend.exception;

import java.io.Serial;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class PortfolioImagesNotFoundException extends RuntimeException {

    @Serial
    private static final long serialVersionUID = -973239716687633815L;

    public PortfolioImagesNotFoundException(final Long id) {
        super("Portfolio image not found with id: " + id);
    }
}
