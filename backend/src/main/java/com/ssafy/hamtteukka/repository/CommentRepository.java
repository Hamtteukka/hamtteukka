package com.ssafy.hamtteukka.repository;

import com.ssafy.hamtteukka.domain.Comment;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    /**
     * 부모 댓글 조회
     *
     * @param feedId
     * @param cursorId
     * @param pageable
     * @return
     */
    @Query("SELECT DISTINCT c FROM Comment c " +
            "JOIN FETCH c.user " +
            "WHERE c.feed.id = :feedId " +
            "AND c.parentComment IS NULL " + // 부모 댓글만 조회
            "AND (:cursorId IS NULL OR c.id < :cursorId) " +
            "ORDER BY c.createDate ASC")
    List<Comment> findParentComments(
            @Param("feedId") Long feedId,
            @Param("cursorId") Long cursorId,
            Pageable pageable
    );

    /**
     * 대댓글 조회
     *
     * @param feedId
     * @param parentIds
     * @return
     */
    @Query("SELECT DISTINCT c FROM Comment c " +
            "JOIN FETCH c.user " +
            "JOIN FETCH c.parentComment " +
            "WHERE c.feed.id = :feedId " +
            "AND c.parentComment.id IN :parentIds " +
            "ORDER BY c.createDate ASC")
    List<Comment> findChildComments(
            @Param("feedId") Long feedId,
            @Param("parentIds") List<Long> parentIds
    );

    /**
     * 전체 댓글 수 조회
     *
     * @param feedId
     * @return
     */
    @Query("SELECT COUNT(c) FROM Comment c WHERE c.feed.id = :feedId")
    Long countTotalComments(@Param("feedId") Long feedId);
}
