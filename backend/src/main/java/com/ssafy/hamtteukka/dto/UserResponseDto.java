package com.ssafy.hamtteukka.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class UserResponseDto {
    private long userId;
    private final String nickname;
    private final String profileId;
}
