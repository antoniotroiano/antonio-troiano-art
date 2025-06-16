package com.art.backend.exception;

import java.io.Serial;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class CommentNotFoundException extends RuntimeException {

    @Serial
    private static final long serialVersionUID = -2965175175470003133L;

    public CommentNotFoundException(final Long id) {
        super("Comment with id " + id + " not found");
    }
}
