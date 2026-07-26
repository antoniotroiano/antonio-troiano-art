package com.art.backend.api;

import java.time.LocalDate;
import java.util.List;

import com.art.backend.exception.BlogPostNotFoundException;
import com.art.backend.model.dto.BlogPostRequest;
import com.art.backend.model.dto.BlogPostResponse;
import com.art.backend.service.BlogPostService;

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

@WebMvcTest(controllers = BlogController.class,
        excludeAutoConfiguration = SecurityAutoConfiguration.class)
class BlogControllerTest {

    private static final long VALUE = 999L;

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private BlogPostService blogPostService;

    private BlogPostRequest blogPostRequest;
    private BlogPostResponse blogPostResponse;

    @BeforeEach
    void setup() {
        blogPostRequest = new BlogPostRequest();
        blogPostRequest.setTitle("Test Title");
        blogPostRequest.setContent("Test Content");
        blogPostRequest.setAuthor("author");
        blogPostRequest.setCategory("category");
        blogPostRequest.setDate(LocalDate.now());

        blogPostResponse = new BlogPostResponse();
        blogPostResponse.setId(1L);
        blogPostResponse.setTitle("Test Title");
        blogPostResponse.setContent("Test Content");
        blogPostResponse.setAuthor("author");
        blogPostResponse.setDate(LocalDate.now());
    }

    @Test
    void getAllPosts_shouldReturnList() throws Exception {
        when(blogPostService.getAllPosts()).thenReturn(List.of(blogPostResponse));

        mockMvc.perform(get("/api/posts"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1))
                .andExpect(jsonPath("$[0].title").value("Test Title"));
    }

    @Test
    void getPostById_shouldReturnPost() throws Exception {
        when(blogPostService.getPostById(1L)).thenReturn(blogPostResponse);

        mockMvc.perform(get("/api/posts/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Test Title"));
    }

    @Test
    void getPostById_shouldReturn404_whenNotFound() throws Exception {
        when(blogPostService.getPostById(VALUE)).thenThrow(new BlogPostNotFoundException(VALUE));

        mockMvc.perform(get("/api/posts/999"))
                .andExpect(status().isNotFound());
    }
}
