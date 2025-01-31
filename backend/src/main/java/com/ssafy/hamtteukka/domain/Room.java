package com.ssafy.hamtteukka.domain;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.redis.core.RedisHash;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@RedisHash("room")
@AllArgsConstructor
@NoArgsConstructor // 레디스에서 자바 객체로 역직렬화 할 때 기본 생성자 필요
@Getter
public class Room implements Serializable {
    @Id
    private String sessionId;
    private String title;
    private int presentPeople;
    private int capacity;
   // private String videoImg;
    private String hostNickName;
   // private String hostProfileImg; // 바뀔 수 있다.
    private List<Long> people = new ArrayList<>();

    public Room(String sessionId, String title, int presentPeople, int capacity, String hostNickName) {
        this.sessionId = sessionId;
        this.title = title;
        this.presentPeople = presentPeople;
        this.capacity = capacity;
        this.hostNickName = hostNickName;
    }

    public void incrementPresentPeople() {
        this.presentPeople++;
    }
    public void addPerson(Long personId) {
        this.people.add(personId);
    }
}
