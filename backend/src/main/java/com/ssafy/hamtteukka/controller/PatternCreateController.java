package com.ssafy.hamtteukka.controller;

import com.ssafy.hamtteukka.dto.DescriptionPatternCreateRequest;
import com.ssafy.hamtteukka.dto.DescriptionPatternCreateResponse;
import com.ssafy.hamtteukka.dto.DotPatternCreateRequest;
import com.ssafy.hamtteukka.dto.DotPatternCreateResponse;
import com.ssafy.hamtteukka.service.PatternCreateService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.async.DeferredResult;
import reactor.core.publisher.Mono;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
public class PatternCreateController {
    private final PatternCreateService patternCreateService;

    public PatternCreateController(PatternCreateService patternCreateService) {
        this.patternCreateService = patternCreateService;
    }

    @PostMapping(value = "/ai/dot", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "도트 도안 FastAPI에 요청해서 받아오기")
    public Mono<ResponseEntity<Map<String, Object>>> generateDotPattern(@ModelAttribute DotPatternCreateRequest request) {
        return patternCreateService.createDotPattern(request)
                .map(response -> {
                    Map<String, Object> successResponse = new LinkedHashMap<>();
                    successResponse.put("status", "200");
                    successResponse.put("message", "도트 도안 생성 성공");
                    successResponse.put("data", response); // DotPatternCreateResponse 객체 포함
                    return ResponseEntity.ok(successResponse);
                })
                .defaultIfEmpty(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(Map.of(
                                "status", "500",
                                "message", "도트 도안 생성 실패"
                        )));
    }

    @PostMapping("/ai/description")
    @Operation(summary = "서술형 도안 FastAPI에 요청해서 받아오기")
    public DeferredResult<ResponseEntity<Map<String, Object>>> generateDescriptionPattern(@RequestBody DescriptionPatternCreateRequest request) {
        DeferredResult<ResponseEntity<Map<String, Object>>> output = new DeferredResult<>(300000L); // 5분 타임아웃

        patternCreateService.createDescription(request)
                .subscribe(response -> {
                    Map<String, Object> successResponse = new LinkedHashMap<>();
                    successResponse.put("status", "200");
                    successResponse.put("message", "서술형 도안 생성 성공");
                    successResponse.put("data", response); // DescriptionPatternCreateResponse 객체 포함
                    output.setResult(ResponseEntity.ok(successResponse));
                }, error -> {
                    Map<String, Object> errorResponse = new LinkedHashMap<>();
                    errorResponse.put("status", "500");
                    errorResponse.put("message", "서술형 도안 생성 실패");
                    output.setResult(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse));
                });

        output.onTimeout(() -> {
            Map<String, Object> timeoutResponse = new LinkedHashMap<>();
            timeoutResponse.put("status", "408");
            timeoutResponse.put("message", "요청이 타임아웃되었습니다");
            output.setResult(ResponseEntity.status(HttpStatus.REQUEST_TIMEOUT).body(timeoutResponse));
        });

        return output;
    }

}
