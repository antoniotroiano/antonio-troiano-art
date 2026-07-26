package com.art.backend.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminRegistrationRequest {

    private String username;
    private String password;

    public AdminRegistrationRequest() {
    }
}
