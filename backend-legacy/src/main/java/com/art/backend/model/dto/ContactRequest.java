package com.art.backend.model.dto;

import java.time.Instant;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ContactRequest {

    private String name;
    private String email;
    private String subject;
    private String message;
    private String honeypot;
    private Instant formDisplayedAt;
}
