package com.ssafy.hamtteukka.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.hamtteukka.dto.KakaoInfo;
import com.ssafy.hamtteukka.service.OAuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Controller
@RequestMapping("/auth/")
public class OAuthController {
    private final OAuthService oAuthService;
    public OAuthController(OAuthService oAuthService) {
        this.oAuthService = oAuthService;
    }


    @PostMapping("kakao")
    public String kakaoCallback(String code, HttpServletResponse response) {
        log.info("kakao callback - Authorization code: {}", code);

        try {
            String accessToken = oAuthService.getAccessToken(code);
            log.info("Successfully issued access token: {}", accessToken);

            KakaoInfo kakaoInfo = oAuthService.getKakaoInfo(accessToken);
            log.info("Kakao User Information Inquiry Successful - userId: {}", kakaoInfo.getId());

            return oAuthService.handleKakaoLogin(kakaoInfo.getId(), response);
        } catch (JsonProcessingException e) {
            log.error("Failed to issue kakao access token", e);
            throw new RuntimeException(e);
        }
    }
}
