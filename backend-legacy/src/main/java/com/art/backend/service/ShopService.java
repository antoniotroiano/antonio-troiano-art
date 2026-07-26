package com.art.backend.service;

import com.art.backend.exception.ImageNotFoundException;
import com.art.backend.model.ShopImage;
import com.art.backend.model.dto.ShopImageRequest;
import com.art.backend.model.dto.ShopImageResponse;
import com.art.backend.repository.ShopRepository;

import org.springframework.stereotype.Service;

import java.util.List;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class ShopService {

    private final ShopRepository shopRepository;

    public ShopService(final ShopRepository shopRepository) {
        this.shopRepository = shopRepository;
    }

    public List<ShopImageResponse> getAllImages() {
        log.debug("Loading all shop images from repository");
        return shopRepository.findAll().stream()
                .map(ShopImageResponse::fromEntity)
                .toList();
    }

    public ShopImage getImageById(final Long id) {
        log.debug("Get shop image by id: {}", id);
        return shopRepository.findById(id).orElseThrow(() -> new ImageNotFoundException(id));
    }

    public ShopImageResponse createImage(final ShopImageRequest request) {
        log.info("Create shop image: {}", request.getTitle());
        final ShopImage shopImage = new ShopImage();
        updateFields(shopImage, request);
        final ShopImage saved = shopRepository.save(shopImage);
        return ShopImageResponse.fromEntity(saved);
    }

    public ShopImageResponse updateImage(final Long id, final ShopImageRequest request) {
        log.info("Update shop image with id= {}, title= {}", id, request.getTitle());
        final ShopImage existingShopImage = getImageById(id);
        updateFields(existingShopImage, request);
        final ShopImage saved = shopRepository.save(existingShopImage);
        return ShopImageResponse.fromEntity(saved);
    }

    private static void updateFields(final ShopImage shopImage, final ShopImageRequest request) {
        shopImage.setTitle(request.getTitle());
        shopImage.setDescription(request.getDescription());
        shopImage.setPrice(request.getPrice());
        shopImage.setSize(request.getSize());
        shopImage.setTechnique(request.getTechnique());
        shopImage.setYear(request.getYear());
        shopImage.setYouTubeLink(request.getYouTubeLink());
        shopImage.setSold(request.isSold());
        shopImage.setShopImageUrls(request.getShopImageUrls());
    }

    public void deleteImageById(final Long id) {
        if (!shopRepository.existsById(id)) {
            throw new ImageNotFoundException(id);
        }
        log.debug("Delete shop image with id: {}", id);
        shopRepository.deleteById(id);
    }
}
