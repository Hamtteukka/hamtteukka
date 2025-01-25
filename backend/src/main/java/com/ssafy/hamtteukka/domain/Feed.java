package com.ssafy.hamtteukka.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

import java.time.LocalDateTime;

@Entity
@Getter
public class Feed {

    @Id
    @GeneratedValue
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

}

