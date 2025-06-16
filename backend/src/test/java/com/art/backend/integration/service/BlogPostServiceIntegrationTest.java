package com.art.backend.integration.service;

import java.time.LocalDate;
import java.util.Optional;

import com.art.backend.exception.BlogPostNotFoundException;
import com.art.backend.integration.AbstractPostgresTest;
import com.art.backend.integration.TestConfig;
import com.art.backend.model.BlogPost;
import com.art.backend.model.dto.BlogPostRequest;
import com.art.backend.model.dto.BlogPostResponse;
import com.art.backend.repository.BlogPostRepository;
import com.art.backend.service.BlogPostService;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestInstance.Lifecycle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
@Transactional
@AutoConfigureTestDatabase(replace = Replace.NONE)
@TestInstance(Lifecycle.PER_CLASS)
@ActiveProfiles("test-postgres")
@Import(TestConfig.class)
class BlogPostServiceIntegrationTest extends AbstractPostgresTest {

    @Autowired
    private BlogPostService blogPostService;

    @Autowired
    private BlogPostRepository blogPostRepository;

    private BlogPost savedPost;

    @BeforeAll
    void setup() {
        final BlogPost post = new BlogPost();
        post.setTitle("Erster Testpost");
        post.setAuthor("Antonio");
        post.setDate(LocalDate.now());
        post.setCategory("Test");
        post.setDescription("Beschreibung");
        post.setContent("Inhalt des Testposts");

        savedPost = blogPostRepository.save(post);
    }

    @Test
    @DisplayName("Given valid BlogPost, when create, then post is saved")
    void testCreateBlogPost() {
        final BlogPostRequest newPost = new BlogPostRequest();
        newPost.setTitle("Neuer Post");
        newPost.setAuthor("Tester");
        newPost.setDate(LocalDate.now());
        newPost.setCategory("Test");
        newPost.setDescription("Beschreibung");
        newPost.setContent("Inhalt");

        final BlogPostResponse created = blogPostService.createPost(newPost);

        assertNotNull(created.getId());
        assertEquals("Neuer Post", created.getTitle());
        assertEquals("Tester", created.getAuthor());
    }

    @Test
    @DisplayName("Given existing post id, when findById, then post is returned")
    void testFindById() {
        final BlogPostResponse found = blogPostService.getPostById(savedPost.getId());
        assertEquals(savedPost.getTitle(), found.getTitle());
    }

    @Test
    @DisplayName("Given non-existing post id, when findById, then empty optional is returned")
    void testFindByIdNotFound() {
        assertThrows(BlogPostNotFoundException.class, () -> blogPostService.getPostById(99999L));
    }

    @Test
    @DisplayName("Given existing post, when update, then post is updated")
    void testUpdatePost() {
        final BlogPostResponse updateData = new BlogPostResponse();
        updateData.setTitle("Aktualisierter Titel");
        updateData.setAuthor("Antonio");
        updateData.setDate(LocalDate.now());
        updateData.setCategory("Aktualisiert");
        updateData.setDescription("Neue Beschreibung");
        updateData.setContent("Neuer Inhalt");

        final BlogPostResponse updated = blogPostService.updatePost(savedPost.getId(), updateData);
        assertEquals("Aktualisierter Titel", updated.getTitle());
        assertEquals("Aktualisiert", updated.getCategory());
    }

    @Test
    @DisplayName("Given existing post, when delete, then post is removed")
    void testDeletePost() {
        blogPostService.deletePost(savedPost.getId());
        final Optional<BlogPost> deleted = blogPostRepository.findById(savedPost.getId());
        assertTrue(deleted.isEmpty());
    }
}

