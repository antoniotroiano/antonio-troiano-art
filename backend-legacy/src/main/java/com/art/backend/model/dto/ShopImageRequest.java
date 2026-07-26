package com.art.backend.model.dto;

import java.util.List;

import org.hibernate.validator.constraints.URL;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class ShopImageRequest {

    @NotBlank(message = "Title must not be blank")
    private String title;

    @NotBlank(message = "Description must not be blank")
    private String description;

    private String price;
    private String size;
    private String technique;
    private String year;

    @URL(message = "Invalid YouTube link")
    private String youTubeLink;

    private boolean sold;

    @NotEmpty(message = "At least one image URL is required")
    private List<@NotBlank String> shopImageUrls;
}
