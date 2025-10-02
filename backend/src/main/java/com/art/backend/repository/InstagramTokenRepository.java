package com.art.backend.repository;

import java.util.Optional;

import com.art.backend.model.InstagramToken;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InstagramTokenRepository extends JpaRepository<InstagramToken, Long> {

    Optional<InstagramToken> findTopByOrderByLastRefreshedDesc();
}
