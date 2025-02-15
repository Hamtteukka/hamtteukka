package com.ssafy.hamtteukka.controller;

import com.ssafy.hamtteukka.common.ApiResponse;
import com.ssafy.hamtteukka.common.Base64ToMultipartFileConverter;
import com.ssafy.hamtteukka.dto.*;
import com.ssafy.hamtteukka.service.FeedService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@Slf4j
@RestController
@RequestMapping("/feeds")
@RequiredArgsConstructor
public class FeedController {

    private final FeedService feedService;

    @GetMapping("/saved-list")
    @Operation(summary = "저장된 게시물 불러오기")
    public ResponseEntity<?> getSavedFeeds(
            Authentication authentication,
            @RequestParam(required = false) Long cursor,
            @RequestParam(defaultValue = "20") int limit) {

        try {

            Long userId = (Long) authentication.getPrincipal();
            System.out.println(userId);
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
    @Operation(summary = "저장된 AI 도안 불러오기")
    public ResponseEntity<?> getSavedAiFeeds(
            Authentication authentication,
            @RequestParam(required = false) Long cursor,
            @RequestParam(defaultValue = "20") int limit) {

        try {
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
    @Operation(summary = "피드 삭제하기")
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

    @PostMapping(value = "", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @Operation(summary = "일반 피드 생성하기")
    public ResponseEntity<?> createFeed(
            @Valid @ModelAttribute FeedCreateRequest request,
            Authentication authentication
    ) {
        try {
            if (request.getFeedType() != FeedType.NORMAL) {
                return ApiResponse.fail(HttpStatus.BAD_REQUEST, "일반 피드 생성만 가능합니다");
            }

            Long userId = (Long) authentication.getPrincipal();
            FeedCreateResponse response = feedService.createFeed(userId, request);
            return ApiResponse.success(HttpStatus.CREATED, "피드 생성 성공", response);

        } catch (IllegalArgumentException e) {
            return ApiResponse.fail(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            return ApiResponse.fail(HttpStatus.INTERNAL_SERVER_ERROR, "서버 오류가 발생했습니다");
        }
    }

    @PostMapping(value = "/pattern")
    @Operation(summary = "AI 도안 피드 생성하기")
    public ResponseEntity<?> createPatternFeed(
            @Valid @RequestBody FeedCreatePatternRequest request,
            Authentication authentication
    ) {
        try {
            Long userId = (Long) authentication.getPrincipal();

            MultipartFile convertedFile = Base64ToMultipartFileConverter.convert(
                    request.getBase64Image(),
                    "ai-pattern.png"
            );

            // categoryIds가 null이면 빈 리스트로 초기화
            List<Integer> categoryIds = request.getCategoryIds() != null ?
                    request.getCategoryIds() : new ArrayList<>();

            FeedCreateRequest feedRequest = FeedCreateRequest.builder()
                    .images(List.of(convertedFile))
                    .title(request.getTitle())
                    .content(request.getContent())
                    .categoryIds(categoryIds)
                    .feedType(FeedType.PATTERN)
                    .build();

            FeedCreateResponse response = feedService.createFeed(userId, feedRequest);
            return ApiResponse.success(HttpStatus.CREATED, "AI 도안 피드 생성 성공", response);
        } catch (IllegalArgumentException e) {
            return ApiResponse.fail(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            return ApiResponse.fail(HttpStatus.INTERNAL_SERVER_ERROR, "서버 오류가 발생했습니다");
        }
    }


    @GetMapping("/{userId}/list")
    public ResponseEntity<?> getFeedsByUserId(
            @PathVariable("userId") Long userId,
            @RequestParam(required = false) Long cursor,
            @RequestParam(defaultValue = "20") int limit) {
        try {
            return ApiResponse.success(HttpStatus.OK, "User feeds retrieved successfully",
                    feedService.getFeedsByUserId(userId, cursor, limit));
        } catch (Exception e) {
            return ApiResponse.fail(HttpStatus.BAD_REQUEST, "Bad request");
        }
    }

    @GetMapping("/{userId}/ai-list")
    public ResponseEntity<?> getAIFeedsByUserId(
            @PathVariable("userId") Long userId,
            @RequestParam(required = false) Long cursor,
            @RequestParam(defaultValue = "20") int limit) {
        try {
            return ApiResponse.success(HttpStatus.OK, "User ai feeds retrieved successfully",
                    feedService.getAIFeedsByUserId(userId, cursor, limit));
        } catch (Exception e) {
            return ApiResponse.fail(HttpStatus.BAD_REQUEST, "Bad request");
        }
    }

    @GetMapping("/{feedId}")
    @Operation(summary = "피드 상세조회")
    public ResponseEntity<?> getFeedDetail(
            @PathVariable Long feedId,
            Authentication authentication
    ) {
        try {
            Long userId = (Long) authentication.getPrincipal();
            FeedDetailResponse response = feedService.getFeedDetail(userId, feedId);
            return ApiResponse.success(HttpStatus.OK, "피드 상세 조회 성공", response);

        } catch (EntityNotFoundException e) {
            return ApiResponse.fail(HttpStatus.NOT_FOUND, e.getMessage());
        } catch (Exception e) {
            return ApiResponse.fail(HttpStatus.INTERNAL_SERVER_ERROR, "서버 오류가 발생했습니다");
        }
    }

    @GetMapping("/search")
    @Operation(summary = "홈 피드 조회")
    public ResponseEntity<?> searchFeeds(
            @RequestParam(required = false) Long cursor,
            @RequestParam(defaultValue = "20") int limit,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) List<Integer> categoryIds
    ) {
        try {
            FeedPaginationResponseDto response = feedService.searchFeeds(cursor, limit, keyword, categoryIds);
            return ApiResponse.success(HttpStatus.OK, "피드 검색 성공", response);
        } catch (Exception e) {
            return ApiResponse.fail(HttpStatus.INTERNAL_SERVER_ERROR, "서버 오류가 발생했습니다");
        }
    }

    @PostMapping("/scrap")
    @Operation(summary = "피드저장 on/off (스크랩)")
    public ResponseEntity<?> feedOnOff(
            Authentication authentication,
            @RequestBody ScrapRequest request){ // Dto 설정해야함

        try{
            Long userId = (Long) authentication.getPrincipal();

            if (userId == 0L) {
                return ApiResponse.fail(HttpStatus.UNAUTHORIZED, "사용자 인증 정보가 없습니다");
            }

            boolean scrapStatus = feedService.toggleFeedSave(userId,request.getFeedId(),request.isScrap());
            Map<String, Object> response = new HashMap<>();
            response.put("isScrap",scrapStatus);
            if(scrapStatus){
                return ApiResponse.success(HttpStatus.OK,"피드 저장 ON", response);
            } else {
                return ApiResponse.success(HttpStatus.OK, "피드 저장 OFF", response);
            }
        } catch (EntityNotFoundException e) {
            return ApiResponse.fail(HttpStatus.NOT_FOUND, e.getMessage());
        } catch (Exception e) {
            return ApiResponse.fail(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }


    }

    @GetMapping("/ai-embed")
    public ResponseEntity<?> getAIFeeds(
            @RequestParam(required = false) Long cursor,
            @RequestParam(defaultValue = "20") int limit,
            @RequestParam(required = false) String keyword,
            Authentication authentication
    ){
        try {
            Long userId = (Long) authentication.getPrincipal();
            return ApiResponse.success(
                    HttpStatus.OK,
                    "success",
                    feedService.searchAiFeeds(userId,cursor,limit,keyword)
            );
        }catch (IllegalArgumentException e) {
            return ApiResponse.fail(HttpStatus.FORBIDDEN, e.getMessage());
        }catch (Exception e) {
            return ApiResponse.fail(HttpStatus.BAD_REQUEST, "Bad request");
        }
    }
}
