package com.ssafy.hamtteukka.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class UserResponseDto {
    private final long userId;
    private final String nickname;
    private final String profileId;
    private final int dailyCreationLimit;

    public UserResponseDto(long userId, String nickname, String profileId) {
        this.userId = userId;
        this.nickname = nickname;
        this.profileId = profileId;
        this.dailyCreationLimit = 0;
    }
}
