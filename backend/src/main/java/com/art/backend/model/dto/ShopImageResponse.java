package com.art.backend.model.dto;

import java.util.List;

import com.art.backend.model.ShopImage;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ShopImageResponse {

    private Long id;
    private String title;
    private String description;
    private String price;
    private String size;
    private String technique;
    private String year;
    private String youTubeLink;
    private boolean sold;
    private List<String> shopImageUrls;

    public ShopImageResponse() {

    }

    private ShopImageResponse(final Long id, final String title, final String description, final String price,
            final String size, final String technique, final String year, final String youTubeLink, final boolean sold,
            final List<String> shopImageUrls) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.size = size;
        this.technique = technique;
        this.year = year;
        this.youTubeLink = youTubeLink;
        this.sold = sold;
        this.shopImageUrls = shopImageUrls;
    }

    public static ShopImageResponse fromEntity(final ShopImage shopImage) {
        return new ShopImageResponse(
                shopImage.getId(),
                shopImage.getTitle(),
                shopImage.getDescription(),
                shopImage.getPrice(),
                shopImage.getSize(),
                shopImage.getTechnique(),
                shopImage.getYear(),
                shopImage.getYouTubeLink(),
                shopImage.isSold(),
                shopImage.getShopImageUrls()
        );
    }
}
