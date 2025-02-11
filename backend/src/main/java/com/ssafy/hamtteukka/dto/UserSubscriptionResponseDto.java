package com.ssafy.hamtteukka.dto;

import lombok.Getter;

@Getter
public class UserSubscriptionResponseDto {
    private final UserResponseDto user;
    private final Long  subscriber;

    public UserSubscriptionResponseDto(UserResponseDto user, Long  subscriber) {
        this.user = user;
        this.subscriber = subscriber;
    }

    public UserSubscriptionResponseDto(Long userId, String nickname, String profileId, Long subscriber) {
        this.user = new UserResponseDto(
                userId,
                nickname,
                profileId
        );
        this.subscriber = subscriber;
    }
}
