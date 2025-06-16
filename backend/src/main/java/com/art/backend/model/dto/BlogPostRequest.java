package com.art.backend.model.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BlogPostRequest {

    @NotBlank
    private String title;

    @NotBlank
    private String author;

    @NotNull
    private LocalDate date;

    private String cover;

    private String category;

    private String description;

    @NotBlank
    private String content;
}
