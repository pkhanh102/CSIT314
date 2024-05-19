package com.javaweb.repository;

import com.javaweb.model.entity.RestaurantEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RestaurantRepository extends JpaRepository<RestaurantEntity, Integer> {
    List<RestaurantEntity> findByNameContainsAndCategoryContains(String name, String category);
    Boolean existsByEmailAndPassword(String email, String password);
    Boolean existsByEmail(String email);
    RestaurantEntity findByEmail(String email);
}
