package com.ssafy.hamtteukka.repository;

import com.ssafy.hamtteukka.domain.SavedFeed;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SavedFeedRepository extends JpaRepository<SavedFeed, Long> {
    boolean existsByUserIdAndFeedId(Long userId, Long feedId);
    Optional<SavedFeed> findByUserIdAndFeedId(Long userId, Long feeId);
}
