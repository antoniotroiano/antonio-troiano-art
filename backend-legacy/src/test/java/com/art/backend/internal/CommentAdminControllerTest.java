package com.art.backend.internal;

import com.art.backend.service.CommentService;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = CommentAdminController.class,
        excludeAutoConfiguration = SecurityAutoConfiguration.class)
class CommentAdminControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private CommentService commentService;

    @Test
    void deleteCommentFromPost_shouldReturnNoContent() throws Exception {
        doNothing().when(commentService).deleteCommentFromPost(1L);

        mockMvc.perform(delete("/api/admin/comments/1")).andExpect(status().isNoContent());

        verify(commentService).deleteCommentFromPost(1L);
    }
}
