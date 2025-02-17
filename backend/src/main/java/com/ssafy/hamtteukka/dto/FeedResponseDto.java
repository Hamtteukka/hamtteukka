package com.ssafy.hamtteukka.dto;

import lombok.Getter;

@Getter
public class FeedResponseDto {
    private final Long feedId;
    private final String thumbnail;
    private final String title;
    private final String profileId;

    public FeedResponseDto(Long feedId, String thumbnail, String title, String profileId) {
        this.feedId = feedId;
        this.thumbnail = thumbnail;
        this.title = title;
        this.profileId = profileId;
    }
}