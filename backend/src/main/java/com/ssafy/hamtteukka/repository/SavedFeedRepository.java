package com.ssafy.hamtteukka.repository;

import com.ssafy.hamtteukka.domain.SavedFeed;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SavedFeedRepository extends JpaRepository<SavedFeed, Long> {
    boolean existsByUserIdAndFeedId(Long userId, Long feedId);
}
