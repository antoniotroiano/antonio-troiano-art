package com.art.backend.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import com.art.backend.exception.CommentNotFoundException;
import com.art.backend.model.BlogPost;
import com.art.backend.model.Comment;
import com.art.backend.model.dto.CommentResponse;
import com.art.backend.repository.BlogPostRepository;
import com.art.backend.repository.CommentRepository;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class CommentServiceTest {

    private final CommentRepository commentRepository = mock(CommentRepository.class);
    private final BlogPostRepository blogPostRepository = mock(BlogPostRepository.class);
    private final CommentService subjectUnderTest = new CommentService(commentRepository, blogPostRepository);

    @Test
    void createCommentTest() {
        // Given
        final Comment comment = createComment();
        final BlogPost blogPost = createBlogPost();
        when(blogPostRepository.findById(any())).thenReturn(Optional.of(blogPost));

        // When
        subjectUnderTest.addCommentToPost(1l, comment);

        // Then
        verify(commentRepository, times(1)).save(comment);
    }

    @Test
    void getCommentTest() {
        // Given
        final BlogPost blogPost = createBlogPost();
        when(blogPostRepository.findById(any())).thenReturn(Optional.of(blogPost));

        // When
        final List<CommentResponse> commentsForPost = subjectUnderTest.getCommentsForPost(1L);

        // Then
        assertNotNull(commentsForPost);
        assertThat(blogPost.getComments())
                .usingRecursiveComparison()
                .comparingOnlyFields("name", "email", "content", "createdAt")
                .isEqualTo(commentsForPost);
    }

    @Test
    void deleteCommentTest() {
        // Given
        when(commentRepository.existsById(any())).thenReturn(true);

        // When
        subjectUnderTest.deleteCommentFromPost(1L);

        // Then
        verify(commentRepository, times(1)).deleteById(1L);
    }

    @Test
    void deleteCommentNotFoundException() {
        // Given / When / Then
        assertThrows(CommentNotFoundException.class, () -> subjectUnderTest.deleteCommentFromPost(1L));
    }

    private static final Comment createComment() {
        final Comment comment = new Comment();
        comment.setId(1L);
        comment.setName("name");
        comment.setContent("content");
        comment.setCreatedAt(LocalDateTime.now());
        return comment;
    }

    private static final BlogPost createBlogPost() {
        final BlogPost blogPost = new BlogPost();
        blogPost.setTitle("Title");
        blogPost.setContent("Content");
        blogPost.setAuthor("Author");
        blogPost.setId(1L);
        blogPost.setCover("Cover");
        blogPost.setDescription("Description");
        blogPost.setDate(LocalDate.now());
        blogPost.setCategory("Category");
        blogPost.setComments(List.of(createComment()));
        return blogPost;
    }
}