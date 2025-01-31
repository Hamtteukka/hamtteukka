package com.ssafy.hamtteukka.service;

import com.ssafy.hamtteukka.common.S3FileLoader;
import com.ssafy.hamtteukka.domain.User;
import com.ssafy.hamtteukka.repository.UserRepository;
import com.ssafy.hamtteukka.security.JwtTokenProvider;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Slf4j
@Service
public class UserService {
    @Value("${DOMAIN}")
    private String domain;

    private final UserRepository userRepository;
    private final S3FileLoader s3FileLoader;
    private final JwtTokenProvider jwtTokenProvider;

    public UserService(
            UserRepository userRepository,
            S3FileLoader s3FileLoader,
            JwtTokenProvider jwtTokenProvider
    ) {
        this.userRepository = userRepository;
        this.s3FileLoader = s3FileLoader;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    /**
     * 닉네임 중복 여부 확인
     *
     * @param nickname 닉네임
     * @return 중복 여부
     */
    public boolean isNicknameDuplicate(String nickname) {
        return userRepository.existsByNickname(nickname);
    }

    /**
     * 회원가입 처리
     *
     * @param nickname
     * @param profileImage
     * @param request
     * @return DB에 등록된 사용자 엔티티
     */
    @Transactional
    public Map<String,String> registerUser(String nickname, MultipartFile profileImage, HttpServletRequest request, HttpServletResponse response) throws IOException {
        if (isNicknameDuplicate(nickname)) {
            throw new IllegalArgumentException("nickname already exists");
        }
        log.info("Registering user {}", nickname);
        String idToken = getCookie(request,"idToken");
        if (idToken == null|| !jwtTokenProvider.validToken(idToken)) {
            throw new IllegalArgumentException("no idCookie or invalid idToken");
        }
        log.info("idToken {}", idToken);
        long userId = jwtTokenProvider.getIdFromToken(idToken);
        response.addCookie(generateCookie(
                "idToken",
                null,
                true,
                false,
                0
        ));
        String profileId = s3FileLoader.uploadFile(profileImage);

        User user = new User(
                userId,
                nickname,
                profileId
        );

        user = userRepository.save(user);
        String accessToken = jwtTokenProvider.generateJwt(userId, 60);
        log.info("accessToken: " + accessToken);
        response.addCookie(generateCookie(
                "accessToken",
                accessToken,
                true,
                false,
                60 * 60
        ));

        String refreshToken = jwtTokenProvider.generateJwt(userId, 30*24*60);
        log.info("refreshToken: " + refreshToken);
        response.addCookie(generateCookie(
                "refreshToken",
                refreshToken,
                true,
                false,
                7 * 24 * 60 * 60
        ));
        return Map.of(
                "nickname",nickname,
                profileId,s3FileLoader.getFileUrl(profileId)
        );
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
}
