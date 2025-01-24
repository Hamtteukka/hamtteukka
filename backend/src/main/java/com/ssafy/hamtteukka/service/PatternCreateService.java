package com.ssafy.hamtteukka.service;

import com.ssafy.hamtteukka.dto.DotPatternCreateRequest;
import com.ssafy.hamtteukka.dto.DotPatternCreateResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.client.MultipartBodyBuilder;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class PatternCreateService {
//    @Value("${AI_URL}")
//    private String aiUrl;
    // 저걸로는 아직 안됨 나중에 테스트

    private final WebClient webClient;

    public PatternCreateService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder
                .baseUrl("http://localhost:8000")
                .codecs(configurer -> configurer
                        .defaultCodecs()
                        .maxInMemorySize(10 * 1024 * 1024))
                .build();
    }

    public Mono<DotPatternCreateResponse> createDotPattern(DotPatternCreateRequest request) {
        MultipartBodyBuilder bodyBuilder = new MultipartBodyBuilder();
        bodyBuilder.part("file", request.getFile().getResource())
                .filename(request.getFile().getOriginalFilename());
        bodyBuilder.part("height", String.valueOf(request.getHeight()));
        bodyBuilder.part("width", String.valueOf(request.getWidth()));
        bodyBuilder.part("nColors", String.valueOf(request.getNColors()));
        bodyBuilder.part("background", String.valueOf(request.isBackground()));

        return webClient.post()
                .uri("/v1/dot/generate")
                .bodyValue(bodyBuilder.build())
                .retrieve()
                .bodyToMono(DotPatternCreateResponse.class);
    }
}

