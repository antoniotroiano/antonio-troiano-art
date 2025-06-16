package com.art.backend.model;

import java.time.LocalDateTime;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class CommentTest {

    @Test
    void givenBuilder_whenCreatingComment_thenFieldsAreSetCorrectly() {
        // Given
        final String name = "Test User";
        final String email = "test@example.com";
        final String content = "Test comment";
        final String ip = "127.0.0.1";
        final BlogPost post = new BlogPost();

        // When
        final Comment comment = Comment.builder()
                .name(name)
                .email(email)
                .content(content)
                .ipAddress(ip)
                .post(post)
                .build();

        // Then
        assertEquals(name, comment.getName());
        assertEquals(email, comment.getEmail());
        assertEquals(content, comment.getContent());
        assertEquals(ip, comment.getIpAddress());
        assertEquals(post, comment.getPost());
        assertNotNull(comment.getCreatedAt());
    }

    @Test
    void whenCreatingCommentWithBuilder_thenCreatedAtIsSetToNow() {
        // When
        final Comment comment = Comment.builder()
                .name("test")
                .content("content")
                .post(new BlogPost())
                .build();

        // Then
        assertNotNull(comment.getCreatedAt());
        assertTrue(comment.getCreatedAt().isBefore(LocalDateTime.now().plusSeconds(1)));
    }
}
