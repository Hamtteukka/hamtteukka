package com.ssafy.hamtteukka.service;

import com.ssafy.hamtteukka.domain.Room;
import com.ssafy.hamtteukka.domain.User;
import com.ssafy.hamtteukka.dto.RoomEnterResponseDto;
import com.ssafy.hamtteukka.dto.RoomResponseDto;
import com.ssafy.hamtteukka.exception.CustomException;
import com.ssafy.hamtteukka.exception.ErrorCode;
import com.ssafy.hamtteukka.repository.UserRepository;
import io.openvidu.java.client.*;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Slf4j
@Service
@Transactional
public class RoomService extends OpenVidu {
    private static final String ROOM_PREFIX = "room";
    private final UserRepository userRepository;

    @Autowired
    @Qualifier("roomRedisTemplate")
    private RedisTemplate redisTemplate;
    @Qualifier("roomRedisTemplate")
    @Autowired
    private RedisTemplate roomRedisTemplate;

    @Autowired
    public RoomService(@Value("${OPENVIDU_URL}")String hostname, @Value("${OPENVIDU_SECRET}") String secret, UserRepository userRepository) {
        super(hostname, secret);
        this.userRepository = userRepository;
    }

    public Session createSession(SessionProperties properties) throws OpenViduJavaClientException, OpenViduHttpException {
        Session session = super.createSession(properties);
        return session;
    }


    public RoomResponseDto createRoom(String sessionId, Map<String, Object> params) {
        String nickname = null;
        String title = (String) params.get("title");
        int capacity = (Integer) params.get("capacity");
        Long userId = (Long) params.get("captainId");

        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            nickname = user.get().getNickname();
        }

        Room room = new Room(sessionId, title, 1, capacity, "sample");
        redisTemplate.opsForHash().put(ROOM_PREFIX, sessionId, room);
        RoomResponseDto roomResponseDto = new RoomResponseDto(sessionId, title, 1, capacity, "sample");

        return roomResponseDto;
    }

    public RoomEnterResponseDto joinRoom(String sessionId, Long socialId, String tokens) {
        Room room = getRoom(sessionId);
        if(room == null) {
            throw new CustomException(ErrorCode.FEED_NOT_FOUND);
        }
        // 사람 추가 해야해
        room.addPerson(socialId);
        room.incrementPresentPeople();

        roomRedisTemplate.opsForHash().put(ROOM_PREFIX, sessionId, room);
        RoomEnterResponseDto roomResponseDto = new RoomEnterResponseDto(tokens, sessionId, room.getTitle(), room.getPresentPeople(), room.getCapacity(), room.getHostNickName());
        return roomResponseDto;
    }

    public List<Room> getRooms() {
        List<Room> rooms = roomRedisTemplate.opsForHash().values(ROOM_PREFIX);
        return rooms;
    }

    private Room getRoom(String sessionId) {
        Room room = (Room) roomRedisTemplate.opsForHash().get(ROOM_PREFIX, sessionId);
        return room;
    }

    public void exitRoom(String sessionId, Long socialId) {
        Room room = getRoom(sessionId);
        List<Long> people = room.getPeople();

        people.remove(socialId);

        if(people.size() == 0) {
            redisTemplate.opsForHash().delete(ROOM_PREFIX, sessionId);
        } else {
            redisTemplate.opsForHash().put(ROOM_PREFIX, sessionId, people);
        }
    }
}
