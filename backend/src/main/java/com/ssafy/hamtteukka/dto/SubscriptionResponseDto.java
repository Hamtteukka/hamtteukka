package com.ssafy.hamtteukka.dto;

import lombok.Getter;

@Getter
public class SubscriptionResponseDto {
    private final long subscriberCount;
    private final Boolean isSubscribed;

    public SubscriptionResponseDto(long subscriberCount, boolean isSubscribed) {
        this.subscriberCount = subscriberCount;
        this.isSubscribed = isSubscribed;
    }
}
