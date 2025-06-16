package com.art.backend.model.dto;

import com.art.backend.model.Comment;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@JsonInclude(Include.NON_NULL)
public class CommentResponse {

    private Long id;
    private String name;
    private String content;
    private String email;
    private LocalDateTime createdAt;
    private String postName;

    public static CommentResponse fromEntity(final Comment comment) {
        return builder()
                .id(comment.getId())
                .name(comment.getName())
                .content(comment.getContent())
                .email(comment.getEmail())
                .createdAt(comment.getCreatedAt())
                .postName(comment.getPost() != null ? comment.getPost().getTitle() : null)
                .build();
    }
}
