package com.ssafy.hamtteukka.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
public class User {

    @Id
    @Column(name = "user_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 100, nullable = false)
    private String nickname;

    private String profileId;

    private Long kakaoId;

    protected User() {}

    public User(Long id, String nickname, String profileId, Long kakaoId) {
        this.id = id;
        this.nickname = nickname;
        this.profileId = profileId;
        this.kakaoId = kakaoId;
    }

    public static User fromId(Long id) {
        User user = new User();
        user.id = id;
        return user;
    }
}
