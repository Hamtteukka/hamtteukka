package com.ssafy.hamtteukka.dto;

public enum FeedType {
    NORMAL(0),  // 일반 feed
    PATTERN(1); // 뜨개도안 feed

    private final int value;

    FeedType(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }
}