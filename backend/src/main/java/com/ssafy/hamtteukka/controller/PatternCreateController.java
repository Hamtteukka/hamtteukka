package com.ssafy.hamtteukka.controller;

import com.ssafy.hamtteukka.common.ApiResponse;
import com.ssafy.hamtteukka.dto.DescriptionPatternCreateRequest;
import com.ssafy.hamtteukka.dto.DescriptionPatternCreateResponse;
import com.ssafy.hamtteukka.dto.DotPatternCreateRequest;
import com.ssafy.hamtteukka.dto.DotPatternCreateResponse;
import com.ssafy.hamtteukka.service.PatternCreateService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.async.DeferredResult;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/ai")
@RequiredArgsConstructor
public class PatternCreateController {

    private final PatternCreateService patternCreateService;

    @PostMapping(value = "/dot", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "도트 도안 FastAPI에 요청해서 받아오기")
    public Mono<ResponseEntity<ApiResponse<DotPatternCreateResponse>>> generateDotPattern(
            @ModelAttribute DotPatternCreateRequest request,
            Authentication authentication) {
        Long userId = (Long) authentication.getPrincipal();
        System.out.println("이거 들어오면 되는거 ");
        return patternCreateService.createDotPattern(request)
                .map(response ->
                        ApiResponse.success(HttpStatus.OK, "도트 도안 생성 성공", response)
                )
                .switchIfEmpty(Mono.just(
                        ApiResponse.fail(HttpStatus.INTERNAL_SERVER_ERROR, "도트 도안 생성 실패"))
                )
                .onErrorResume(EntityNotFoundException.class, e ->
                        Mono.just(ApiResponse.fail(HttpStatus.NOT_FOUND, e.getMessage()))
                )
                .onErrorResume(IllegalArgumentException.class, e ->
                        Mono.just(ApiResponse.fail(HttpStatus.FORBIDDEN, e.getMessage()))
                )
                .onErrorResume(Exception.class, e ->
                        Mono.just(ApiResponse.fail(HttpStatus.INTERNAL_SERVER_ERROR, "서버 오류가 발생했습니다"))
                );
    }

    @PostMapping("/description")
    @Operation(summary = "서술형 도안 FastAPI에 요청해서 받아오기")
    public DeferredResult<ResponseEntity<ApiResponse<DescriptionPatternCreateResponse>>> generateDescriptionPattern(
            @RequestBody DescriptionPatternCreateRequest request,
            Authentication authentication) {

        Long userId = (Long) authentication.getPrincipal();

        DeferredResult<ResponseEntity<ApiResponse<DescriptionPatternCreateResponse>>> output =
                new DeferredResult<>(300000L);

        patternCreateService.createDescription(request)
                .subscribe(
                        response -> {
                            output.setResult(ApiResponse.success(HttpStatus.OK, "서술형 도안 생성 성공", response));
                        },
                        error -> {
                            if (error instanceof EntityNotFoundException) {
                                output.setResult(ApiResponse.fail(HttpStatus.NOT_FOUND, error.getMessage()));
                            } else if (error instanceof IllegalArgumentException) {
                                output.setResult(ApiResponse.fail(HttpStatus.FORBIDDEN, error.getMessage()));
                            } else {
                                output.setResult(ApiResponse.fail(HttpStatus.INTERNAL_SERVER_ERROR, "서술형 도안 생성 실패"));
                            }
                        }
                );

        output.onTimeout(() -> {
            output.setResult(ApiResponse.fail(HttpStatus.REQUEST_TIMEOUT, "요청이 타임아웃되었습니다"));
        });

        return output;
    }

}
