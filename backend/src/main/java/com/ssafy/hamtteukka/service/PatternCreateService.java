package com.ssafy.hamtteukka.service;

import com.ssafy.hamtteukka.dto.DescriptionPatternCreateRequest;
import com.ssafy.hamtteukka.dto.DescriptionPatternCreateResponse;
import com.ssafy.hamtteukka.dto.DotPatternCreateRequest;
import com.ssafy.hamtteukka.dto.DotPatternCreateResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.client.MultipartBodyBuilder;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class PatternCreateService {
    private final WebClient aiWebClient;
    private final WebClient dotWebClient;
    private final RateLimiterService rateLimiterService;

    public PatternCreateService(
            WebClient.Builder webClientBuilder,
            @Value("${AI_URL}") String aiUrl,
            @Value("${DOT_URL}") String dotUrl,
            RateLimiterService rateLimiterService
    ) {
        this.aiWebClient = webClientBuilder
                .baseUrl(aiUrl)
                .codecs(configurer -> configurer
                        .defaultCodecs()
                        .maxInMemorySize(10 * 1024 * 1024))
                .build();

        this.dotWebClient = webClientBuilder
                .baseUrl(dotUrl)
                .codecs(configurer -> configurer
                        .defaultCodecs()
                        .maxInMemorySize(10 * 1024 * 1024))
                .build();

        this.rateLimiterService = rateLimiterService;
    }

    public Mono<DotPatternCreateResponse> createDotPattern(DotPatternCreateRequest request,Long userId) {
        if(userId == 0) throw new IllegalArgumentException("Invalid or expired access token");
        if(!rateLimiterService.isRequestAllowed(userId)) throw new UnsupportedOperationException("today request not allowed");
        MultipartBodyBuilder bodyBuilder = new MultipartBodyBuilder();
        bodyBuilder.part("file", request.getFile().getResource())
                .filename(request.getFile().getOriginalFilename());
        bodyBuilder.part("height", String.valueOf(request.getHeight()));
        bodyBuilder.part("width", String.valueOf(request.getWidth()));
        bodyBuilder.part("nColors", String.valueOf(request.getNColors()));
        bodyBuilder.part("background", String.valueOf(request.isBackground()));

        return dotWebClient.post()
                .uri("/ai/dot")
                .bodyValue(bodyBuilder.build())
                .retrieve()
                .bodyToMono(DotPatternCreateResponse.class);
    }

    public Mono<DescriptionPatternCreateResponse> createDescription(DescriptionPatternCreateRequest request,Long userId) {
        if(userId == 0) throw new IllegalArgumentException("Invalid or expired access token");
        if(!rateLimiterService.isRequestAllowed(userId)) throw new UnsupportedOperationException("today request not allowed");
        return aiWebClient.post()
                .uri("/ai/description")
                .body(Mono.just(request), DescriptionPatternCreateRequest.class)
                .retrieve()
                .bodyToMono(DescriptionPatternCreateResponse.class);
    }


}

