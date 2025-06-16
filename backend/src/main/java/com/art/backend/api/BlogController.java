package com.art.backend.api;

import java.util.List;

import com.art.backend.model.dto.BlogPostResponse;
import com.art.backend.service.BlogPostService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/posts")
public class BlogController {

    private final BlogPostService blogPostService;

    @Autowired
    public BlogController(final BlogPostService blogPostService) {
        this.blogPostService = blogPostService;
    }

    @GetMapping
    public ResponseEntity<List<BlogPostResponse>> getAllPosts() {
        log.debug("Fetching all blog posts");
        return ResponseEntity.ok(blogPostService.getAllPosts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<BlogPostResponse> getPostById(@PathVariable final Long id) {
        log.debug("Fetching blog post by id: {}", id);
        final BlogPostResponse post = blogPostService.getPostById(id);
        return ResponseEntity.ok(post);
    }
}
