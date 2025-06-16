package com.art.backend.internal;

import java.util.List;

import com.art.backend.model.dto.PortfolioImageRequest;
import com.art.backend.model.dto.PortfolioImageResponse;
import com.art.backend.service.PortfolioImageService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
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
@RequestMapping("/api/admin/portfolio")
public class PortfolioAdminController {

    private final PortfolioImageService portfolioImageService;

    @Value("${revalidate.url.portfolio}")
    private String portfolioImageRevalidateUrl;

    @Autowired
    public PortfolioAdminController(final PortfolioImageService portfolioImageService) {
        this.portfolioImageService = portfolioImageService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<PortfolioImageResponse> getPortfolioImageById(@PathVariable final Long id) {
        log.debug("Get portfolio image by id= {}", id);
        return ResponseEntity.ok(portfolioImageService.getPortfolioImageById(id));
    }

    @PostMapping
    public ResponseEntity<PortfolioImageResponse> createPortfolioImage(
            @Valid @RequestBody final PortfolioImageRequest request) {
        log.info("Create portfolio image= {}", request.getTitle());
        final PortfolioImageResponse createdPortfolioImage = portfolioImageService.createPortfolioImage(request);
        final RestOperations restTemplate = new RestTemplate();

        revalidatePaths(portfolioImageRevalidateUrl, restTemplate, "Create");
        return ResponseEntity.status(HttpStatus.CREATED).body(createdPortfolioImage);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PortfolioImageResponse> updatePortfolioImage(@PathVariable final Long id,
            @Valid @RequestBody final PortfolioImageRequest request) {
        log.info("Update portfolio image with id= {}, title= {}", id, request.getTitle());
        final PortfolioImageResponse updatedPortfolioImage = portfolioImageService.updatePortfolioImage(id, request);

        final RestOperations restTemplate = new RestTemplate();
        final String detailRevalidateUrl = portfolioImageRevalidateUrl + id;

        for (final String url : List.of(portfolioImageRevalidateUrl, detailRevalidateUrl)) {
            revalidatePaths(url, restTemplate, "Update");
        }
        return ResponseEntity.ok(updatedPortfolioImage);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePortfolioImage(@PathVariable final Long id) {
        log.info("Delete portfolio image with id= {}", id);
        portfolioImageService.deletePortfolioImageById(id);
        final RestOperations restTemplate = new RestTemplate();

        revalidatePaths(portfolioImageRevalidateUrl, restTemplate, "Delete");
        return ResponseEntity.noContent().build();
    }

    private static void revalidatePaths(final String url, final RestOperations restTemplate, final String operation) {
        try {
            final ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
            if (!response.getStatusCode().is2xxSuccessful()) {
                log.warn("[Portfolio Image {}] Revalidate failed for {} with status: {}", operation, url,
                        response.getStatusCode());
            } else {
                log.info("[Portfolio Image {}] Revalidate success: {}", operation, url);
            }
        } catch (final Exception e) {
            log.warn("[Portfolio Image {}] Revalidate error for {}: {}", operation, url, e.getMessage());
        }
    }
}
