package com.ssafy.hamtteukka.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.hamtteukka.common.ApiResponse;
import com.ssafy.hamtteukka.dto.KakaoInfo;
import com.ssafy.hamtteukka.service.OAuthService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/auth/")
public class OAuthController {
    private final OAuthService oAuthService;
    public OAuthController(OAuthService oAuthService) {
        this.oAuthService = oAuthService;
    }

    /**
     * 로컬 테스트용 kakao 로그인 요청 API
     * @param response
     * @throws IOException
     */
    @GetMapping(value="kakao-login")
    public void kakaoConnect(HttpServletResponse response) throws IOException {
        response.sendRedirect(oAuthService.kakaoLoginUrl());
    }

    /**
     * 백앤드 로컬 테스트용 요청
     * Kakao Development에서 설정한 요청 url
     * @param code
     * @param request
     * @param response
     */
    @GetMapping("test-kakao-login")
    public void kakaoCallback(String code, HttpServletRequest request, HttpServletResponse response) {
        kakaoCallback(Map.of("code",code),response);
    }

    @PostMapping("kakao")
    public ResponseEntity<?> kakaoCallback(@RequestBody Map<String, String> requestBody, HttpServletResponse response) {
        try {
            String code = requestBody.get("code");
            log.info("kakao callback - Authorization code: {}", code);

            String accessToken = oAuthService.getAccessToken(code);
            log.info("Successfully issued access token: {}", accessToken);

            KakaoInfo kakaoInfo = oAuthService.getKakaoInfo(accessToken);
            log.info("Kakao User Information Inquiry Successful - userId: {}", kakaoInfo.getId());
            return ApiResponse.success(
                    HttpStatus.FOUND,
                    "",
                    oAuthService.handleKakaoLogin(kakaoInfo.getId(), response)
            );
        } catch (IOException e) {
            log.error("Failed to issue kakao access token", e);
            return ApiResponse.fail(
                    HttpStatus.BAD_REQUEST,
                    "Bad Request"
            );
        }
    }

    @GetMapping("logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
        try {
            oAuthService.logout(request, response);
            return ApiResponse.success(HttpStatus.OK,"Logout successful");
        } catch (Exception e) {
            log.error(e.getMessage());
            return ApiResponse.fail(HttpStatus.BAD_REQUEST,"Bad Request");
        }
    }

    @PostMapping("access-token")
    public ResponseEntity<?> reissueAccessToken(HttpServletRequest request, HttpServletResponse response) {
        try {
            oAuthService.createNewAccessToken(request, response);
            return ApiResponse.success(HttpStatus.OK,"Access token refreshed successfully");
        }catch (IllegalArgumentException ie){
            return ApiResponse.fail(HttpStatus.UNAUTHORIZED,"Invalid or expired refresh token");
        }catch (Exception e) {
            return ApiResponse.fail(HttpStatus.BAD_REQUEST,"Bad Request");
        }
    }
}
