package com.ssafy.hamtteukka.dto;

import lombok.Getter;

@Getter
public class UserInfoResponseDto {
    private final UserResponseDto user;
    private final long subscriberCount;
    private final Boolean isSubscribed;

    public UserInfoResponseDto(UserResponseDto user, long subscriberCount, boolean isSubscribed) {
        this.user = user;
        this.subscriberCount = subscriberCount;
        this.isSubscribed = isSubscribed;
    }

    public UserInfoResponseDto(Long id,String nickname, String profileId, Long subscriberCount, Boolean isSubscribed) {
        this.user = new UserResponseDto(
                id,
                nickname,
                profileId
        );
        this.subscriberCount = subscriberCount;
        this.isSubscribed = isSubscribed;
    }
}
