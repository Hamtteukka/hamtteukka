package com.ssafy.hamtteukka.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SavedFeed {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "saved_feed_id", columnDefinition = "INT UNSIGNED")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "feed_id", nullable = false)
    private Feed feed;

    @Column(nullable = false, columnDefinition = "DATETIME")
    private LocalDateTime saveDate;

    public SavedFeed(User user, Feed feed) {
        this.user = user;
        this.feed = feed;
        this.saveDate = LocalDateTime.now();
    }

    public SavedFeed(Long id, User user, Feed feed, LocalDateTime saveDate){
        this.id = id;
        this.user = user;
        this.feed = feed;
        this.saveDate = saveDate;
    }

    public SavedFeed(Long userId, Long feedId){
        this.user = User.fromId(userId);
        this.feed = Feed.fromId(feedId);
        this.saveDate = ZonedDateTime.now(ZoneId.of("Asia/Seoul")).toLocalDateTime();;
    }
}
