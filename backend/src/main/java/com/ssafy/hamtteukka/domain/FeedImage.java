package com.ssafy.hamtteukka.domain;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
public class FeedImage {

    @Id //VARCHAR타입은 자동생성x
    @Column(name = "feed_image_id", columnDefinition = "VARCHAR(255)")
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "feed_id", nullable = false)
    private Feed feed; //피드ID

    @Column(columnDefinition = "TINYINT", nullable = false)
    private int imageType; //이미지타입(0:대표이미지, 1:서브이미지)

    protected FeedImage() {
    }

    public FeedImage(String id, Feed feed, int imageType) {
        this.id = id;
        this.feed = feed;
        this.imageType = imageType;
    }
}
