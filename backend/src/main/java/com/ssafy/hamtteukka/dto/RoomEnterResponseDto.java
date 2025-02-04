package com.ssafy.hamtteukka.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class RoomEnterResponseDto {
    private String token;
    private String sessionId;
    private String title;
    private int presentPeople;
    private int capacity;
    private String videoImg;
    private String hostNickName;
    private String hostProfileImg; // 바뀔 수 있다.
}
