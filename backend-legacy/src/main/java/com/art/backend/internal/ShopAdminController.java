package com.art.backend.internal;

import java.util.List;

import com.art.backend.model.dto.ShopImageRequest;
import com.art.backend.model.dto.ShopImageResponse;
import com.art.backend.service.ShopService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestOperations;
import org.springframework.web.client.RestTemplate;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/admin/shop")
public class ShopAdminController {

    private final ShopService shopService;

    @Value("${revalidate.url.shop}")
    private String galleryRevalidateUrl;

    @Autowired
    public ShopAdminController(final ShopService shopService) {
        this.shopService = shopService;
    }

    @PostMapping
    public ResponseEntity<ShopImageResponse> createImage(@Valid @RequestBody final ShopImageRequest request) {
        log.info("Create shop image: {}", request.getTitle());
        final ShopImageResponse createdImage = shopService.createImage(request);
        final RestOperations restTemplate = new RestTemplate();

        revalidatePaths(galleryRevalidateUrl, restTemplate, "Create");
        return ResponseEntity.status(HttpStatus.CREATED).body(createdImage);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ShopImageResponse> updateImage(@PathVariable final Long id,
            @Valid @RequestBody final ShopImageRequest request) {
        log.info("Update shop image with id {}: {}", id, request.getTitle());
        final ShopImageResponse updatedImage = shopService.updateImage(id, request);

        final RestOperations restTemplate = new RestTemplate();
        final String detailRevalidateUrl = galleryRevalidateUrl + id;

        for (final String url : List.of(galleryRevalidateUrl, detailRevalidateUrl)) {
            revalidatePaths(url, restTemplate, "Update");
        }
        return ResponseEntity.ok(updatedImage);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteImage(@PathVariable final Long id) {
        log.info("Delete shop image with id: {}", id);
        shopService.deleteImageById(id);
        final RestOperations restTemplate = new RestTemplate();

        revalidatePaths(galleryRevalidateUrl, restTemplate, "Delete");
        return ResponseEntity.noContent().build();
    }

    private static void revalidatePaths(final String url, final RestOperations restTemplate, final String operation) {
        try {
            final ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
            if (!response.getStatusCode().is2xxSuccessful()) {
                log.warn("[Image {}] Revalidate failed for {} with status: {}", operation, url,
                        response.getStatusCode());
            } else {
                log.info("[Image {}] Revalidate success: {}", operation, url);
            }
        } catch (final Exception e) {
            log.warn("[Image {}] Revalidate error for {}: {}", operation, url, e.getMessage());
        }
    }
}
