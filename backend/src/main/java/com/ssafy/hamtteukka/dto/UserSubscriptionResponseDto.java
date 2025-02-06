package com.ssafy.hamtteukka.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserSubscriptionResponseDto {
    private String nickname;
    private String profileId;
    private int subscriberCount;
}
