package com.art.backend.internal;

import com.art.backend.service.CommentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestOperations;
import org.springframework.web.client.RestTemplate;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/admin/comments")
public class CommentAdminController {

    private final CommentService commentService;

    @Value("${revalidate.url.comments}")
    private String commentsRevalidateUrl;

    @Autowired
    public CommentAdminController(final CommentService commentService) {
        this.commentService = commentService;
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<?> deleteCommentFromPost(@PathVariable final Long commentId) {
        log.info("Delete comment with id={}", commentId);
        commentService.deleteCommentFromPost(commentId);
        final RestOperations restTemplate = new RestTemplate();

        revalidatePaths(commentsRevalidateUrl, restTemplate, "Delete");
        return ResponseEntity.noContent().build();
    }

    private static void revalidatePaths(final String url, final RestOperations restTemplate, final String operation) {
        try {
            final ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
            if (!response.getStatusCode().is2xxSuccessful()) {
                log.warn("[Comment {}] Revalidate failed for {} with status: {}", operation, url,
                        response.getStatusCode());
            } else {
                log.info("[Comment {}] Revalidate success: {}", operation, url);
            }
        } catch (final Exception e) {
            log.warn("[Comment {}] Revalidate error for {}: {}", operation, url, e.getMessage());
        }
    }
}
