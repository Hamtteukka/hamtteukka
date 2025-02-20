package com.ssafy.hamtteukka.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class FeedDetailResponse {
    private Long feedId;
    private String title;
    private String content;
    private List<String> images;
    private List<Integer> categoryIds;
    private AiPattern aiPattern; // 임베드된 도안
    private User user;
    private boolean isOwner; // true, false
    private Boolean isScrap; // true, false, null

    @Getter
    @NoArgsConstructor
    public static class AiPattern {
        private Long feedId;
        private String title;
        private String thumbnail;

        public AiPattern(Long feedId, String title, String thumbnail) {
            this.feedId = feedId;
            this.title = title;
            this.thumbnail = thumbnail;
        }
    }

    @Getter
    @NoArgsConstructor
    public static class User {
        private Long userId;
        private String nickname;
        private String profileId;

        public User(Long userId, String nickname, String profileId) {
            this.userId = userId;
            this.nickname = nickname;
            this.profileId = profileId;
        }
    }

    public FeedDetailResponse(Long feedId, String title, String content, List<String> images, List<Integer> categoryIds, AiPattern aiPattern, User user, boolean isOwner, Boolean isScrap) {
        this.feedId = feedId;
        this.title = title;
        this.content = content;
        this.images = images;
        this.categoryIds = categoryIds;
        this.aiPattern = aiPattern;
        this.user = user;
        this.isOwner = isOwner;
        this.isScrap = isScrap;
    }
}