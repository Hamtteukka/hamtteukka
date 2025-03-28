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
import org.springframework.data.redis.core.RedisCallback;
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
    private static final String ROOM_PREFIX = "room:";
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

        String videoImg = s3FileLoader.uploadFile(thumbnail); // filename
        String fileUrl = s3FileLoader.getFileUrl(videoImg);

        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            nickname = user.get().getNickname();
            userProfile = s3FileLoader.getFileUrl(user.get().getProfileId());
        }

        Room room = new Room(sessionId, title, 0, capacity, fileUrl, nickname, userProfile, peopleIds);
        redisTemplate.opsForValue().set(ROOM_PREFIX + sessionId, room);
        RoomResponseDto roomResponseDto = new RoomResponseDto(sessionId);

        return roomResponseDto;
    }

    public RoomEnterResponseDto joinRoom(String sessionId, Long socialId, String tokens) {
        Room room = getRoom(ROOM_PREFIX + sessionId);
        if (room == null) {
            throw new CustomException(ErrorCode.ROOM_NOT_FOUND);
        }

        if (room.getPeople().size() + 1 > room.getCapacity()) {
            throw new CustomException(ErrorCode.ROOM_CAPACITY_OVER);
        }

        if (!checkDuplicate(room.getPeople(), socialId)) { // 이미 있으면
            throw new CustomException(ErrorCode.ROOM_ACCESS_ERROR);
        }

        // 사람 추가
        room.addPerson(socialId);

        // ✅ 호스트 정보 선정
        String[] hostInfos = selectCaptain(room.getPeople());
        room.setHostInfo(hostInfos[0], hostInfos[1]);  // room 객체에 호스트 정보 저장

        // Redis에 업데이트
        roomRedisTemplate.opsForValue().set(ROOM_PREFIX + sessionId, room);

        String thumbNailName = room.getVideoImg();
        String thumbNailUrl = s3FileLoader.getFileUrl(thumbNailName); // 프론트에 URL 넘겨주기

        return new RoomEnterResponseDto(tokens, sessionId, room.getTitle(), room.getPeople().size(),
                room.getCapacity(), thumbNailUrl, room.getHostNickname(), room.getHostProfileImg());
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
        if (room == null) {
            log.warn("방을 찾을 수 없습니다: " + sessionId);
            return;
        }

        List<Long> people = room.getPeople();

        // 현재 유저 삭제
        people.remove(userId.longValue());

        // 모든 사람이 나가면 방 삭제
        if (people.isEmpty()) {
            redisTemplate.execute((RedisCallback<Object>) connection -> {
                connection.del((ROOM_PREFIX + sessionId).getBytes());
                return null;
            });
            s3FileLoader.deleteFile(room.getVideoImg());
            log.info("방 삭제됨: " + sessionId);
        } else {
            String[] hostInfos = selectCaptain(people);
            room.setHostInfo(hostInfos[0], hostInfos[1]);  // room 객체에 호스트 정보 저장

            // 남아 있는 사람 수 업데이트 후 다시 저장
            Room newRoom = new Room(sessionId, room.getTitle(), people.size(), room.getCapacity(),
                    room.getVideoImg(), room.getHostNickname(), room.getHostProfileImg(), people);
            redisTemplate.opsForValue().set(ROOM_PREFIX + sessionId, newRoom);
        }
    }

    private boolean checkDuplicate(List<Long> people, Long userId) {
        if(people.contains(userId.longValue())) {
            return false;
        }
        return true;
    }

    private String[] selectCaptain(List<Long> people) {
        String[] captains = new String[2];

        String captainNickname = null;
        String captainProfileImg = null;

        Long presentCaptainId = people.get(0).longValue();
        Optional<User> captain = userRepository.findById(presentCaptainId);

        if(captain.isPresent()) {
            captainNickname = captain.get().getNickname();
            captainProfileImg = s3FileLoader.getFileUrl(captain.get().getProfileId());
        }

        captains[0] = captainNickname;
        captains[1] = captainProfileImg;

        return captains;
    }

}
