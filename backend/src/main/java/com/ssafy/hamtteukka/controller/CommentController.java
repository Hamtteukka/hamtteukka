package com.ssafy.hamtteukka.controller;

import com.ssafy.hamtteukka.common.ApiResponse;
import com.ssafy.hamtteukka.domain.Comment;
import com.ssafy.hamtteukka.dto.CommentListPaginationResponseDto;
import com.ssafy.hamtteukka.dto.CommentRequest;
import com.ssafy.hamtteukka.dto.CommentResponse;
import com.ssafy.hamtteukka.dto.CommentUpdateRequest;
import com.ssafy.hamtteukka.service.CommentService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/comments")
public class CommentController {
    private final CommentService commentService;

    @PostMapping("")
    @Operation(summary = "댓글 작성하기")
    public ResponseEntity<?> createComment(
            @RequestBody CommentRequest request,
            Authentication authentication
    ) {
        try {
            Long userId = (Long) authentication.getPrincipal();
            Comment savedComment = commentService.createComment(
                    userId,
                    request.getFeedId(),
                    request.getContent(),
                    request.getParentCommentId()
            );

            CommentResponse response = new CommentResponse(savedComment.getId());
            return ApiResponse.success(HttpStatus.CREATED, "댓글 작성 성공", response);

        } catch (IllegalArgumentException e) {
            return ApiResponse.fail(HttpStatus.UNAUTHORIZED, e.getMessage());
        } catch (EntityNotFoundException e) {
            return ApiResponse.fail(HttpStatus.NOT_FOUND, e.getMessage());
        } catch (Exception e) {
            return ApiResponse.fail(HttpStatus.INTERNAL_SERVER_ERROR, "서버 오류가 발생했습니다");
        }
    }

    @GetMapping("/{feedId}")
    @Operation(summary = "댓글 목록 조회하기")
    public ResponseEntity<?> getComments(
            @PathVariable Long feedId,
            @RequestParam(required = false) Long cursor,
            @RequestParam(defaultValue = "10") Integer limit,
            Authentication authentication
    ) {
        try {
            Long userId = (Long) authentication.getPrincipal();
            CommentListPaginationResponseDto response = commentService.getComments(feedId, cursor, limit, userId);
            return ApiResponse.success(HttpStatus.OK, "댓글 목록 조회 성공", response);
        } catch (EntityNotFoundException e) {
            return ApiResponse.fail(HttpStatus.NOT_FOUND, e.getMessage());
        } catch (Exception e) {
            return ApiResponse.fail(HttpStatus.INTERNAL_SERVER_ERROR, "서버 오류가 발생했습니다");
        }
    }

    /**
     * 댓글 수정(후순위)
     */
    @PutMapping("/{commentId}")
    @Operation(summary = "댓글 수정하기")
    public ResponseEntity<?> updateComment(
            @PathVariable("commentId") Long commentId,
            @RequestBody CommentUpdateRequest request,
            Authentication authentication
    ) {
        try {
            Long userId = (Long) authentication.getPrincipal();
            commentService.updateComment(userId, commentId, request.getContent());
            return ApiResponse.success(HttpStatus.OK, "댓글 수정 성공");

        } catch (EntityNotFoundException e) {
            return ApiResponse.fail(HttpStatus.NOT_FOUND, e.getMessage());
        } catch (IllegalArgumentException e) {
            return ApiResponse.fail(HttpStatus.FORBIDDEN, e.getMessage());
        } catch (Exception e) {
            return ApiResponse.fail(HttpStatus.INTERNAL_SERVER_ERROR, "서버 오류가 발생했습니다");
        }
    }

    @DeleteMapping("/{commentId}")
    @Operation(summary = "댓글 삭제하기")
    public ResponseEntity<?> deleteComment(
            @PathVariable("commentId") Long commentId,
            Authentication authentication
    ) {
        try {
            Long userId = (Long) authentication.getPrincipal();
            commentService.deleteComment(userId, commentId);
            return ApiResponse.success(HttpStatus.OK, "댓글 삭제 성공");

        } catch (EntityNotFoundException e) {
            return ApiResponse.fail(HttpStatus.NOT_FOUND, e.getMessage());
        } catch (IllegalArgumentException e) {
            return ApiResponse.fail(HttpStatus.FORBIDDEN, e.getMessage());
        } catch (Exception e) {
            return ApiResponse.fail(HttpStatus.INTERNAL_SERVER_ERROR, "서버 오류가 발생했습니다");
        }
    }
}
