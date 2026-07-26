package com.art.backend.api;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;

import com.art.backend.model.Comment;
import com.art.backend.model.dto.CommentRequest;
import com.art.backend.model.dto.CommentResponse;
import com.art.backend.service.CommentService;
import com.art.backend.service.InMemoryRateLimiter;
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
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = CommentController.class,
        excludeAutoConfiguration = SecurityAutoConfiguration.class)
class CommentControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private CommentService commentService;

    @MockitoBean
    private InMemoryRateLimiter inMemoryRateLimiter;

    @Autowired
    private ObjectMapper objectMapper;

    private CommentRequest validRequest;

    @BeforeEach
    void setup() {
        validRequest = new CommentRequest();
        validRequest.setName("John Doe");
        validRequest.setContent("This is a comment.");
        validRequest.setFormDisplayedAt(Instant.now().toEpochMilli() - 6000);
        validRequest.setHoneypot(null);
    }

    @Test
    void getCommentsForPost_shouldReturnComments() throws Exception {
        final CommentResponse commentResponse = CommentResponse.builder()
                .id(1L)
                .name("John Doe")
                .content("Comment 1")
                .email("john@example.com")
                .createdAt(LocalDateTime.now())
                .postName("My Post")
                .build();

        final CommentResponse commentResponse2 = CommentResponse.builder()
                .id(2L)
                .name("John Doe")
                .content("Comment 2")
                .email("john@example.com")
                .createdAt(LocalDateTime.now())
                .postName("My Post")
                .build();

        final List<CommentResponse> comments = List.of(commentResponse, commentResponse2);
        when(commentService.getCommentsForPost(1L)).thenReturn(comments);

        mockMvc.perform(get("/api/comments/post/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].name").value("John Doe"));
    }

    @Test
    void addCommentToPost_shouldReturnOk_whenValid() throws Exception {
        when(inMemoryRateLimiter.isAllowed(anyString())).thenReturn(true);

        mockMvc.perform(post("/api/comments/post/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(validRequest))
                        .header("X-Forwarded-For", "1.2.3.4"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.message").value("Comment added successfully"));

        verify(commentService).addCommentToPost(eq(1L), any(Comment.class));
    }

    @Test
    void addCommentToPost_shouldReturnBadRequest_whenHoneypotFilled() throws Exception {
        validRequest.setHoneypot("bot");

        when(inMemoryRateLimiter.isAllowed(anyString())).thenReturn(true);

        mockMvc.perform(post("/api/comments/post/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(validRequest)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("Bot detection triggered."));

        verify(commentService, never()).addCommentToPost(anyLong(), any());
    }

    @Test
    void addCommentToPost_shouldReturnBadRequest_whenFormDisplayedAtMissing() throws Exception {
        validRequest.setFormDisplayedAt(null);

        when(inMemoryRateLimiter.isAllowed(anyString())).thenReturn(true);

        mockMvc.perform(post("/api/comments/post/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(validRequest)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error").value("Missing form data"));

        verify(commentService, never()).addCommentToPost(anyLong(), any());
    }

    @Test
    void addCommentToPost_shouldReturnBadRequest_whenSubmittedTooFast() throws Exception {
        validRequest.setFormDisplayedAt(Instant.now().toEpochMilli() - 1000);

        when(inMemoryRateLimiter.isAllowed(anyString())).thenReturn(true);

        mockMvc.perform(post("/api/comments/post/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(validRequest)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error").value("Submitting too fast. Please wait a moment."));

        verify(commentService, never()).addCommentToPost(anyLong(), any());
    }

    @Test
    void addCommentToPost_shouldReturnTooManyRequests_whenRateLimitExceeded() throws Exception {
        when(inMemoryRateLimiter.isAllowed(anyString())).thenReturn(false);

        mockMvc.perform(post("/api/comments/post/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(validRequest))
                        .header("X-Forwarded-For", "1.2.3.4"))
                .andExpect(status().isTooManyRequests())
                .andExpect(jsonPath("$.error").value("Please wait a few seconds before sending again."));

        verify(commentService, never()).addCommentToPost(anyLong(), any());
    }

    @Test
    void addCommentToPost_shouldReturnNotFound_whenServiceThrows() throws Exception {
        when(inMemoryRateLimiter.isAllowed(anyString())).thenReturn(true);
        doThrow(new RuntimeException("Post not found")).when(commentService)
                .addCommentToPost(anyLong(), any(Comment.class));

        mockMvc.perform(post("/api/comments/post/999")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(validRequest))
                        .header("X-Forwarded-For", "1.2.3.4"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.error").value("Post not found"));
    }
}
