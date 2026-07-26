package com.art.backend.model.dto;

import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PortfolioImageRequest {

    @NotBlank(message = "Title must not be blank")
    private String title;

    @NotBlank(message = "Year must not be blank")
    private String year;

    @NotEmpty(message = "At least one tag is required")
    private List<String> tags;

    @NotEmpty(message = "At least one image URL is required")
    private List<String> imageUrls;
}
