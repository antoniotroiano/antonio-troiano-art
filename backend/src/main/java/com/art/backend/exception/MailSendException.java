package com.art.backend.exception;

import java.io.Serial;

public class MailSendException extends RuntimeException {

    @Serial
    private static final long serialVersionUID = -962111790427028414L;

    public MailSendException(final String message, final Throwable cause) {
        super(message, cause);
    }

    MailSendException(final String message) {
        super(message);
    }
}
