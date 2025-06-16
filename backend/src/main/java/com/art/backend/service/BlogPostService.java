package com.art.backend.service;

import com.art.backend.exception.BlogPostNotFoundException;
import com.art.backend.model.BlogPost;
import com.art.backend.model.dto.BlogPostRequest;
import com.art.backend.model.dto.BlogPostResponse;
import com.art.backend.repository.BlogPostRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class BlogPostService {

    private final BlogPostRepository blogPostRepository;

    @Autowired
    public BlogPostService(final BlogPostRepository blogPostRepository) {
        this.blogPostRepository = blogPostRepository;
    }

    public List<BlogPostResponse> getAllPosts() {
        log.debug("Loading all blog posts from repository");
        return blogPostRepository.findAll()
                .stream()
                .map(BlogPostService::mapToDto)
                .peek(dto -> log.debug("Mapped BlogPostResponse DTO: id={}, title={}", dto.getId(), dto.getTitle()))
                .collect(Collectors.toList());
    }

    public BlogPostResponse getPostById(final Long id) {
        log.debug("Loading blog post by id {}", id);
        final BlogPost post = blogPostRepository.findById(id)
                .orElseThrow(() -> new BlogPostNotFoundException(id));
        return mapToDto(post);
    }

    public BlogPostResponse createPost(final BlogPostRequest request) {
        final BlogPost post = mapToEntity(request);
        final BlogPost saved = blogPostRepository.save(post);
        log.info("Created blog post with id {}", saved.getId());
        return mapToDto(saved);
    }

    public BlogPostResponse updatePost(final Long id, final BlogPostResponse request) {
        final BlogPost existingPost = blogPostRepository.findById(id)
                .orElseThrow(() -> new BlogPostNotFoundException(id));

        existingPost.setTitle(request.getTitle());
        existingPost.setAuthor(request.getAuthor());
        existingPost.setDate(request.getDate());
        existingPost.setCover(request.getCover());
        existingPost.setCategory(request.getCategory());
        existingPost.setDescription(request.getDescription());
        existingPost.setContent(request.getContent());

        final BlogPost updated = blogPostRepository.save(existingPost);
        log.info("Updated blog post with id {}", updated.getId());
        return mapToDto(updated);
    }

    public void deletePost(final Long id) {
        if (!blogPostRepository.existsById(id)) {
            throw new BlogPostNotFoundException(id);
        }
        blogPostRepository.deleteById(id);
        log.info("Deleted blog post with id {}", id);
    }

    private static BlogPostResponse mapToDto(final BlogPost post) {
        final BlogPostResponse dto = new BlogPostResponse();
        dto.setId(post.getId());
        dto.setTitle(post.getTitle());
        dto.setAuthor(post.getAuthor());
        dto.setDate(post.getDate());
        dto.setCover(post.getCover());
        dto.setCategory(post.getCategory());
        dto.setDescription(post.getDescription());
        dto.setContent(post.getContent());
        return dto;
    }

    private static BlogPost mapToEntity(final BlogPostRequest dto) {
        final BlogPost post = new BlogPost();
        post.setTitle(dto.getTitle());
        post.setAuthor(dto.getAuthor());
        post.setDate(dto.getDate());
        post.setCover(dto.getCover());
        post.setCategory(dto.getCategory());
        post.setDescription(dto.getDescription());
        post.setContent(dto.getContent());
        return post;
    }
}
