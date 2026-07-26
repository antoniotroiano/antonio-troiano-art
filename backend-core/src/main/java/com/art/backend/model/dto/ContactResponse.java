package com.art.backend.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ContactResponse {

    private boolean success;
    private String message;

    public ContactResponse() {
    }

    public ContactResponse(final boolean success, final String message) {
        this.success = success;
        this.message = message;
    }
}
