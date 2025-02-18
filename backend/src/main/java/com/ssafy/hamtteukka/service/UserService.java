package com.ssafy.hamtteukka.service;

import com.ssafy.hamtteukka.common.S3FileLoader;
import com.ssafy.hamtteukka.domain.User;
import com.ssafy.hamtteukka.dto.SubscriptionResponseDto;
import com.ssafy.hamtteukka.dto.UserInfoResponseDto;
import com.ssafy.hamtteukka.dto.UserResponseDto;
import com.ssafy.hamtteukka.domain.UserSubscribe;
import com.ssafy.hamtteukka.dto.UserSubscriptionResponseDto;
import com.ssafy.hamtteukka.repository.SubscribeRepository;
import com.ssafy.hamtteukka.repository.UserRepository;
import com.ssafy.hamtteukka.security.JwtTokenProvider;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.security.SignatureException;

@Slf4j
@Service
public class UserService {
    private final UserRepository userRepository;
    private final S3FileLoader s3FileLoader;
    private final JwtTokenProvider jwtTokenProvider;
    private final SubscribeRepository subscribeRepository;
    private final RateLimiterService rateLimiterService;

    public UserService(
            UserRepository userRepository,
            S3FileLoader s3FileLoader,
            JwtTokenProvider jwtTokenProvider,
            SubscribeRepository subscribeRepository,
            RateLimiterService rateLimiterService
    ) {
        this.userRepository = userRepository;
        this.s3FileLoader = s3FileLoader;
        this.jwtTokenProvider = jwtTokenProvider;
        this.subscribeRepository = subscribeRepository;
        this.rateLimiterService = rateLimiterService;
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
    public UserResponseDto registerUser(String nickname, MultipartFile profileImage, HttpServletRequest request, HttpServletResponse response) throws IOException {
        if (isNicknameDuplicate(nickname)) {
            throw new IllegalArgumentException("nickname already exists");
        }
        log.info("Registering user {}", nickname);
        String idToken = getCookie(request, "idToken");
        if (idToken == null || !jwtTokenProvider.validToken(idToken)) {
            throw new IllegalArgumentException("no idCookie or invalid idToken");
        }
        log.info("idToken {}", idToken);
        long kakaoId = jwtTokenProvider.getIdFromToken(idToken);
        response.addCookie(generateCookie(
                "idToken",
                null,
                true,
                false,
                0
        ));
        String profileId = s3FileLoader.uploadFile(profileImage);

        User user = new User(
                0L,
                nickname,
                profileId,
                kakaoId
        );

        user = userRepository.save(user);
        log.info("userId: {}", user.getId());
        String accessToken = jwtTokenProvider.generateJwt(user.getId(), 60);
        log.info("accessToken: " + accessToken);
        response.addCookie(generateCookie(
                "accessToken",
                accessToken,
                true,
                false,
                60 * 60
        ));

        String refreshToken = jwtTokenProvider.generateJwt(user.getId(), 30 * 24 * 60);
        log.info("refreshToken: " + refreshToken);
        response.addCookie(generateCookie(
                "refreshToken",
                refreshToken,
                true,
                false,
                7 * 24 * 60 * 60
        ));
        return new UserResponseDto(
                user.getId(),
                nickname,
                s3FileLoader.getFileUrl(profileId),
                rateLimiterService.getRequestCount(user.getId())
        );
    }

    @Transactional
    public UserResponseDto modifyUser(Long userId, String nickname, MultipartFile profileImage) throws SignatureException, IOException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new SignatureException("Invalid or expired access token"));
        if (!nickname.equals(user.getNickname())&&isNicknameDuplicate(nickname)) throw new IllegalArgumentException("nickname already exists");

        s3FileLoader.deleteFile(user.getProfileId());
        String newProfileId = s3FileLoader.uploadFile(profileImage);

        userRepository.updateUser(userId, nickname, newProfileId);
        return new UserResponseDto(
                user.getId(),
                nickname,
                s3FileLoader.getFileUrl(newProfileId)
        );
    }

    /**
     * 타 유저 정보 요청 메서드
     *
     * @param userId
     * @param signInId
     * @return
     * @throws IllegalArgumentException userId에 해당하는 유저가 없을때 발생
     */
    public UserInfoResponseDto getUserInfo(long userId, Long signInId) {
        Optional<User> signUser = userRepository.findById(signInId);
        long signUserId = signUser.isPresent() ? signUser.get().getId() : 0;
        UserInfoResponseDto userInfo = userRepository.findUserInfo(userId, signUserId);
        if (userInfo == null) throw new IllegalArgumentException("user not found");
        return new UserInfoResponseDto(
                userInfo.getUser().getUserId(),
                userInfo.getUser().getNickname(),
                s3FileLoader.getFileUrl(userInfo.getUser().getProfileId()),
                userInfo.getSubscriberCount(),
                userInfo.getIsSubscribed()
        );
    }

    /**
     * 쿠키 값 가져오는 메서드
     *
     * @param request
     * @param name    가지고올 쿠키 이름
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
     * @param maxAge   초단위
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
     * 구독 메서드
     */
    @Transactional
    public SubscriptionResponseDto subscribe(Long providerId, Long subscriberId) {
        UserSubscribe userSubscribe = new UserSubscribe(User.fromId(providerId), User.fromId(subscriberId));
        subscribeRepository.save(userSubscribe);

        return new SubscriptionResponseDto(
                subscribeRepository.countSubscribedUsers(providerId),
                true
        );
    }

    /**
     * 구독 해제 메서드
     */
    @Transactional
    public SubscriptionResponseDto unsubscribe(Long providerId, Long subscriberId) {
        subscribeRepository.deleteByIds(providerId, subscriberId);

        return new SubscriptionResponseDto(
                subscribeRepository.countSubscribedUsers(providerId),
                false
        );
    }

    /**
     * 구독 목록 가져오기 메서드
     *
     * @param userId
     * @return
     */
    public List<UserSubscriptionResponseDto> getSubscription(Long userId) {
        List<UserSubscriptionResponseDto> list = subscribeRepository.getSubscribedUsers(userId);

        return list.stream()
                .map(dto -> new UserSubscriptionResponseDto(
                        dto.getUser().getUserId(),
                        dto.getUser().getNickname(),
                        s3FileLoader.getFileUrl(dto.getUser().getProfileId()),
                        dto.getSubscriber()
                ))
                .toList();
    }
}
