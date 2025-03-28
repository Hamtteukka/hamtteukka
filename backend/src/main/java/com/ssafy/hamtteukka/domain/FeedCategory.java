package com.ssafy.hamtteukka.domain;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
public class FeedCategory {

    //PK 추가
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "feed_category_id", columnDefinition = "INT UNSIGNED")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "feed_id", nullable = false)
    private Feed feed;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    protected FeedCategory() {}

    public FeedCategory(Feed feed, Category category) {
        this.feed = feed;
        this.category = category;
    }
}
