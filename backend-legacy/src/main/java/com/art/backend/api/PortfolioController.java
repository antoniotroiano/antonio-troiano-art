package com.art.backend.api;

import java.util.List;

import com.art.backend.model.dto.PortfolioImageResponse;
import com.art.backend.service.PortfolioImageService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/portfolio")
public class PortfolioController {

    private final PortfolioImageService portfolioImageService;

    @Autowired
    public PortfolioController(final PortfolioImageService portfolioImageService) {
        this.portfolioImageService = portfolioImageService;
    }

    @GetMapping
    public ResponseEntity<List<PortfolioImageResponse>> getAllPortfolioImages() {
        log.debug("Get all portfolio images");
        return ResponseEntity.ok(portfolioImageService.getAllPortfolioImages());
    }
}
