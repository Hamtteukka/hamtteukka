package com.ssafy.hamtteukka.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.hamtteukka.common.S3FileLoader;
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
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional
public class RoomService extends OpenVidu {
    private static final String ROOM_PREFIX = "room: ";
    private final UserRepository userRepository;
    private final S3FileLoader s3FileLoader;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    @Qualifier("roomRedisTemplate")
    private RedisTemplate redisTemplate;
    @Qualifier("roomRedisTemplate")
    @Autowired
    private RedisTemplate roomRedisTemplate;

    @Autowired
    public RoomService(@Value("${OPENVIDU_URL}")String hostname, @Value("${OPENVIDU_SECRET}") String secret, UserRepository userRepository, S3FileLoader s3FileLoader) {
        super(hostname, secret);
        this.userRepository = userRepository;
        this.s3FileLoader = s3FileLoader;
    }

    public Session createSession(SessionProperties properties) throws OpenViduJavaClientException, OpenViduHttpException {
        Session session = super.createSession(properties);
        return session;
    }


    public RoomResponseDto createRoom(String sessionId, Map<String, Object> params) throws IOException {
        String nickname = null;
        String userProfile = null;
        List<Long> peopleIds = new ArrayList<>();

        String title = (String) params.get("title");
        int capacity = (Integer) params.get("capacity");
        Long userId = (Long) params.get("captainId");
        MultipartFile thumbnail = (MultipartFile) params.get("thumbnail");

        String thumbnailName = s3FileLoader.uploadFile(thumbnail); // filename

        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            nickname = user.get().getNickname();
            userProfile = s3FileLoader.getFileUrl(user.get().getProfileId());
            peopleIds.add(userId);
        }

        Room room = new Room(sessionId, title, 1, capacity, thumbnailName, nickname, userProfile, peopleIds);
        redisTemplate.opsForValue().set(ROOM_PREFIX + sessionId, room);
        RoomResponseDto roomResponseDto = new RoomResponseDto(sessionId);

        return roomResponseDto;
    }

    public RoomEnterResponseDto joinRoom(String sessionId, Long socialId, String tokens) {
        Room room = getRoom(ROOM_PREFIX + sessionId);
        if(room == null) {
            throw new CustomException(ErrorCode.FEED_NOT_FOUND);
        }

        if(room.getPresentPeople() + 1 > room.getCapacity()) {
            throw new CustomException(ErrorCode.ROOM_CAPACITY_OVER);
        }

        // 사람 추가 해야해
        room.addPerson(socialId);
        room.incrementPresentPeople();

        roomRedisTemplate.opsForValue().set(ROOM_PREFIX + sessionId, room);

        String thumbNailName = room.getThumbnailName();
        String thumbNailUrl = s3FileLoader.getFileUrl(thumbNailName); // 프론트에 URL 넘겨주기

        RoomEnterResponseDto roomResponseDto = new RoomEnterResponseDto(tokens, sessionId, room.getTitle(), room.getPresentPeople(),
                room.getCapacity(), thumbNailUrl, room.getHostNickName() ,room.getHostProfileImg());

        return roomResponseDto;
    }

    public List<Room> getRooms() {
        List<Room> rooms = new ArrayList<>();
        // Redis에서 각각의 방을 가져오는 방식
        Set<String> sessionIds = redisTemplate.keys(ROOM_PREFIX + "*");
        if (sessionIds != null) {
            for (String sessionId : sessionIds) {
                // sessionId에 해당하는 Room 객체를 가져옴
                Room room = (Room) redisTemplate.opsForValue().get(sessionId); // roomRedisTemplate 대신 redisTemplate 사용 가능
                if (room != null) {
                    rooms.add(room);
                }
            }
        }

        if (rooms.isEmpty()) {
            log.info("현재 존재하는 방이 없습니다 !");
        }
        return rooms;
    }




    private Room getRoom(String sessionId) {
        Room room = (Room) roomRedisTemplate.opsForValue().get(sessionId);
        return room;
    }

    public void exitRoom(String sessionId, Long userId) {
        Room room = getRoom(ROOM_PREFIX + sessionId);
        List<Long> people = room.getPeople();
        Optional<Long> roomHostId = userRepository.findIdByNickname(room.getHostNickName());

        people.remove(userId.longValue());  // 해당하는 값이 지워지도록

        if(people.size() < 0 || roomHostId.isPresent() && roomHostId.get().equals(userId)) {
            redisTemplate.delete(ROOM_PREFIX + sessionId);
            s3FileLoader.deleteFile(room.getThumbnailName());

        } else {
            Room newRoom = new Room(sessionId, room.getTitle(), room.getPresentPeople() - 1, room.getCapacity(),
                    room.getThumbnailName(), room.getHostNickName(), room.getHostProfileImg(), people);
            redisTemplate.opsForValue().set(ROOM_PREFIX + sessionId, newRoom);
        }
    }
}
