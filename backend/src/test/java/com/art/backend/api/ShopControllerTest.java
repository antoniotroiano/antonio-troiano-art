package com.art.backend.api;

import java.util.List;

import com.art.backend.exception.ImageNotFoundException;
import com.art.backend.model.ShopImage;
import com.art.backend.model.dto.ShopImageRequest;
import com.art.backend.model.dto.ShopImageResponse;
import com.art.backend.service.ShopService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = ShopController.class,
        excludeAutoConfiguration = SecurityAutoConfiguration.class)
class ShopControllerTest {

    private static final long VALUE = 999L;

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private ShopService shopService;

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
    void getAllImages_shouldReturnList() throws Exception {
        when(shopService.getAllImages()).thenReturn(List.of(shopImageResponse));

        mockMvc.perform(get("/api/shop"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1))
                .andExpect(jsonPath("$[0].title").value("Test Image"));
    }

    @Test
    void getImageById_shouldReturnImage() throws Exception {
        final ShopImage shopImage = new ShopImage();
        shopImage.setId(1L);
        shopImage.setTitle("Test Image");
        shopImage.setDescription("description");
        shopImage.setShopImageUrls(List.of("url.jpg"));

        when(shopService.getImageById(1L)).thenReturn(shopImage);

        mockMvc.perform(get("/api/shop/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Test Image"));
    }

    @Test
    void getImageById_shouldReturn404_whenNotFound() throws Exception {
        when(shopService.getImageById(VALUE)).thenThrow(new ImageNotFoundException(VALUE));

        mockMvc.perform(get("/api/shop/999"))
                .andExpect(status().isNotFound());
    }
}
