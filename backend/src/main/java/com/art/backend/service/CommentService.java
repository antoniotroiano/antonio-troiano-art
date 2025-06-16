package com.art.backend.service;

import com.art.backend.exception.BlogPostNotFoundException;
import com.art.backend.exception.CommentNotFoundException;
import com.art.backend.model.BlogPost;
import com.art.backend.model.Comment;
import com.art.backend.model.dto.CommentResponse;
import com.art.backend.repository.BlogPostRepository;
import com.art.backend.repository.CommentRepository;
import com.google.common.collect.Lists;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final BlogPostRepository blogPostRepository;

    public CommentService(final CommentRepository commentRepository, final BlogPostRepository blogPostRepository) {
        this.commentRepository = commentRepository;
        this.blogPostRepository = blogPostRepository;
    }

    public List<CommentResponse> getCommentsForPost(final Long postId) {
        final BlogPost post = findBlogPostOrThrow(postId);
        final List<CommentResponse> responses = post.getComments().stream()
                .map(CommentResponse::fromEntity)
                .collect(Collectors.toList());

        log.debug("Found {} comments for postId={}", responses.size(), postId);
        return Lists.reverse(responses);
    }

    public Comment addCommentToPost(final Long postId, final Comment comment) {
        final BlogPost post = findBlogPostOrThrow(postId);
        comment.setPost(post);
        final Comment saved = commentRepository.save(comment);
        log.info("Saved comment for postId={} with name={}", postId, comment.getName());
        return saved;
    }

    public void deleteCommentFromPost(final Long commentId) {
        if (!commentRepository.existsById(commentId)) {
            log.warn("Tried to delete non-existing comment with id={}", commentId);
            throw new CommentNotFoundException(commentId);
        }
        commentRepository.deleteById(commentId);
        log.info("Deleted comment with id={}", commentId);
    }

    private BlogPost findBlogPostOrThrow(final Long postId) {
        return blogPostRepository.findById(postId).orElseThrow(() -> new BlogPostNotFoundException(postId));
    }
}
