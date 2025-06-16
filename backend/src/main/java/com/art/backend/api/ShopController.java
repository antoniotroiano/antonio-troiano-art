package com.art.backend.api;

import com.art.backend.model.dto.ShopImageResponse;
import com.art.backend.service.ShopService;

import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/shop")
public class ShopController {

    private final ShopService shopService;

    @Autowired
    public ShopController(final ShopService shopService) {
        this.shopService = shopService;
    }

    @GetMapping
    public ResponseEntity<List<ShopImageResponse>> getAllImages() {
        log.debug("Get all shop images");
        return ResponseEntity.ok(shopService.getAllImages());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ShopImageResponse> getImageById(@PathVariable final Long id) {
        log.debug("Get shop image by id: {}", id);
        return ResponseEntity.ok(ShopImageResponse.fromEntity(shopService.getImageById(id)));
    }
}
