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
    private List<Image> images;
    private List<Integer> categories;
    private AiPattern aiPattern; // 임베드된 도안
    private User user;
    private boolean isOwner; // true, false
    private Boolean isScrap; // true, false, null

    @Getter
    @NoArgsConstructor
    public static class Image {
        private String imageUrl;
        private int typeId;

        public Image(String imageUrl, int typeId) {
            this.imageUrl = imageUrl;
            this.typeId = typeId;
        }
    }

    @Getter
    @NoArgsConstructor
    public static class AiPattern {
        private Long feedId;
        private String title;
        private String thumbnailUrl;

        public AiPattern(Long feedId, String title, String thumbnailUrl) {
            this.feedId = feedId;
            this.title = title;
            this.thumbnailUrl = thumbnailUrl;
        }
    }

    @Getter
    @NoArgsConstructor
    public static class User {
        private Long userId;
        private String nickname;
        private String profileUrl;

        public User(Long userId, String nickname, String profileUrl) {
            this.userId = userId;
            this.nickname = nickname;
            this.profileUrl = profileUrl;
        }
    }

    public FeedDetailResponse(
            Long feedId, String title, String content,
            List<Image> images, List<Integer> categories,
            AiPattern aiPattern, User user,
            boolean isOwner, Boolean isScrap
    ) {
        this.feedId = feedId;
        this.title = title;
        this.content = content;
        this.images = images;
        this.categories = categories;
        this.aiPattern = aiPattern;
        this.user = user;
        this.isOwner = isOwner;
        this.isScrap = isScrap;
    }
}