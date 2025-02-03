package com.ssafy.hamtteukka.domain;

import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id", columnDefinition = "INT UNSIGNED")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "feed_id", nullable = false)
    private Feed feed;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @Column(nullable = false, columnDefinition = "DATETIME")
    private LocalDateTime createDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_comment_id")
    private Comment parentComment;

    @OneToMany(mappedBy = "parentComment", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> childComments = new ArrayList<>();

    //생성자 추가
    protected Comment() {
    }

    public Comment(Feed feed, User user, String content, Comment parentComment) {
        this.feed = feed;
        this.user = user;
        this.content = content;
        this.parentComment = parentComment;
        this.createDate = LocalDateTime.now();
    }

    // 댓글 내용 수정 메서드
    public void updateContent(String content) {
        this.content = content;
    }
}
