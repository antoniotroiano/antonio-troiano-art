package com.art.backend.integration.controller;

import java.time.Instant;
import java.time.LocalDate;

import com.art.backend.integration.AbstractPostgresTest;
import com.art.backend.integration.TestConfig;
import com.art.backend.model.BlogPost;
import com.art.backend.model.Comment;
import com.art.backend.model.dto.CommentRequest;
import com.art.backend.repository.BlogPostRepository;
import com.art.backend.repository.CommentRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestInstance.Lifecycle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.context.annotation.Import;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@TestInstance(Lifecycle.PER_CLASS)
@ActiveProfiles("test-postgres")
@Import(TestConfig.class)
class CommentControllerE2ETest extends AbstractPostgresTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private BlogPostRepository blogPostRepository;

    @Autowired
    private CommentRepository commentRepository;

    private BlogPost post;

    @BeforeEach
    void setUp() {
        commentRepository.deleteAll();
        blogPostRepository.deleteAll();

        post = new BlogPost();
        post.setTitle("Post mit Kommentaren");
        post.setAuthor("Autor");
        post.setContent("Content");
        post.setDate(LocalDate.now());
        post.setCover("cover.jpg");
        post.setCategory("Allgemein");
        post.setDescription("Beschreibung");

        post = blogPostRepository.save(post);
    }

    @Test
    void givenValidComment_whenPostComment_thenCreated() {
        final CommentRequest request = new CommentRequest();
        request.setName("Tester");
        request.setContent("Sehr guter Beitrag!");
        request.setFormDisplayedAt(Instant.now().minusSeconds(10).toEpochMilli());

        final ResponseEntity<Void> response =
                restTemplate.postForEntity("/api/comments/post/" + post.getId(), request, Void.class);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(1, commentRepository.findAll().size());
    }

    @Test
    void givenInvalidPostId_whenPostComment_thenNotFound() {
        final CommentRequest request = new CommentRequest();
        request.setName("Tester");
        request.setContent("Kommentar zu nicht vorhandenem Post");
        request.setFormDisplayedAt(Instant.now().minusSeconds(10).toEpochMilli());

        final ResponseEntity<String> response =
                restTemplate.postForEntity("/api/comments/post/234", request, String.class);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertTrue(response.getBody().contains("not found"));
    }

    @Test
    void givenPostWithComments_whenGetComments_thenReturnList() {
        final Comment comment = Comment.builder()
                .name("Testuser")
                .email("a@b.de")
                .content("Ein Kommentar")
                .ipAddress("127.0.0.1")
                .post(post)
                .build();
        commentRepository.save(comment);

        final ResponseEntity<Comment[]> response = restTemplate.getForEntity(
                "/api/comments/post/" + post.getId(), Comment[].class);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(1, response.getBody().length);
        assertEquals("Ein Kommentar", response.getBody()[0].getContent());
    }

    @Test
    void givenNoComments_whenGetComments_thenReturnEmptyList() {
        final ResponseEntity<Comment[]> response =
                restTemplate.getForEntity("/api/comments/post/" + post.getId(), Comment[].class);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(0, response.getBody().length);
    }
}
