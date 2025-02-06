package com.ssafy.hamtteukka.dto;

import lombok.Getter;

@Getter
public class FeedResponseDto {
    private final Long feedId;
    private final String title;
    private final Integer feedType;
    private final String thumbnailImageId;

    public FeedResponseDto(Long feedId, String title, Integer feedType, String thumbnailImageId) {
        this.feedId = feedId;
        this.title = title;
        this.feedType = feedType;
        this.thumbnailImageId = thumbnailImageId;
    }
}
