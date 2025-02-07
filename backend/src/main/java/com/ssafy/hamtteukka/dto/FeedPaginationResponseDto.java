package com.ssafy.hamtteukka.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class FeedPaginationResponseDto {
    private final List<FeedResponseDto> feeds;
    private boolean hasNextFeed;
    private Long nextCursorId;

    public FeedPaginationResponseDto(List<FeedResponseDto> feeds, boolean hasNextFeed, Long nextCursorId) {
        this.feeds = feeds;
        this.hasNextFeed = hasNextFeed;
        this.nextCursorId = nextCursorId;
    }
}
