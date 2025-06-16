package com.art.backend.integration.controller;

import java.util.List;

import com.art.backend.integration.AbstractPostgresTest;
import com.art.backend.integration.TestConfig;
import com.art.backend.model.ShopImage;
import com.art.backend.model.dto.ShopImageRequest;
import com.art.backend.model.dto.ShopImageResponse;
import com.art.backend.repository.ShopRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestInstance.Lifecycle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.context.annotation.Import;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

@Disabled
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@TestInstance(Lifecycle.PER_CLASS)
@ActiveProfiles("test-postgres")
@Import(TestConfig.class)
class ShopAdminControllerE2ETest extends AbstractPostgresTest {

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
    void givenValidImageRequest_whenCreateImage_thenCreated() {
        final ShopImageRequest request = new ShopImageRequest();
        request.setTitle("Neues Bild");
        request.setDescription("Beschreibung");
        request.setPrice("200.0");
        request.setSize("60x80");
        request.setTechnique("Acryl");
        request.setYear("2021");
        request.setYouTubeLink("https://youtube.com/somevideo");
        request.setSold(false);
        request.setShopImageUrls(List.of("urlA", "urlB"));

        final ResponseEntity<ShopImageResponse> response =
                restTemplate.postForEntity("/api/admin/shop", request, ShopImageResponse.class);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertNotNull(response.getBody().getId());
        assertEquals("Neues Bild", response.getBody().getTitle());
    }

    @Test
    void givenValidUpdateRequest_whenUpdateImage_thenOk() {
        final ShopImageRequest updateRequest = new ShopImageRequest();
        updateRequest.setTitle("Geändertes Bild");
        updateRequest.setDescription("Neue Beschreibung");
        updateRequest.setPrice("300.0");
        updateRequest.setSize("70x90");
        updateRequest.setTechnique("Aquarell");
        updateRequest.setYear("2022");
        updateRequest.setYouTubeLink(null);
        updateRequest.setSold(true);
        updateRequest.setShopImageUrls(List.of("urlX"));

        final HttpEntity<ShopImageRequest> requestEntity = new HttpEntity<>(updateRequest);
        final ResponseEntity<ShopImageResponse> response =
                restTemplate.exchange("/api/admin/shop/" + existingShopImage.getId(),
                        HttpMethod.PUT, requestEntity, ShopImageResponse.class);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Geändertes Bild", response.getBody().getTitle());
        assertTrue(response.getBody().isSold());
    }

    @Test
    void givenExistingImageId_whenDeleteImage_thenNoContent() {
        final ResponseEntity<Void> response = restTemplate.exchange("/api/admin/shop/" + existingShopImage.getId(),
                HttpMethod.DELETE, null, Void.class);
        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());

        assertFalse(shopRepository.existsById(existingShopImage.getId()));
    }
}
