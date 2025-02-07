package com.ssafy.hamtteukka.domain;

import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
public class Feed {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "feed_id", columnDefinition = "INT UNSIGNED")
    private Long id; //피드ID

    @ManyToOne(fetch = FetchType.LAZY) //@XToOne관계는 지연로딩으로 설정
    @JoinColumn(name = "user_id", nullable = false)
    private User user; //유저ID

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "knitting_patterns_feed_id")
    private Feed knittingPatternsFeed;  //뜨개질도안 피드 ID(자기참조)

    @Column(length = 100, nullable = false)
    private String title; //피드제목

    @Column(nullable = false, columnDefinition = "DATETIME")
    private LocalDateTime createDate; //생성날짜

    @Column(nullable = false, columnDefinition = "DATETIME")
    private LocalDateTime updateDate; //수정날짜

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content; //피드내용

    @Column(columnDefinition = "TINYINT", nullable = false)
    private int feedType; // 피드타입(0: 일반 피드, 1:뜨개도안 피드)

    @OneToMany(mappedBy = "feed", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SavedFeed> savedFeeds = new ArrayList<>();

    @OneToMany(mappedBy = "feed", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "feed", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<FeedCategory> feedCategories = new ArrayList<>();

    protected Feed() {
    }

    public Feed(User user, String title, String content, int feedType, List<Category> categories, Feed knittingPatternsFeed) {
        this.user = user;
        this.title = title;
        this.content = content;
        this.feedType = feedType;
        this.knittingPatternsFeed = knittingPatternsFeed;
        this.createDate = LocalDateTime.now();
        this.updateDate = LocalDateTime.now();

        for (Category category : categories) {
            FeedCategory feedCategory = new FeedCategory(this, category);
            this.feedCategories.add(feedCategory);
        }
    }
}

