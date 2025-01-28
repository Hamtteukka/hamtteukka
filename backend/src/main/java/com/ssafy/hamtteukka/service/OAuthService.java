package com.ssafy.hamtteukka.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.hamtteukka.dto.KakaoInfo;
import com.ssafy.hamtteukka.repository.UserRepository;
import com.ssafy.hamtteukka.security.JwtTokenProvider;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
public class OAuthService {
    @Value("${KAKAO_CLIENT_ID}")
    private String clientId;
    @Value("${KAKAO_REDIRECT_URI}")
    private String redirectUri;
    @Value("${FRONT_URI}")
    private String frontUri;
    @Value("${DOMAIN}")
    private String domain;

    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;

    public OAuthService(
            JwtTokenProvider jwtTokenProvider,
            UserRepository userRepository
    ) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.userRepository = userRepository;
    }

    public String getKakaoConnectUrl() {
        StringBuffer url = new StringBuffer();
        url.append("https://kauth.kakao.com/oauth/authorize?");
        url.append("client_id=" + clientId);
        url.append("&redirect_uri=" + redirectUri);
        url.append("&response_type=code");
        url.append("&prompt=select_account");
        return "redirect:" + url.toString();
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

    public String handleKakaoLogin(long id, HttpServletResponse response) {
        if (userRepository.findById(id).isEmpty()) {
            response.addCookie(generateCookie(
                    "userId",
                    String.valueOf(id),
                    false,
                    false,
                    5 * 60
            ));
            return "redirect:" + frontUri + "signup";
        }
        String accessToken = jwtTokenProvider.generateJwt(id, 60);
        response.addCookie(generateCookie(
                "accessToken",
                accessToken,
                false,
                false,
                5 * 60
        ));

        String refreshToken = jwtTokenProvider.generateJwt(id, 30*24*60);
        response.addCookie(generateCookie(
                "refreshToken",
                refreshToken,
                true,
                false,
                7 * 24 * 60 * 60
        ));
        return "redirect:" + frontUri;
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
        cookie.setDomain(domain);
        cookie.setMaxAge(maxAge);
        return cookie;
    }

}
