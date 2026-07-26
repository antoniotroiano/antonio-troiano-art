package com.art.backend.internal;

import java.util.List;

import com.art.backend.model.dto.BlogPostRequest;
import com.art.backend.model.dto.BlogPostResponse;
import com.art.backend.service.BlogPostService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestOperations;
import org.springframework.web.client.RestTemplate;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/admin/posts")
public class BlogAdminController {

    private final BlogPostService blogPostService;

    @Value("${revalidate.url.blog}")
    private String blogRevalidateUrl;

    @Autowired
    public BlogAdminController(final BlogPostService blogPostService) {
        this.blogPostService = blogPostService;
    }

    @PostMapping
    public ResponseEntity<BlogPostResponse> createPost(@Valid @RequestBody final BlogPostRequest request) {
        log.info("Creating new blog post with title: {}", request.getTitle());
        final BlogPostResponse createdPost = blogPostService.createPost(request);
        final RestOperations restTemplate = new RestTemplate();

        revalidatePaths(blogRevalidateUrl, restTemplate, "Create");
        return ResponseEntity.status(HttpStatus.CREATED).body(createdPost);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BlogPostResponse> updatePost(@PathVariable final Long id,
            @Valid @RequestBody final BlogPostResponse blogPostResponse) {
        log.info("Updating blog post id {} with title: {}", id, blogPostResponse.getTitle());
        final BlogPostResponse updatedPost = blogPostService.updatePost(id, blogPostResponse);

        final RestOperations restTemplate = new RestTemplate();
        final String detailRevalidateUrl = blogRevalidateUrl + id;

        for (final String url : List.of(blogRevalidateUrl, detailRevalidateUrl)) {
            revalidatePaths(url, restTemplate, "Update");
        }
        return ResponseEntity.ok(updatedPost);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable final Long id) {
        log.info("Deleting blog post with id: {}", id);
        blogPostService.deletePost(id);
        final RestOperations restTemplate = new RestTemplate();

        revalidatePaths(blogRevalidateUrl, restTemplate, "Delete");
        return ResponseEntity.noContent().build();
    }

    private static void revalidatePaths(final String url, final RestOperations restTemplate, final String operation) {
        try {
            final ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
            if (!response.getStatusCode().is2xxSuccessful()) {
                log.warn("[Blog {}] Revalidate failed for {} with status: {}", operation, url,
                        response.getStatusCode());
            } else {
                log.info("[Blog {}] Revalidate success: {}", operation, url);
            }
        } catch (final Exception e) {
            log.warn("[Blog {}] Revalidate error for {}: {}", operation, url, e.getMessage());
        }
    }
}
