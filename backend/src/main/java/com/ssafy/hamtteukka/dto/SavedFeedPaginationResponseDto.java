package com.ssafy.hamtteukka.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class SavedFeedPaginationResponseDto {
    private List<SavedFeedResponseDto> feeds;
    private boolean hasNextFeed;
    private Long nextCursorId;

    public SavedFeedPaginationResponseDto(List<SavedFeedResponseDto> feeds, boolean hasNextFeed, Long nextCursorId) {
        this.feeds = feeds;
        this.hasNextFeed = hasNextFeed;
        this.nextCursorId = nextCursorId;
    }
}
