package com.ssafy.hamtteukka.repository;

import com.ssafy.hamtteukka.domain.Feed;
import com.ssafy.hamtteukka.dto.FeedResponseDto;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FeedRepository extends JpaRepository<Feed, Long> {

    @Query("""
                SELECT new com.ssafy.hamtteukka.dto.FeedResponseDto(
                            sf.feed.id,
                            (SELECT fi.id FROM FeedImage fi WHERE fi.feed.id = f.id AND fi.imageType = 0),
                            sf.feed.title,
                            sf.feed.user.profileId
                    )
                FROM SavedFeed sf
                JOIN sf.feed f
                JOIN f.user u
                WHERE sf.user.id = :userId
                AND f.feedType = 0
                AND (:cursor IS NULL OR sf.user.id < :cursor)
                ORDER BY sf.id DESC
            """)
    Slice<FeedResponseDto> findSavedFeedsWithPagination(
            @Param("userId") Long userId,
            @Param("cursor") Long cursor,
            Pageable pageable);

    @Query("""
                SELECT new com.ssafy.hamtteukka.dto.FeedResponseDto(
                            sf.feed.id,
                            (SELECT fi.id FROM FeedImage fi WHERE fi.feed.id = f.id AND fi.imageType = 0),
                            sf.feed.title,
                            sf.feed.user.profileId
                    )
                FROM SavedFeed sf
                JOIN sf.feed f
                JOIN f.user u
                WHERE sf.user.id = :userId
                AND f.feedType = 1
                AND (:cursor IS NULL OR sf.user.id < :cursor)
                ORDER BY sf.id DESC
            """)
    Slice<FeedResponseDto> findSavedAiFeedsWithPagination(
            @Param("userId") Long userId,
            @Param("cursor") Long cursor,
            Pageable pageable);

    @Query("""
            SELECT new com.ssafy.hamtteukka.dto.FeedResponseDto(
                    f.id, fi.id, f.title,  f.user.profileId
            )
            FROM Feed f
            LEFT JOIN f.feedImages fi
            WHERE f.user.id = :userId 
            AND f.feedType = 0
            AND fi.imageType = 0
            AND (:cursor IS NULL OR f.id < :cursor)
            ORDER BY f.id DESC
            """)
    Slice<FeedResponseDto> findFeedsByUserIdWithCursor(
            @Param("userId") Long userId,
            @Param("cursor") Long cursor,
            Pageable pageable);

    @Query("""
            SELECT new com.ssafy.hamtteukka.dto.FeedResponseDto(
                    f.id, fi.id, f.title,  f.user.profileId
            )
            FROM Feed f
            LEFT JOIN f.feedImages fi
            WHERE f.user.id = :userId 
            AND f.feedType = 1
            AND fi.imageType = 0
            AND (:cursor IS NULL OR f.id < :cursor)
            ORDER BY f.id DESC
            """)
    Slice<FeedResponseDto> findAIFeedsByUserIdWithCursor(
            @Param("userId") Long userId,
            @Param("cursor") Long cursor,
            Pageable pageable);

    @Query("""
            SELECT new com.ssafy.hamtteukka.dto.FeedResponseDto(
                f.id,
                (SELECT MIN(fi.id) FROM FeedImage fi WHERE fi.feed.id = f.id AND fi.imageType = 0),
                f.title,
                f.user.profileId
            )
            FROM Feed f
            LEFT JOIN f.user u
            WHERE (:cursor IS NULL OR f.id < :cursor)
            AND (:keyword IS NULL OR f.title LIKE %:keyword%)
            AND (
                COALESCE(:categoryIds, NULL) IS NULL
                OR
                EXISTS (
                    SELECT 1 FROM FeedCategory fc
                    WHERE fc.feed = f
                    AND (
                        CASE 
                            WHEN EXISTS (
                                SELECT 1 FROM FeedCategory fc1
                                WHERE fc1.feed = f
                                AND fc1.category.id IN :categoryIds
                                AND fc1.category.id IN (101, 102)
                            ) THEN
                                EXISTS (
                                    SELECT 1 FROM FeedCategory fc2
                                    WHERE fc2.feed = f
                                    AND fc2.category.id IN :categoryIds
                                    AND fc2.category.id NOT IN (101, 102)
                                )
                            ELSE
                                fc.category.id IN :categoryIds
                        END
                    )
                )
            )
            ORDER BY f.id DESC
            """)
    Slice<FeedResponseDto> searchFeedsWithCursor(
            @Param("cursor") Long cursor,
            @Param("keyword") String keyword,
            @Param("categoryIds") List<Integer> categoryIds,
            Pageable pageable);

    @Query("""
            SELECT new com.ssafy.hamtteukka.dto.FeedResponseDto(f.id, fi.id, f.title, f.user.profileId)
               FROM Feed f
               LEFT JOIN f.savedFeeds sf
               LEFT JOIN f.feedImages fi
               JOIN f.user u
               WHERE (f.user.id = :userId OR sf.user.id = :userId)
               AND (f.feedType = 1 AND fi.imageType = 0)
               AND (:keyword IS NULL OR f.title LIKE %:keyword%)
               AND (:cursor IS NULL OR f.id < :cursor)
               ORDER BY f.id DESC
            """)
    Slice<FeedResponseDto> findAiFeedsWithPagination(
            @Param("userId") Long userId,
            @Param("cursor") Long cursor,
            @Param("keyword") String keyword,
            Pageable pageable
    );

}
