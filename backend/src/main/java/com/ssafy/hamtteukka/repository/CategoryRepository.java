package com.ssafy.hamtteukka.repository;

import com.ssafy.hamtteukka.domain.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
