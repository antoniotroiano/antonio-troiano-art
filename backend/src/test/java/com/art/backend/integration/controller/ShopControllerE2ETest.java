package com.art.backend.integration.controller;

import java.util.List;

import com.art.backend.integration.AbstractPostgresTest;
import com.art.backend.integration.TestConfig;
import com.art.backend.model.ShopImage;
import com.art.backend.model.dto.ShopImageResponse;
import com.art.backend.repository.ShopRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestInstance.Lifecycle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.context.annotation.Import;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@TestInstance(Lifecycle.PER_CLASS)
@ActiveProfiles("test-postgres")
@Import(TestConfig.class)
class ShopControllerE2ETest extends AbstractPostgresTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private ShopRepository shopRepository;

    private ShopImage existingShopImage;

    @BeforeEach
    void setup() {
        shopRepository.deleteAll();

        existingShopImage = new ShopImage();
        existingShopImage.setTitle("Testbild");
        existingShopImage.setDescription("Beschreibung Testbild");
        existingShopImage.setPrice("100.");
        existingShopImage.setSize("50x70");
        existingShopImage.setTechnique("Öl auf Leinwand");
        existingShopImage.setYear("2020");
        existingShopImage.setShopImageUrls(List.of("url"));
        existingShopImage.setYouTubeLink("https://www.youtube.com/watch?v=");
        existingShopImage.setSold(false);

        existingShopImage = shopRepository.save(existingShopImage);
    }

    @Test
    void givenImagesInDb_whenGetAllImages_thenReturnList() {
        final ResponseEntity<ShopImageResponse[]> response =
                restTemplate.getForEntity("/api/shop", ShopImageResponse[].class);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue(response.getBody().length >= 1);
    }

    @Test
    void givenExistingImageId_whenGetImageById_thenReturnImage() {
        final ResponseEntity<ShopImageResponse> response =
                restTemplate.getForEntity("/api/shop/" + existingShopImage.getId(), ShopImageResponse.class);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(existingShopImage.getTitle(), response.getBody().getTitle());
    }

    @Test
    void givenNonExistingImageId_whenGetImageById_thenNotFound() {
        final ResponseEntity<String> response = restTemplate.getForEntity("/api/shop/999999", String.class);
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }
}
