package com.ssafy.hamtteukka.domain;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
public class UserSubscribe {

    @Id
    @GeneratedValue
    @Column(name = "user_subscribe_id", columnDefinition = "INT UNSIGNED")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "provider_id", nullable = false)
    private User provider;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subscriber_id", nullable = false)
    private User subscriber;

}
