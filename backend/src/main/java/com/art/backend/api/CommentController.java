package com.art.backend.api;

import com.art.backend.model.Comment;
import com.art.backend.model.dto.CommentResponse;
import com.art.backend.model.dto.CommentRequest;
import com.art.backend.service.CommentService;
import com.art.backend.service.InMemoryRateLimiter;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestOperations;
import org.springframework.web.client.RestTemplate;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/comments")
public class CommentController {

    private static final int MINIMUM_WAIT_MILLIS = 5000;

    private final CommentService commentService;
    private final InMemoryRateLimiter inMemoryRateLimiter;

    @Value("${revalidate.url.comments}")
    private String commentsRevalidateUrl;

    @Autowired
    public CommentController(final CommentService commentService, final InMemoryRateLimiter inMemoryRateLimiter) {
        this.commentService = commentService;
        this.inMemoryRateLimiter = inMemoryRateLimiter;
    }

    @GetMapping("/post/{postId}")
    public ResponseEntity<List<CommentResponse>> getCommentsForPost(@PathVariable final Long postId) {
        log.debug("Fetch comments for postId={}", postId);
        final List<CommentResponse> comments = commentService.getCommentsForPost(postId);
        return ResponseEntity.ok(comments);
    }

    @PostMapping("/post/{postId}")
    public ResponseEntity<?> addCommentToPost(@PathVariable final Long postId,
            @RequestBody final CommentRequest request, final HttpServletRequest httpRequest) {
        final String ip = extractClientIp(httpRequest);
        log.info("Attempt to create comment for postId={}", postId);

        if (request.getHoneypot() != null && !request.getHoneypot().isBlank()) {
            log.warn("Bot detected via honeypot field from IP=", ip);
            return ResponseEntity.badRequest().body(Map.of("message", "Bot detection triggered."));
        }

        if (request.getFormDisplayedAt() == null) {
            log.warn("Missing formDisplayedAt field from IP={}", ip);
            return ResponseEntity.badRequest().body(Map.of("error", "Missing form data"));
        }

        final long diff = Instant.now().toEpochMilli() - request.getFormDisplayedAt();
        if (diff < MINIMUM_WAIT_MILLIS) {
            log.warn("Form submitted too quickly ({} ms) from IP={}", diff, ip);
            return ResponseEntity.badRequest().body(Map.of("error", "Submitting too fast. Please wait a moment."));
        }

        if (!inMemoryRateLimiter.isAllowed(ip)) {
            log.warn("Rate limit exceeded for IP={}", ip);
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
                    .body(Map.of("error", "Please wait a few seconds before sending again."));
        }

        final Comment comment = new Comment();
        comment.setName(request.getName());
        comment.setContent(request.getContent());
        comment.setIpAddress(ip);
        comment.setCreatedAt(LocalDateTime.now());

        try {
            commentService.addCommentToPost(postId, comment);
            log.info("Comment successfully added to postId={}", postId);
            final RestOperations restTemplate = new RestTemplate();
            revalidatePaths(commentsRevalidateUrl, restTemplate, "Create");
            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("message", "Comment added successfully"));
        } catch (final RuntimeException e) {
            log.error("Failed to add comment to postId={}", postId, e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
        }
    }

    private static String extractClientIp(final HttpServletRequest request) {
        final String xfHeader = request.getHeader("X-Forwarded-For");
        return xfHeader != null ? xfHeader.split(",")[0] : request.getRemoteAddr();
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
