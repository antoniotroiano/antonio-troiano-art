package com.art.backend.model.dto;

import lombok.Getter;

@Getter
public class AuthRequest {

    private String username;
    private String password;

    public AuthRequest() {
    }

    public AuthRequest(final String username, final String password) {
        this.username = username;
        this.password = password;
    }
}
