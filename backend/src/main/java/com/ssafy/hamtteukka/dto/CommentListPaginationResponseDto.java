package com.ssafy.hamtteukka.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class CommentListPaginationResponseDto {
    private final Long totalCount;
    private final List<CommentListResponseDto> comments;
    private final boolean hasNextItems;
    private final Long nextCursorId;

    public CommentListPaginationResponseDto(Long totalCount, List<CommentListResponseDto> comments,
                                            boolean hasNextItems, Long nextCursorId) {
        this.totalCount = totalCount;
        this.comments = comments;
        this.hasNextItems = hasNextItems;
        this.nextCursorId = nextCursorId;
    }
}