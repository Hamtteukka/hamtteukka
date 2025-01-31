package com.ssafy.hamtteukka.controller;

import com.ssafy.hamtteukka.common.ApiResponse;
import com.ssafy.hamtteukka.repository.UserRepository;
import com.ssafy.hamtteukka.service.SubscribeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/subscribe")
public class SubscribeController {

    private final SubscribeService subscribeService;
    private final UserRepository userRepository;


    @PostMapping("/{nickname}")
    public ResponseEntity<?> subscribe(@PathVariable String nickname){
        try {
            Optional<Long> providerId = userRepository.findIdByNickname(nickname);

            // 유저가 존재하지 않는 경우 처리
            if (providerId.isEmpty()) {
                return ApiResponse.fail(
                        HttpStatus.NOT_FOUND,
                        "유저 닉네임을 찾을 수 없습니다"
                );
            }

            // 토큰에서 구독하는 사람 ID 받아오기
            // String token = jwtTokenProvider.getJwtFromCookie(request);
            Long subscribeId =0L;
            // Long subscribeId = jwtTokenProvider.getIdFromToken(token);

            return ApiResponse.success(
                    HttpStatus.OK,
                    "구독하기 성공",
                    Map.of("isSubscribe",subscribeService.subscribe(providerId.get(), subscribeId))

            );
        } catch (Exception ex){
            return ApiResponse.fail(HttpStatus.UNAUTHORIZED, "Invalid or expired access token");
        }
    }
}
