package com.art.backend.integration.service;

import java.util.List;
import java.util.Optional;

import com.art.backend.integration.AbstractPostgresTest;
import com.art.backend.integration.TestConfig;
import com.art.backend.model.ShopImage;
import com.art.backend.model.dto.ShopImageRequest;
import com.art.backend.model.dto.ShopImageResponse;
import com.art.backend.repository.ShopRepository;
import com.art.backend.service.ShopService;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestInstance.Lifecycle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
@Transactional
@TestInstance(Lifecycle.PER_CLASS)
@ActiveProfiles("test-postgres")
@Import(TestConfig.class)
class ShopServiceIntegrationTest extends AbstractPostgresTest {

    @Autowired
    private ShopService shopService;

    @Autowired
    private ShopRepository shopRepository;

    private ShopImage savedShopImage;

    @BeforeAll
    void setup() {
        final ShopImage shopImage = new ShopImage();
        shopImage.setTitle("Testbild");
        shopImage.setDescription("Beschreibung");
        shopImage.setPrice("100€");
        shopImage.setSize("50x50");
        shopImage.setTechnique("Öl");
        shopImage.setYear("2024");
        shopImage.setYouTubeLink("https://youtube.com/test");
        shopImage.setSold(false);
        savedShopImage = shopRepository.save(shopImage);
    }

    @Test
    @DisplayName("Given valid Image, when create, then image is saved")
    void testCreateImage() {
        final ShopImageRequest newImage = new ShopImageRequest();
        newImage.setTitle("Neues Bild");
        newImage.setDescription("Neue Beschreibung");
        newImage.setPrice("200€");
        newImage.setSize("100x100");
        newImage.setTechnique("Aquarell");
        newImage.setYear("2025");
        newImage.setYouTubeLink(null);
        newImage.setSold(false);

        final ShopImageResponse created = shopService.createImage(newImage);

        assertNotNull(created.getId());
        assertEquals("Neues Bild", created.getTitle());
    }

    @Test
    @DisplayName("Given existing Image ID, when findById, then image is returned")
    void testFindById() {
        final ShopImage found = shopService.getImageById(savedShopImage.getId());
        assertEquals(savedShopImage.getTitle(), found.getTitle());
    }

    @Test
    @DisplayName("When findAll, then list of images is returned")
    void testFindAll() {
        final List<ShopImageResponse> images = shopService.getAllImages();
        assertFalse(images.isEmpty());
        assertTrue(images.stream().anyMatch(response -> response.getId().equals(savedShopImage.getId())));
    }

    @Test
    @DisplayName("Given existing Image, when update, then image is updated")
    void testUpdateImage() {
        final ShopImageRequest updateData = new ShopImageRequest();
        updateData.setTitle("Aktualisiertes Bild");
        updateData.setDescription("Neue Beschreibung");
        updateData.setPrice("150€");
        updateData.setSize("80x80");
        updateData.setTechnique("Tempera");
        updateData.setYear("2023");
        updateData.setYouTubeLink(null);
        updateData.setSold(true);

        final ShopImageResponse updated = shopService.updateImage(savedShopImage.getId(), updateData);

        assertEquals("Aktualisiertes Bild", updated.getTitle());
        assertEquals("Tempera", updated.getTechnique());
        assertTrue(updated.isSold());
    }

    @Test
    @DisplayName("Given existing Image, when delete, then image is removed")
    void testDeleteImage() {
        shopService.deleteImageById(savedShopImage.getId());
        final Optional<ShopImage> deleted = shopRepository.findById(savedShopImage.getId());
        assertTrue(deleted.isEmpty());
    }
}
