package com.ssafy.hamtteukka.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class FeedCreateResponse {

    private Long feedId;

    public FeedCreateResponse(Long feedId) {
        this.feedId = feedId;
    }
}