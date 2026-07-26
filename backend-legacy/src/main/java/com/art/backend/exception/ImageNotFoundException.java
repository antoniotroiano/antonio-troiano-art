package com.art.backend.exception;

import java.io.Serial;

public class ImageNotFoundException extends RuntimeException {

    @Serial
    private static final long serialVersionUID = 8648675659874458080L;

    public ImageNotFoundException(final Long id) {
        super("Image with id " + id + " not found.");
    }
}
