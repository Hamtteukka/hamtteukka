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
    private String hostNickname;
    private String hostProfileImg;
    private List<Long> people = new ArrayList<>();



    public void addPerson(Long personId) {
        this.people.add(personId);
        this.presentPeople = this.people.size(); // 현재 인원 수 업데이트
    }

    public void setHostInfo(String nickname, String profileImg) {
        this.hostNickname = nickname;
        this.hostProfileImg = profileImg;
    }


}
