package com.art.backend.service;

import com.art.backend.exception.ImageNotFoundException;
import com.art.backend.model.ShopImage;
import com.art.backend.model.dto.ShopImageRequest;
import com.art.backend.model.dto.ShopImageResponse;
import com.art.backend.repository.ShopRepository;

import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class ShopServiceTest {

    private final ShopRepository shopRepository = mock(ShopRepository.class);
    private final ShopService subjectUnderTest = new ShopService(shopRepository);

    @Test
    void getAllImagesTest() {
        // Given
        final ShopImage shopImage = createImage();
        when(shopRepository.findAll()).thenReturn(List.of(shopImage));

        // When
        final List<ShopImageResponse> allImages = subjectUnderTest.getAllImages();

        // Then
        assertNotNull(allImages);
        assertTrue(!allImages.isEmpty());
        assertThat(shopImage)
                .usingRecursiveComparison()
                .comparingOnlyFields("title", "size", "description", "technique", "price", "sold", "youTubeLink")
                .isEqualTo(allImages.get(0));
    }

    @Test
    void getImageByIdTest() {
        // Given
        final ShopImage shopImage = createImage();
        when(shopRepository.findById(any())).thenReturn(Optional.of(shopImage));

        // When
        final ShopImage shopImageById = subjectUnderTest.getImageById(shopImage.getId());

        // Then
        assertNotNull(shopImageById);
        assertEquals(shopImage, shopImageById);
    }

    @Test
    void getImageByIdThrowRuntimeExceptionTest() {
        // Given / When / Then
        assertThrows(RuntimeException.class, () -> subjectUnderTest.getImageById(1L));
    }

    @Test
    void createImageTest() {
        // Given
        final ShopImage shopImage = createImage();
        final ShopImageRequest shopImageRequest = createImageRequest();
        when(shopRepository.save(any())).thenReturn(shopImage);

        // When
        final ShopImageResponse createdImage = subjectUnderTest.createImage(shopImageRequest);

        // Then
        assertNotNull(createdImage);
        assertThat(shopImage)
                .usingRecursiveComparison()
                .comparingOnlyFields("title", "size", "description", "technique", "price", "sold", "youTubeLink")
                .isEqualTo(createdImage);
    }

    @Test
    void updateImageTest() {
        // Given
        final ShopImage shopImage = createImage();
        when(shopRepository.findById(any())).thenReturn(Optional.of(shopImage));
        shopImage.setYear("2024");
        when(shopRepository.save(any())).thenReturn(shopImage);
        final ShopImageRequest shopImageRequest = createImageRequest();

        // When
        final ShopImageResponse updatedImage = subjectUnderTest.updateImage(1L, shopImageRequest);

        // Then
        assertNotNull(updatedImage);
        assertEquals("2024", updatedImage.getYear());
        assertThat(shopImage)
                .usingRecursiveComparison()
                .comparingOnlyFields("title", "size", "description", "technique", "price", "sold", "youTubeLink")
                .isEqualTo(updatedImage);
    }

    @Test
    void updateImageThrowRuntimeExceptionTest() {
        // Given / When / Then
        assertThrows(RuntimeException.class, () -> subjectUnderTest.updateImage(1L, createImageRequest()));
    }

    @Test
    void deleteImageTest() {
        // Given
        final Long imageId = 1L;
        when(shopRepository.existsById(any())).thenReturn(true);

        // When
        subjectUnderTest.deleteImageById(imageId);

        // Then
        verify(shopRepository, times(1)).deleteById(imageId);
    }

    @Test
    void deleteImageNotFoundExceptionTest() {
        // Given / When / Then
        assertThrows(ImageNotFoundException.class, () -> subjectUnderTest.deleteImageById(1L));
    }

    private static ShopImage createImage() {
        final ShopImage shopImage = new ShopImage();
        shopImage.setYear("2025");
        shopImage.setSize("size");
        shopImage.setTitle("title");
        shopImage.setDescription("description");
        shopImage.setTechnique("technique");
        shopImage.setId(1L);
        shopImage.setPrice("price");
        shopImage.setSold(true);
        shopImage.setYouTubeLink("youTubeLink");
        shopImage.setShopImageUrls(List.of("url"));
        return shopImage;
    }

    private static ShopImageRequest createImageRequest() {
        final ShopImageRequest image = new ShopImageRequest();
        image.setYear("2024");
        image.setSize("size");
        image.setTitle("title");
        image.setDescription("description");
        image.setTechnique("technique");
        image.setPrice("price");
        image.setSold(true);
        image.setYouTubeLink("youTubeLink");
        image.setShopImageUrls(List.of("url"));
        return image;
    }
}