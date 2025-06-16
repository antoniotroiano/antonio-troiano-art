package com.art.backend.service;

import com.art.backend.exception.BlogPostNotFoundException;
import com.art.backend.model.BlogPost;
import com.art.backend.model.dto.BlogPostRequest;
import com.art.backend.model.dto.BlogPostResponse;
import com.art.backend.repository.BlogPostRepository;

import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class BlogPostServiceTest {

    private final BlogPostRepository blogPostRepository = mock(BlogPostRepository.class);
    private final BlogPostService subjectUnderTest = new BlogPostService(blogPostRepository);

    @Test
    void getAllPostsTest() {
        // Given
        final BlogPost blogPost = createBlogPost();
        when(blogPostRepository.findAll()).thenReturn(List.of(blogPost));

        // When
        final List<BlogPostResponse> allPosts = subjectUnderTest.getAllPosts();

        // Then
        assertNotNull(allPosts);
        assertTrue(!allPosts.isEmpty());
        assertThat(blogPost)
                .usingRecursiveComparison()
                .comparingOnlyFields("title", "content", "author", "cover", "description", "category")
                .isEqualTo(allPosts.get(0));
    }

    @Test
    void getPostByIdTest() {
        // Given
        final BlogPost blogPost = createBlogPost();
        when(blogPostRepository.findById(any())).thenReturn(Optional.of(blogPost));

        // When
        final BlogPostResponse postById = subjectUnderTest.getPostById(1L);

        // Then
        assertNotNull(postById);
        assertThat(blogPost)
                .usingRecursiveComparison()
                .comparingOnlyFields("title", "content", "author", "cover", "description", "category")
                .isEqualTo(postById);
    }

    @Test
    void getBlogPostByIdThrowRuntimeExceptionTest() {
        // Given / When / Then
        assertThrows(RuntimeException.class, () -> subjectUnderTest.getPostById(1L));
    }

    @Test
    void createPostTest() {
        // Given
        final BlogPost blogPost = createBlogPost();
        final BlogPostRequest blogPostRequest = createBlogPostRequest();
        when(blogPostRepository.save(any())).thenReturn(blogPost);

        // When
        final BlogPostResponse post = subjectUnderTest.createPost(blogPostRequest);

        // Then
        assertNotNull(post);
        assertThat(blogPost)
                .usingRecursiveComparison()
                .comparingOnlyFields("title", "content", "author", "cover", "description", "category")
                .isEqualTo(post);
    }

    @Test
    void updatePostTest() {
        // Given
        final BlogPost blogPost = createBlogPost();
        when(blogPostRepository.findById(any())).thenReturn(Optional.of(blogPost));
        blogPost.setTitle("Title2");
        when(blogPostRepository.save(any())).thenReturn(blogPost);
        final BlogPostResponse blogPostResponse = createBlogPostDto();

        // When
        final BlogPostResponse updatedPost = subjectUnderTest.updatePost(1L, blogPostResponse);

        // Then
        assertNotNull(updatedPost);
        assertThat(blogPost)
                .usingRecursiveComparison()
                .comparingOnlyFields("title", "content", "author", "cover", "description", "category")
                .isEqualTo(updatedPost);
        assertEquals("Title2", updatedPost.getTitle());
    }

    @Test
    void updateImageThrowRuntimeExceptionTest() {
        // Given / When / Then
        assertThrows(RuntimeException.class, () -> subjectUnderTest.updatePost(1L, createBlogPostDto()));
    }

    @Test
    void deletePostTest() {
        // Given
        when(blogPostRepository.existsById(any())).thenReturn(true);

        // When
        subjectUnderTest.deletePost(1L);

        // Then
        verify(blogPostRepository, times(1)).deleteById(1L);
    }

    @Test
    void deletePostNotFoundExceptionTest() {
        // Given / When / Then
        assertThrows(BlogPostNotFoundException.class, () -> subjectUnderTest.deletePost(1L));
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
        return blogPost;
    }

    private static final BlogPostResponse createBlogPostDto() {
        final BlogPostResponse blogPostResponse = new BlogPostResponse();
        blogPostResponse.setTitle("Title2");
        blogPostResponse.setContent("Content");
        blogPostResponse.setAuthor("Author");
        blogPostResponse.setCover("Cover");
        blogPostResponse.setDescription("Description");
        blogPostResponse.setDate(LocalDate.now());
        blogPostResponse.setCategory("Category");
        return blogPostResponse;
    }

    private static final BlogPostRequest createBlogPostRequest() {
        final BlogPostRequest blogPostRequest = new BlogPostRequest();
        blogPostRequest.setTitle("Title");
        blogPostRequest.setContent("Content");
        blogPostRequest.setAuthor("Author");
        blogPostRequest.setCover("Cover");
        blogPostRequest.setDescription("Description");
        blogPostRequest.setDate(LocalDate.now());
        blogPostRequest.setCategory("Category");
        return blogPostRequest;
    }
}