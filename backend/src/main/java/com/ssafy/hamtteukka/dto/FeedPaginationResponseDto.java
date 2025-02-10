package com.ssafy.hamtteukka.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class FeedPaginationResponseDto {
    private final List<FeedResponseDto> items;
    private boolean hasNextItems;
    private Long nextCursorId;

    public FeedPaginationResponseDto(List<FeedResponseDto> feeds, boolean hasNextFeed, Long nextCursorId) {
        this.items = feeds;
        this.hasNextItems = hasNextFeed;
        this.nextCursorId = nextCursorId;
    }
}
