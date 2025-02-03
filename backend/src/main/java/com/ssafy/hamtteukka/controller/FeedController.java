package com.ssafy.hamtteukka.controller;

import com.ssafy.hamtteukka.common.ApiResponse;
import com.ssafy.hamtteukka.service.FeedService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/feeds")
@RequiredArgsConstructor
public class FeedController {
    private final FeedService feedService;

    /**
     * 피드 삭제
     */
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
