package com.ssafy.hamtteukka.dto;

import lombok.Getter;

@Getter
public class FeedResponseDto {
    private final Long feedId;
    private final String thumbnail;
    private final String title;
    private final String userProfile;

    public FeedResponseDto(Long feedId, String thumbnail, String title, String userProfile) {
        this.feedId = feedId;
        this.thumbnail = thumbnail;
        this.title = title;
        this.userProfile = userProfile;
    }
}