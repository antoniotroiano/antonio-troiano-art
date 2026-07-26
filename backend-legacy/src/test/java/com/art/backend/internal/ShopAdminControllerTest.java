package com.art.backend.internal;

import java.util.List;

import com.art.backend.exception.ImageNotFoundException;
import com.art.backend.model.dto.ShopImageRequest;
import com.art.backend.model.dto.ShopImageResponse;
import com.art.backend.service.ShopService;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = ShopAdminController.class,
        excludeAutoConfiguration = SecurityAutoConfiguration.class)
class ShopAdminControllerTest {

    private static final long VALUE = 999L;

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private ShopService shopService;

    @Autowired
    private ObjectMapper objectMapper;

    private ShopImageResponse shopImageResponse;
    private ShopImageRequest shopImageRequest;

    @BeforeEach
    void setup() {
        shopImageResponse = new ShopImageResponse();
        shopImageResponse.setId(1L);
        shopImageResponse.setTitle("Test Image");
        shopImageResponse.setDescription("description");
        shopImageResponse.setShopImageUrls(List.of("url.jpg"));

        shopImageRequest = new ShopImageRequest();
        shopImageRequest.setTitle("Test Image");
        shopImageRequest.setDescription("description");
        shopImageRequest.setShopImageUrls(List.of("url.jpg"));
    }

    @Test
    void createImage_shouldReturnCreated() throws Exception {
        when(shopService.createImage(any(ShopImageRequest.class))).thenReturn(shopImageResponse);

        mockMvc.perform(post("/api/admin/shop")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(shopImageRequest)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.title").value("Test Image"));
    }

    @Test
    void updateImage_shouldReturnUpdatedImage() throws Exception {
        when(shopService.updateImage(eq(1L), any(ShopImageRequest.class))).thenReturn(shopImageResponse);

        mockMvc.perform(put("/api/admin/shop/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(shopImageRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Test Image"));
    }

    @Test
    void deleteImage_shouldReturnNoContent() throws Exception {
        Mockito.doNothing().when(shopService).deleteImageById(1L);

        mockMvc.perform(delete("/api/admin/shop/1"))
                .andExpect(status().isNoContent());
    }

    @Test
    void createImage_shouldReturn400_whenInvalidInput() throws Exception {
        final ShopImageRequest invalidRequest = new ShopImageRequest();
        invalidRequest.setTitle("");
        invalidRequest.setDescription("description");
        invalidRequest.setShopImageUrls(List.of(""));

        mockMvc.perform(post("/api/admin/shop")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalidRequest)))
                .andExpect(status().isBadRequest());
    }

    @Test
    void updateImage_shouldReturn404_whenNotFound() throws Exception {
        when(shopService.updateImage(eq(VALUE), any(ShopImageRequest.class)))
                .thenThrow(new ImageNotFoundException(VALUE));

        mockMvc.perform(put("/api/admin/shop/999")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(shopImageRequest)))
                .andExpect(status().isNotFound());
    }

    @Test
    void updateImage_shouldReturn400_whenInvalidInput() throws Exception {
        final ShopImageRequest invalidRequest = new ShopImageRequest();
        invalidRequest.setTitle("");
        invalidRequest.setDescription("desc");
        invalidRequest.setShopImageUrls(List.of(""));

        mockMvc.perform(put("/api/admin/shop/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalidRequest)))
                .andExpect(status().isBadRequest());
    }

    @Test
    void deleteImage_shouldReturn500_whenServiceThrows() throws Exception {
        doThrow(new RuntimeException("DB error")).when(shopService).deleteImageById(1L);

        mockMvc.perform(delete("/api/admin/shop/1"))
                .andExpect(status().isInternalServerError());
    }
}
