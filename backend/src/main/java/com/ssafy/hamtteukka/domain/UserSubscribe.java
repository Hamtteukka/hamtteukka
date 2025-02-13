package com.ssafy.hamtteukka.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserSubscribe {

    @EmbeddedId
    private UserSubscribeId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("providerId")
    @JoinColumn(name = "provider_id", nullable = false)
    private User provider;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("subscriberId")
    @JoinColumn(name = "subscriber_id", nullable = false)
    private User subscriber;

    public UserSubscribe(User provider, User subscriber) {
        this.id = new UserSubscribeId(provider.getId(), subscriber.getId());
        this.provider = provider;
        this.subscriber = subscriber;
    }
}
