package com.ssafy.hamtteukka.repository;

import com.ssafy.hamtteukka.domain.Feed;
import com.ssafy.hamtteukka.dto.SavedFeedResponseDto;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface FeedRepository extends JpaRepository<Feed,Long> {

    @Query("""
        SELECT new com.ssafy.hamtteukka.dto.SavedFeedResponseDto(
            sf.id, f.title, 
            (SELECT fi.id FROM FeedImage fi WHERE fi.feed.id = f.id AND fi.imageType = 0) as thumbnailImageId, 
            u.nickname, u.profileId)
        FROM SavedFeed sf
        JOIN sf.feed f
        JOIN f.user u
        WHERE sf.user.id = :userId 
        AND (:cursor IS NULL OR sf.id < :cursor)
        ORDER BY sf.id DESC
    """)
    Slice<SavedFeedResponseDto> findSavedFeedsWithPagination(
            @Param("userId") Long userId,
            @Param("cursor") Long cursor,
            Pageable pageable);
}
