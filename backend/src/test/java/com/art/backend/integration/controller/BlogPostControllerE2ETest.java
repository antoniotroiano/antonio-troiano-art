package com.art.backend.integration.controller;

import java.time.LocalDate;

import com.art.backend.integration.AbstractPostgresTest;
import com.art.backend.integration.TestConfig;
import com.art.backend.model.BlogPost;
import com.art.backend.repository.BlogPostRepository;

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
class BlogPostControllerE2ETest extends AbstractPostgresTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private BlogPostRepository blogPostRepository;

    private BlogPost savedPost;

    @BeforeEach
    void setup() {
        blogPostRepository.deleteAll();
        final BlogPost post = new BlogPost();
        post.setTitle("Test Title");
        post.setAuthor("Tester");
        post.setCategory("General");
        post.setContent("Lorem ipsum");
        post.setDescription("Test Desc");
        post.setCover("cover.jpg");
        post.setDate(LocalDate.now());
        savedPost = blogPostRepository.save(post);
    }

    @Test
    void givenPostExists_whenGetAll_thenReturnList() {
        final ResponseEntity<BlogPost[]> response = restTemplate.getForEntity("/api/posts", BlogPost[].class);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertTrue(response.getBody().length >= 1);
    }

    @Test
    void givenValidId_whenGetById_thenReturnPost() {
        final ResponseEntity<BlogPost> response =
                restTemplate.getForEntity("/api/posts/" + savedPost.getId(), BlogPost.class);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(savedPost.getTitle(), response.getBody().getTitle());
    }

    @Test
    void givenInvalidId_whenGetById_thenReturnNotFound() {
        final ResponseEntity<String> response = restTemplate.getForEntity("/api/posts/999999", String.class);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertTrue(response.getBody().contains("not found"));
    }
}
