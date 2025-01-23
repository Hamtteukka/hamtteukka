package com.ssafy.hamtteukka.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // 모든 URL 패턴에 대해 CORS를 적용
                .allowedOrigins("http://localhost:3000") // 요청을 허용할 domain 설정 추후 도메인 나오면 추가
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD") // 허용할 HTTP 메서드 목록 지정
                .allowedHeaders("*") // 모든 요청 헤더를 허용
                .exposedHeaders("Authorization", "Access-Control-Allow-Origin", "Access-Control-Allow-Credentials", "Set-Cookie") // 브라우저가 접근할 수 있는 응답 헤더 지정
                .allowCredentials(true) // 쿠키, 인증 정보 등을 포함한 요청을 허용
                .maxAge(3600); // Preflight 요청(OPTIONS)에 대한 응답을 브라우저가 캐싱하는 시간(초)
    }
}
