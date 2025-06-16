package com.art.backend.internal;

import java.time.LocalDate;

import com.art.backend.exception.BlogPostNotFoundException;
import com.art.backend.model.dto.BlogPostRequest;
import com.art.backend.model.dto.BlogPostResponse;
import com.art.backend.service.BlogPostService;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = BlogAdminController.class,
        excludeAutoConfiguration = SecurityAutoConfiguration.class)
class BlogAdminControllerTest {

    private static final long VALUE = 999L;

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private BlogPostService blogPostService;

    @Autowired
    private ObjectMapper objectMapper;

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
    void createPost_shouldReturnCreatedPost() throws Exception {
        when(blogPostService.createPost(any(BlogPostRequest.class))).thenReturn(blogPostResponse);

        mockMvc.perform(post("/api/admin/posts")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(blogPostRequest)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.title").value("Test Title"));
    }

    @Test
    void updatePost_shouldReturnUpdatedPost() throws Exception {
        when(blogPostService.updatePost(eq(1L), any(BlogPostResponse.class))).thenReturn(blogPostResponse);

        mockMvc.perform(put("/api/admin/posts/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(blogPostResponse)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Test Title"));
    }

    @Test
    void deletePost_shouldReturnNoContent() throws Exception {
        doNothing().when(blogPostService).deletePost(1L);

        mockMvc.perform(delete("/api/admin/posts/1"))
                .andExpect(status().isNoContent());
    }

    @Test
    void createPost_shouldReturn400_whenInvalidInput() throws Exception {
        final BlogPostRequest invalidRequest = new BlogPostRequest();
        invalidRequest.setTitle("");
        invalidRequest.setContent("Some content");
        invalidRequest.setAuthor("author");
        invalidRequest.setCategory("");

        mockMvc.perform(post("/api/admin/posts")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalidRequest)))
                .andExpect(status().isBadRequest());
    }

    @Test
    void updatePost_shouldReturn404_whenNotFound() throws Exception {
        when(blogPostService.updatePost(eq(VALUE), any(BlogPostResponse.class)))
                .thenThrow(new BlogPostNotFoundException(VALUE));

        mockMvc.perform(put("/api/admin/posts/999")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(blogPostResponse)))
                .andExpect(status().isNotFound());
    }

    @Test
    void updatePost_shouldReturn400_whenInvalidInput() throws Exception {
        final BlogPostResponse invalidResponse = new BlogPostResponse();
        invalidResponse.setId(1L);
        invalidResponse.setTitle("");
        invalidResponse.setContent("content");
        invalidResponse.setAuthor("author");
        invalidResponse.setCategory("");
        invalidResponse.setDate(LocalDate.now());

        mockMvc.perform(put("/api/admin/posts/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalidResponse)))
                .andExpect(status().isBadRequest());
    }

    @Test
    void deletePost_shouldReturn500_whenServiceThrows() throws Exception {
        doThrow(new RuntimeException("DB error")).when(blogPostService).deletePost(1L);

        mockMvc.perform(delete("/api/admin/posts/1"))
                .andExpect(status().isInternalServerError());
    }
}
