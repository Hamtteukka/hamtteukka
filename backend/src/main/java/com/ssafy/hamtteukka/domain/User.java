package com.ssafy.hamtteukka.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
public class User {

    @Id //GeneratedValue x
    @Column(name = "user_id")
    private Long id;

    @Column(length = 100, nullable = false)
    private String nickname;

    private String profileId;

    protected User() {}

    public User(Long id, String nickname, String profileId) {
        this.id = id;
        this.nickname = nickname;
        this.profileId = profileId;
    }
}
