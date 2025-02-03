package com.ssafy.hamtteukka.service;

import com.ssafy.hamtteukka.domain.Comment;
import com.ssafy.hamtteukka.domain.Feed;
import com.ssafy.hamtteukka.domain.User;
import com.ssafy.hamtteukka.repository.CommentRepository;
import com.ssafy.hamtteukka.repository.FeedRepository;
import com.ssafy.hamtteukka.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final FeedRepository feedRepository;

    //댓글 생성
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

    //댓글 수정
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

    //댓글 삭제
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
}
