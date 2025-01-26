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

    private final WebClient webClient;

    public PatternCreateService(WebClient.Builder webClientBuilder, @Value("${AI_URL}")String aiUrl) {
        this.webClient = webClientBuilder
                .baseUrl(aiUrl)
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
                .uri("/ai/dot")
                .bodyValue(bodyBuilder.build())
                .retrieve()
                .bodyToMono(DotPatternCreateResponse.class);
    }

    public Mono<DescriptionPatternCreateResponse> createDescription(DescriptionPatternCreateRequest request){
        return webClient.post()
                .uri("/ai/description")
                .body(Mono.just(request), DescriptionPatternCreateRequest.class)
                .retrieve()
                .bodyToMono(DescriptionPatternCreateResponse.class);
    }


}

