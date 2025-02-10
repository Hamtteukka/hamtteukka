package com.ssafy.hamtteukka.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.hamtteukka.domain.User;
import com.ssafy.hamtteukka.dto.KakaoInfo;
import com.ssafy.hamtteukka.dto.UserResponseDto;
import com.ssafy.hamtteukka.repository.UserRepository;
import com.ssafy.hamtteukka.security.JwtTokenProvider;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.Map;
import java.util.Optional;

@Slf4j
@Service
public class OAuthService {
    @Value("${KAKAO_CLIENT_ID}")
    private String clientId;
    @Value("${KAKAO_REDIRECT_URI}")
    private String redirectUri;

    private final JwtTokenProvider jwtTokenProvider;
    private final TokenBlacklistService tokenBlacklistService;
    private final UserRepository userRepository;
    private final RateLimiterService rateLimiterService;

    public OAuthService(
            JwtTokenProvider jwtTokenProvider,
            TokenBlacklistService tokenBlacklistService,
            UserRepository userRepository,
            RateLimiterService rateLimiterService
    ) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.tokenBlacklistService = tokenBlacklistService;
        this.userRepository = userRepository;
        this.rateLimiterService = rateLimiterService;
    }

    public String kakaoLoginUrl() {
        StringBuffer url = new StringBuffer();
        url.append("https://kauth.kakao.com/oauth/authorize?");
        url.append("client_id="+clientId);
        url.append("&redirect_uri="+redirectUri);
        url.append("&response_type=code");
        url.append("&prompt=select_account");
        return url.toString();
    }


    /**
     * kakao Authorization code 체크 후 accessToken 발급 요청 method
     *
     * @param code
     * @return kakao에서 발급해준 accessToken
     * @throws JsonProcessingException
     */
    public String getAccessToken(String code) throws JsonProcessingException {
        // HTTP Header 생성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // HTTP Body 생성
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", "authorization_code");
        body.add("client_id", clientId);
        body.add("redirect_uri", redirectUri);
        body.add("code", code);

        // HTTP 요청 보내기
        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(body, headers);
        RestTemplate rt = new RestTemplate();
        ResponseEntity<String> response = rt.exchange(
                "https://kauth.kakao.com/oauth/token",
                HttpMethod.POST,
                kakaoTokenRequest,
                String.class
        );

        // HTTP 응답 (JSON) -> 액세스 토큰 파싱
        String responseBody = response.getBody();
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(responseBody);

        return jsonNode.get("access_token").asText();
    }

    public KakaoInfo getKakaoInfo(String accessToken) throws JsonProcessingException {
        // HTTP Header 생성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // HTTP 요청 보내기
        HttpEntity<MultiValueMap<String, String>> kakaoUserInfoRequest = new HttpEntity<>(headers);
        RestTemplate rt = new RestTemplate();
        ResponseEntity<String> response = rt.exchange(
                "https://kapi.kakao.com/v2/user/me",
                HttpMethod.POST,
                kakaoUserInfoRequest,
                String.class
        );

        // responseBody에 있는 정보 꺼내기
        String responseBody = response.getBody();
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(responseBody);
        long id = jsonNode.get("id").asLong();
        String nickname = jsonNode.get("properties")
                .get("nickname").asText();
        String profileImage = jsonNode.get("properties").get("profile_image").asText();
        return new KakaoInfo(id, nickname, profileImage);
    }

    /**
     * 카카오 로그인 처리 메서드
     *
     * @param id        카카오 로그인으로 받은 사용자 ID
     * @param response  HTTP 응답 객체: 쿠키를 설정하기 위해 사용
     * @return          사용자의 회원 여부에 따라 리디렉션할 URL을 포함하는 Map 객체
     *
     * 1. 비회원인 경우
     *    - 5분 유효기간의 `idToken`을 생성하고 httpOnly 쿠키로 설정
     *    - 회원가입 페이지 URL을 리턴
     * 2. 회원인 경우
     *    - 1시간 유효기간의 `accessToken`을 생성하고 httpOnly 쿠키로 설정
     *    - 7일 유효기간의 `refreshToken`을 생성하고 httpOnly 쿠키로 설정
     *    - 메인 페이지 URL을 리턴
     */
    public Map<String,Object> handleKakaoLogin(long id, HttpServletResponse response) {
        Optional<User> user = userRepository.findByKakaoId(id);
        if (user.isEmpty()) {
            String idToken = jwtTokenProvider.generateJwt(id,5);
            log.info("idToken: " + idToken);
            response.addCookie(generateCookie(
                    "idToken",
                    idToken,
                    true,
                    false,
                    5 * 60
            ));
            log.info("👍👍👍👍👍👍👍👍");
            return Map.of(
                    "url", "/auth/signup"
            );
        }
        String accessToken = jwtTokenProvider.generateJwt(user.get().getId(), 60);
        log.info("accessToken: " + accessToken);
        response.addCookie(generateCookie(
                "accessToken",
                accessToken,
                true,
                false,
                60 * 60
        ));

        String refreshToken = jwtTokenProvider.generateJwt(user.get().getId(), 30*24*60);
        log.info("refreshToken: " + refreshToken);
        response.addCookie(generateCookie(
                "refreshToken",
                refreshToken,
                true,
                false,
                7 * 24 * 60 * 60
        ));
        return Map.of(
                "url", "/",
                "user", new UserResponseDto(
                        0,
                        user.get().getNickname(),
                        user.get().getProfileId(),
                        rateLimiterService.getRequestCount(user.get().getId())
                )
        );
    }

    /**
     * 로그아웃 처리
     * - accessToken, refreshToken 블랙리스트 추가 및 쿠키 삭제
     * @param request
     * @param response
     */
    public void logout(HttpServletRequest request,HttpServletResponse response) {
        String accessToken = getCookie(request, "accessToken");
        if (accessToken != null && jwtTokenProvider.validToken(accessToken)) {
            long expirationTime = jwtTokenProvider.getExpiration(accessToken);
            tokenBlacklistService.addToBlacklist(accessToken, expirationTime);
        }

        String refreshToken = getCookie(request, "refreshToken");
        if (refreshToken != null && jwtTokenProvider.validToken(refreshToken)) {
            long refreshTokenExpiration = jwtTokenProvider.getExpiration(refreshToken);
            tokenBlacklistService.addToBlacklist(refreshToken, refreshTokenExpiration);
        }
        response.addCookie(generateCookie(
                "accessToken",
                null,
                true,
                false,
                0
        ));
        response.addCookie(generateCookie(
                "refreshToken",
                null,
                true,
                false,
                0
        ));
    }

    public void createNewAccessToken(HttpServletRequest request, HttpServletResponse response) {
        String refreshToken = getCookie(request, "refreshToken");
        if (refreshToken == null || !jwtTokenProvider.validToken(refreshToken)) {
            throw new IllegalArgumentException("no refreshToken or invalid refreshToken");
        }
        long id = jwtTokenProvider.getIdFromToken(refreshToken);
        String accessToken = jwtTokenProvider.generateJwt(id, 60);
        log.info("new accessToken: " + accessToken);
        response.addCookie(generateCookie(
                "accessToken",
                accessToken,
                true,
                false,
                60 * 60
        ));
    }

    /**
     * Cookie 생성 메서드
     *
     * @param name
     * @param value
     * @param httpOnly
     * @param secure
     * @param maxAge 초단위
     * @return
     */
    private Cookie generateCookie(String name, String value, boolean httpOnly, boolean secure, int maxAge) {
        Cookie cookie = new Cookie(name, value);
        cookie.setHttpOnly(httpOnly);
        cookie.setSecure(secure);
        cookie.setPath("/");
        cookie.setMaxAge(maxAge);
        return cookie;
    }

    /**
     * 쿠키 값 가져오는 메서드
     * @param request
     * @param name 가지고올 쿠키 이름
     * @return 쿠키 값
     */
    private String getCookie(HttpServletRequest request, String name) {
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if (name.equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }
}
