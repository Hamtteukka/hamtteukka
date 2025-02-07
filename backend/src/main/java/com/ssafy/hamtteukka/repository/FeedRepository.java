package com.ssafy.hamtteukka.repository;

import com.ssafy.hamtteukka.domain.Feed;
import com.ssafy.hamtteukka.dto.FeedPaginationResponseDto;
import com.ssafy.hamtteukka.dto.FeedResponseDto;
import com.ssafy.hamtteukka.dto.SavedFeedResponseDto;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FeedRepository extends JpaRepository<Feed, Long> {

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

    @Query("""
                SELECT new com.ssafy.hamtteukka.dto.SavedFeedResponseDto(
                    sf.id, f.title, 
                    (SELECT fi.id FROM FeedImage fi WHERE fi.feed.id = f.id AND fi.imageType = 0) as thumbnailImageId, 
                    u.nickname, u.profileId)
                FROM SavedFeed sf
                JOIN sf.feed f
                JOIN f.user u
                WHERE sf.user.id = :userId
                AND f.feedType = 1
                AND (:cursor IS NULL OR sf.id < :cursor)
                ORDER BY sf.id DESC
            """)
    Slice<SavedFeedResponseDto> findSavedAiFeedsWithPagination(
            @Param("userId") Long userId,
            @Param("cursor") Long cursor,
            Pageable pageable);

    @Query("""
        SELECT new com.ssafy.hamtteukka.dto.FeedResponseDto(
                f.id, f.title,  f.feedType, fi.id
        )
        FROM Feed f
        LEFT JOIN FeedImage fi ON fi.feed.id = f.id AND fi.imageType = 0
        WHERE f.user.id = :userId AND f.feedType = 0 AND (:cursor IS NULL OR f.id < :cursor)
        ORDER BY f.id DESC
        """)
    Slice<FeedResponseDto> findFeedsByUserIdWithCursor(
            @Param("userId") Long userId,
            @Param("cursor") Long cursor,
            Pageable pageable);

    @Query("""
        SELECT new com.ssafy.hamtteukka.dto.FeedResponseDto(
                f.id, f.title,  f.feedType, fi.id
        )
        FROM Feed f
        LEFT JOIN FeedImage fi ON fi.feed.id = f.id AND fi.imageType = 0
        WHERE f.user.id = :userId AND f.feedType = 1 AND (:cursor IS NULL OR f.id < :cursor)
        ORDER BY f.id DESC
        """)
    Slice<FeedResponseDto> findAIFeedsByUserIdWithCursor(
            @Param("userId") Long userId,
            @Param("cursor") Long cursor,
            Pageable pageable);

}
