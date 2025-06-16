package com.art.backend.exception;

import java.io.Serial;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class BlogPostNotFoundException extends RuntimeException {

    @Serial
    private static final long serialVersionUID = 6849080990776886078L;

    public BlogPostNotFoundException(final Long id) {
        super("Blog post not found with id: " + id);
    }
}
