package com.ssafy.hamtteukka.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SavedFeedResponseDto {
    private Long savedFeedId;
    private String title;
    private String thumbnailImageId;
    private String nickname;
    private String profileId;
}
