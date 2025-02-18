package com.ssafy.hamtteukka.domain;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.redis.core.RedisHash;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class Room implements Serializable {

    @Id
    private String sessionId;
    private String title;
    private int presentPeople;
    private int capacity;
    private String videoImg;
    private String hostNickName;
    private String hostProfileImg;
    private List<Long> people = new ArrayList<>();


    // 기존 메서드들
    public void incrementPresentPeople() {
        this.presentPeople++;
    }

    public void addPerson(Long personId) {
        if (this.people == null) {
            this.people = new ArrayList<>();
        }
        this.people.add(personId);
    }
}
