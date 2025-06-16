package com.art.backend.model.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PortfolioImageResponse {

    private Long id;
    private String title;
    private String year;
    private List<String> tags;
    private List<String> imageUrls;
}
