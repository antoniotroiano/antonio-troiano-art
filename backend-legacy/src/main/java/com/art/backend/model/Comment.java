package com.art.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(length = 255)
    private String email;

    @Column(nullable = false, length = 1000)
    private String content;

    @Column(length = 50)
    private String ipAddress;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id", nullable = false)
    @JsonBackReference
    private BlogPost post;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    public Comment() {
        // leer
    }

    @Builder
    public Comment(final String name, final String email, final String content, final String ipAddress,
            final BlogPost post) {
        this.name = name;
        this.email = email;
        this.content = content;
        this.ipAddress = ipAddress;
        this.post = post;
        createdAt = LocalDateTime.now();
    }
}
