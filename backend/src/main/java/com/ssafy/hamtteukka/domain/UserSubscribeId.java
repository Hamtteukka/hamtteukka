package com.ssafy.hamtteukka.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;

@Embeddable
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class UserSubscribeId implements Serializable {
    @Column(name = "provider_id")
    private Long providerId;

    @Column(name = "subscriber_id")
    private Long subscriberId;
}
