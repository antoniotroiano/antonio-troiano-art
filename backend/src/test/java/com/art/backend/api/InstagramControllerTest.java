package com.art.backend.api;

import java.util.List;
import java.util.Map;

import com.art.backend.service.instagram.InstagramService;
import com.art.backend.service.instagram.InstagramTokenService;

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

@WebMvcTest(controllers = InstagramController.class,
        excludeAutoConfiguration = {SecurityAutoConfiguration.class})
class InstagramControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private InstagramTokenService tokenService;

    @MockitoBean
    private InstagramService instagramService;

    @Test
    void getInstagramPosts_shouldReturnFeed_whenSuccess() throws Exception {
        final String fakeToken = "fake-token";
        final Map<String, Object> fakeFeed = Map.of("posts", List.of("post1", "post2"));

        when(tokenService.getAccessToken()).thenReturn(fakeToken);
        when(instagramService.fetchInstagramFeed(fakeToken)).thenReturn(fakeFeed);

        mockMvc.perform(get("/api/instagram"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.posts").isArray())
                .andExpect(jsonPath("$.posts[0]").value("post1"));
    }

    @Test
    void getInstagramPosts_shouldReturn500_whenExceptionThrown() throws Exception {
        when(tokenService.getAccessToken()).thenThrow(new RuntimeException("Token service error"));

        mockMvc.perform(get("/api/instagram"))
                .andExpect(status().isInternalServerError())
                .andExpect(jsonPath("$.error").value("Instagram API failed"))
                .andExpect(jsonPath("$.details").value("Token service error"));
    }
}
