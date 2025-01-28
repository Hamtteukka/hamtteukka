package com.ssafy.hamtteukka.dto;

public class KakaoInfo {
    private long id;
    private String nickname;
    private String profileImage;

    public KakaoInfo(long id, String nickname, String profileImage) {
        this.id = id;
        this.nickname = nickname;
        this.profileImage = profileImage;
    }

    public long getId() {
        return id;
    }

    public String getNickname() {
        return nickname;
    }

    public String getProfileImage() {
        return profileImage;
    }
}
