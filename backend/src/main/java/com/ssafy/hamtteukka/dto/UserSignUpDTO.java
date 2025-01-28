package com.ssafy.hamtteukka.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class UserSignUpDTO {
    private final long userId;
    private final String nickname;
    private final String profileId;

    @JsonCreator
    public UserSignUpDTO(
            @JsonProperty("userId") long userId,
            @JsonProperty("nickname") String nickname,
            @JsonProperty("profileId") String profileId
    ) {
        this.userId = userId;
        this.nickname = nickname;
        this.profileId = profileId;
    }

    public long getUserId() {
        return userId;
    }

    public String getNickname() {
        return nickname;
    }

    public String getProfileId() {
        return profileId;
    }
}
