package com.art.backend.integration.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import com.art.backend.integration.AbstractPostgresTest;
import com.art.backend.integration.TestConfig;
import com.art.backend.model.BlogPost;
import com.art.backend.model.Comment;
import com.art.backend.model.dto.CommentResponse;
import com.art.backend.repository.BlogPostRepository;
import com.art.backend.repository.CommentRepository;
import com.art.backend.service.CommentService;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestInstance.Lifecycle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
@Transactional
@TestInstance(Lifecycle.PER_CLASS)
@ActiveProfiles("test-postgres")
@Import(TestConfig.class)
class CommentServiceIntegrationTest extends AbstractPostgresTest {

    @Autowired
    private CommentService commentService;

    @Autowired
    private BlogPostRepository blogPostRepository;

    @Autowired
    private CommentRepository commentRepository;

    private BlogPost savedPost;
    private Comment savedComment;

    @BeforeAll
    void setup() {
        final BlogPost post = new BlogPost();
        post.setTitle("Testpost für Kommentare");
        post.setAuthor("Antonio");
        post.setDate(LocalDate.now());
        post.setCategory("Test");
        post.setDescription("Beschreibung");
        post.setContent("Inhalt");
        savedPost = blogPostRepository.save(post);

        final Comment comment = Comment.builder()
                .name("Test Nutzer")
                .email("test@example.com")
                .content("Kommentar Inhalt")
                .ipAddress("127.0.0.1")
                .post(savedPost)
                .build();
        savedComment = commentRepository.save(comment);
    }

    @Test
    @DisplayName("Given valid Comment and Post ID, when create, then comment is saved")
    void testCreateComment() {
        final Comment newComment = Comment.builder()
                .name("Neuer Nutzer")
                .email("neu@example.com")
                .content("Neuer Kommentar")
                .ipAddress("192.168.1.1")
                .build();

        final Comment created = commentService.addCommentToPost(savedPost.getId(), newComment);

        assertNotNull(created.getId());
        assertEquals("Neuer Nutzer", created.getName());
        assertEquals(savedPost.getId(), created.getPost().getId());
    }

    @Test
    @DisplayName("Given existing comment ID, when findById, then comment is returned")
    void testFindById() {
        final Optional<Comment> found = commentRepository.findById(savedComment.getId());
        assertTrue(found.isPresent());
        assertEquals(savedComment.getName(), found.get().getName());
    }

    @Test
    @DisplayName("Given post ID, when findByPostId, then comments list is returned")
    void testFindByPostId() {
        final List<CommentResponse> comments = commentService.getCommentsForPost(savedPost.getId());
        assertFalse(comments.isEmpty());
        assertEquals(savedComment.getId(), comments.get(0).getId());
    }

    @Test
    @DisplayName("Given existing comment ID, when delete, then comment is removed")
    void testDeleteComment() {
        commentService.deleteCommentFromPost(savedComment.getId());
        final Optional<Comment> deleted = commentRepository.findById(savedComment.getId());
        assertTrue(deleted.isEmpty());
    }
}
