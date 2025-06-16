package com.art.backend.repository;

import com.art.backend.model.PortfolioImage;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PortfolioImageRepository extends JpaRepository<PortfolioImage, Long> {

}
