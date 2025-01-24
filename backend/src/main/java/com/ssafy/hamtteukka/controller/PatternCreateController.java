package com.ssafy.hamtteukka.controller;

import com.ssafy.hamtteukka.dto.DotPatternCreateRequest;
import com.ssafy.hamtteukka.dto.DotPatternCreateResponse;
import com.ssafy.hamtteukka.service.PatternCreateService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
public class PatternCreateController {
    private final PatternCreateService patternCreateService;

    public PatternCreateController(PatternCreateService patternCreateService) {
        this.patternCreateService = patternCreateService;
    }

    @PostMapping(value = "/v1/dot/generate", consumes = MediaType.MULTIPART_FORM_DATA_VALUE )
    @Operation(summary = "도트 도안 FastAPI에 요청해서 받아오기")
    public Mono<DotPatternCreateResponse> generateDotPattern(@ModelAttribute DotPatternCreateRequest request) {
        return patternCreateService.createDotPattern(request);
    }
}
