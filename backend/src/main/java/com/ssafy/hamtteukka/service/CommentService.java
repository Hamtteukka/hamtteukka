package com.ssafy.hamtteukka.service;

import com.ssafy.hamtteukka.domain.Comment;
import com.ssafy.hamtteukka.domain.Feed;
import com.ssafy.hamtteukka.domain.User;
import com.ssafy.hamtteukka.dto.CommentListPaginationResponseDto;
import com.ssafy.hamtteukka.dto.CommentListResponseDto;
import com.ssafy.hamtteukka.repository.CommentRepository;
import com.ssafy.hamtteukka.repository.FeedRepository;
import com.ssafy.hamtteukka.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final FeedRepository feedRepository;

    /**
     * 댓글 작성
     *
     * @param userId
     * @param feedId
     * @param content
     * @param parentCommentId
     * @return
     */
    @Transactional
    public Comment createComment(Long userId, Long feedId, String content, Long parentCommentId) {
        // 1. 유저 존재 여부 확인
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다"));

        // 2. 피드 존재 여부 확인
        Feed feed = feedRepository.findById(feedId)
                .orElseThrow(() -> new EntityNotFoundException("피드를 찾을 수 없습니다"));

        // 3. 대댓글인 경우 부모 댓글 존재 여부와 피드 일치 여부 확인
        Comment parentComment = null;
        if (parentCommentId != null) {
            parentComment = commentRepository.findById(parentCommentId)
                    .orElseThrow(() -> new EntityNotFoundException("부모 댓글을 찾을 수 없습니다"));

            // 부모 댓글의 피드와 현재 피드가 일치하는지 확인
            if (!parentComment.getFeed().getId().equals(feedId)) {
                throw new IllegalArgumentException("부모 댓글이 현재 피드의 댓글이 아닙니다");
            }
        }

        // 4. 댓글 생성 및 저장
        Comment comment = new Comment(feed, user, content, parentComment);
        return commentRepository.save(comment);
    }

    /**
     * 댓글 수정
     *
     * @param userId
     * @param commentId
     * @param content
     */
    @Transactional
    public void updateComment(Long userId, Long commentId, String content) {
        // 1. 댓글 존재 여부 확인
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new EntityNotFoundException("댓글을 찾을 수 없습니다"));

        // 2. 댓글 작성자와 요청한 사용자가 같은지 확인
        if (!comment.getUser().getId().equals(userId)) {
            throw new IllegalArgumentException("댓글을 수정할 권한이 없습니다");
        }

        // 3. 댓글 내용 수정
        comment.updateContent(content);
    }

    /**
     * 댓글 삭제
     *
     * @param userId
     * @param commentId
     */
    @Transactional
    public void deleteComment(Long userId, Long commentId) {
        // 1. 댓글 존재 여부 확인
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new EntityNotFoundException("댓글을 찾을 수 없습니다"));

        // 2. 댓글 작성자와 요청한 사용자가 같은지 확인
        if (!comment.getUser().getId().equals(userId)) {
            throw new IllegalArgumentException("댓글을 삭제할 권한이 없습니다");
        }

        // 3. 댓글 삭제 (자식 댓글도 자동으로 함께 삭제됨)
        commentRepository.delete(comment);
    }

    /**
     * 댓글 목록 조회
     * 
     * @param feedId
     * @param cursor
     * @param limit
     * @param userId
     * @return
     */
    public CommentListPaginationResponseDto getComments(Long feedId, Long cursor, Integer limit, Long userId) {
        // 전체 댓글 수 조회
        Long totalCount = commentRepository.countTotalComments(feedId);

        // 댓글이 하나도 없는 경우
        if (totalCount == 0) {
            throw new EntityNotFoundException("등록된 댓글이 없습니다.");
        }

        // 부모 댓글 조회
        List<Comment> parentComments = commentRepository.findParentComments(
                feedId,
                cursor,
                PageRequest.ofSize(limit + 1) // 다음 페이지 여부 확인을 위해 1개 더 조회
        );

        if (parentComments.isEmpty()) {
            throw new EntityNotFoundException("등록된 댓글이 없습니다.");
        }

        // 다음 페이지 여부 확인
        boolean hasNext = parentComments.size() > limit;
        if (hasNext) {
            parentComments = parentComments.subList(0, limit);
        }

        final Map<Long, List<Comment>> childCommentMap; // 부모댓글ID: [대댓글 목록]
        List<Long> parentIds = new ArrayList<>();
        for (Comment comment : parentComments) {
            Long id = comment.getId();
            parentIds.add(id);
        }

        // 대댓글 조회 후 그룹
        if (!parentIds.isEmpty()) {
            List<Comment> childComments = commentRepository.findChildComments(feedId, parentIds);
            childCommentMap = childComments.stream()
                    .collect(Collectors.groupingBy(comment ->
                            comment.getParentComment().getId()));
        } else {
            childCommentMap = new HashMap<>();
        }

        // DTO 변환
        List<CommentListResponseDto> commentDtos = parentComments.stream()
                .map(comment -> new CommentListResponseDto(
                        comment.getId(),
                        comment.getUser().getId().toString(),
                        comment.getUser().getNickname(),
                        comment.getUser().getProfileId(),
                        comment.getContent(),
                        comment.getCreateDate(),
                        comment.getUser().getId().equals(userId), // 작성자 여부
                        childCommentMap.get(comment.getId()) != null ? // 대댓글 있는 경우
                                childCommentMap.get(comment.getId()).stream()
                                        .map(child -> new CommentListResponseDto(
                                                child.getId(),
                                                child.getUser().getId().toString(),
                                                child.getUser().getNickname(),
                                                child.getUser().getProfileId(),
                                                child.getContent(),
                                                child.getCreateDate(),
                                                child.getUser().getId().equals(userId),  // 현재 사용자가 대댓글 작성자인지
                                                null // 대댓글의 대댓글은 없음
                                        ))
                                        .collect(Collectors.toList())
                                : null
                ))
                .collect(Collectors.toList());

        Long nextCursorId = hasNext ? parentComments.get(parentComments.size() - 1).getId() : null;

        return new CommentListPaginationResponseDto(totalCount, commentDtos, hasNext, nextCursorId);
    }
}
