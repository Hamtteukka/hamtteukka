package com.ssafy.hamtteukka.controller;

import com.ssafy.hamtteukka.common.ApiResponse;
import com.ssafy.hamtteukka.dto.SavedFeedPaginationResponseDto;
import com.ssafy.hamtteukka.security.JwtTokenProvider;
import com.ssafy.hamtteukka.service.FeedService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/feeds")
@RequiredArgsConstructor
public class FeedController {

    private final FeedService feedService;
    private final JwtTokenProvider jwtTokenProvider;

    @GetMapping("/saved-list")
    public ResponseEntity<ApiResponse<SavedFeedPaginationResponseDto>> getSavedFeeds(
            Authentication authentication,
            @RequestParam(required = false) Long cursor,
            @RequestParam(defaultValue = "20") int limit) {

        try{
            
            Long userId = (Long) authentication.getPrincipal();

            if (userId == 0L) {
                return ApiResponse.fail(HttpStatus.UNAUTHORIZED, "사용자 인증 정보가 없습니다");
            }

            return ApiResponse.success(
                    HttpStatus.OK,
                    "User saved feeds retrieved successfully",
                    feedService.getSavedFeeds(userId, cursor, limit)
            );
        } catch (EntityNotFoundException e) {
            return ApiResponse.fail(HttpStatus.NOT_FOUND, e.getMessage());
        } catch (IllegalArgumentException e) {
            return ApiResponse.fail(HttpStatus.FORBIDDEN, e.getMessage());
        } catch (Exception e) {
            return ApiResponse.fail(HttpStatus.INTERNAL_SERVER_ERROR, "서버 오류가 발생했습니다");
        }
    }

    @GetMapping("/saved-ai-list")
    public ResponseEntity<ApiResponse<SavedFeedPaginationResponseDto>> getSavedAiFeeds(
            Authentication authentication,
            @RequestParam(required = false) Long cursor,
            @RequestParam(defaultValue = "20") int limit) {

        try{
            Long userId = (Long) authentication.getPrincipal();

            if (userId == 0L) {
                return ApiResponse.fail(HttpStatus.UNAUTHORIZED, "사용자 인증 정보가 없습니다");
            }

            return ApiResponse.success(
                    HttpStatus.OK,
                    "User saved feeds retrieved successfully",
                    feedService.getSavedAiFeeds(userId, cursor, limit)
            );
        } catch (EntityNotFoundException e) {
            return ApiResponse.fail(HttpStatus.NOT_FOUND, e.getMessage());
        } catch (IllegalArgumentException e) {
            return ApiResponse.fail(HttpStatus.FORBIDDEN, e.getMessage());
        } catch (Exception e) {
            return ApiResponse.fail(HttpStatus.INTERNAL_SERVER_ERROR, "서버 오류가 발생했습니다");
        }
    }

    @DeleteMapping("/{feedId}")
    public ResponseEntity<?> deleteFeed(
            @PathVariable("feedId") Long feedId,
            Authentication authentication
    ) {
        try {
            Long userId = (Long) authentication.getPrincipal();
            feedService.deleteFeed(userId, feedId);
            return ApiResponse.success(HttpStatus.OK, "피드 삭제 성공");

        } catch (EntityNotFoundException e) {
            return ApiResponse.fail(HttpStatus.NOT_FOUND, e.getMessage());
        } catch (IllegalArgumentException e) {
            return ApiResponse.fail(HttpStatus.FORBIDDEN, e.getMessage());
        } catch (Exception e) {
            return ApiResponse.fail(HttpStatus.INTERNAL_SERVER_ERROR, "서버 오류가 발생했습니다");
        }
    }

    /**
     * 피드 저장(on/off)
     */

    /**
     * 피드 수정(후순위)
     */
}
