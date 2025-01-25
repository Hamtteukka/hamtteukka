package com.ssafy.hamtteukka.controller;

import com.ssafy.hamtteukka.dto.DescriptionPatternCreateRequest;
import com.ssafy.hamtteukka.dto.DescriptionPatternCreateResponse;
import com.ssafy.hamtteukka.dto.DotPatternCreateRequest;
import com.ssafy.hamtteukka.dto.DotPatternCreateResponse;
import com.ssafy.hamtteukka.service.PatternCreateService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.async.DeferredResult;
import reactor.core.publisher.Mono;

@RestController
public class PatternCreateController {
    private final PatternCreateService patternCreateService;

    public PatternCreateController(PatternCreateService patternCreateService) {
        this.patternCreateService = patternCreateService;
    }

    @PostMapping(value = "/ai/dot", consumes = MediaType.MULTIPART_FORM_DATA_VALUE )
    @Operation(summary = "도트 도안 FastAPI에 요청해서 받아오기")
    public Mono<DotPatternCreateResponse> generateDotPattern(@ModelAttribute DotPatternCreateRequest request) {
        return patternCreateService.createDotPattern(request);
    }

    @PostMapping("/ai/description")
    @Operation(summary="서술형 도안 FastAPI에 요청해서 받아오기")
    public DeferredResult<DescriptionPatternCreateResponse> generateDescriptionPattern(@RequestBody DescriptionPatternCreateRequest request) {
        DeferredResult<DescriptionPatternCreateResponse> output = new DeferredResult<>(300000L); // 5분 타임아웃

        patternCreateService.createDescription(request)
                .subscribe(response -> output.setResult(response), // 성공 시 결과 반환
                        error -> output.setErrorResult(error)); // 실패 시 에러 반환

        return output;
    }
}
