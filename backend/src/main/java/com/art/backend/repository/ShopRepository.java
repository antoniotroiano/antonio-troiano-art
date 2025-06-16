package com.art.backend.repository;

import com.art.backend.model.ShopImage;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShopRepository extends JpaRepository<ShopImage, Long> {

}
