package com.ssafy.hamtteukka.controller;


import com.ssafy.hamtteukka.common.ApiResponse;
import com.ssafy.hamtteukka.domain.Room;
import com.ssafy.hamtteukka.dto.RoomEnterResponseDto;
import com.ssafy.hamtteukka.dto.RoomResponseDto;
import com.ssafy.hamtteukka.security.JwtTokenProvider;
import com.ssafy.hamtteukka.service.RoomService;
import io.openvidu.java.client.*;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Controller
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/openvidu")
public class RoomController {

    private final JwtTokenProvider jwtTokenProvider;
    private final RoomService roomService;

    @Value("${OPENVIDU_URL}")
    private String OPENVIDU_URL;

    @Value("${OPENVIDU_SECRET}")
    private String OPENVIDU_SECRET;

    @PostMapping("/sessions")
    public ResponseEntity<?> makeRoom(@RequestBody(required = false)Map<String, Object> params, HttpServletRequest request)
            throws OpenViduHttpException, OpenViduJavaClientException {
       // String token = jwtTokenProvider.getJwtFromCookie(request);
       // Long socialId = jwtTokenProvider.getIdFromToken(token);
        params.put("captainId", 100001L); // 방 만드는 유저 (방장)
        SessionProperties properties = SessionProperties.fromJson(params).build();

        Session session = roomService.createSession(properties);
        RoomResponseDto roomResponseDto = roomService.createRoom(session.getSessionId(), params);
        System.out.println("sessionId: " + session.getSessionId());
        return ApiResponse.success(HttpStatus.OK,"모각뜨 방 생성 성공" ,roomResponseDto);
    }

    @GetMapping("/sessions/{sessionId}/connections")
    public ResponseEntity<?> enterRoom(@PathVariable("sessionId") String sessionId) throws OpenViduHttpException, OpenViduJavaClientException {
        // String token = jwtTokenProvider.getJwtFromCookie(request);
        // Long socialId = jwtTokenProvider.getIdFromToken(token);
        Long socialId = 100002L;
        Session session = roomService.getActiveSession(sessionId);

        Connection connection = session.createConnection();
        RoomEnterResponseDto roomResponseDto = roomService.joinRoom(sessionId, socialId, connection.getToken());

        return ApiResponse.success(HttpStatus.OK, "모각뜨 방 입장 성공", roomResponseDto);
    }

    @GetMapping("/sessions")
    public ResponseEntity<?> listRooms() throws OpenViduHttpException, OpenViduJavaClientException {
        List<Room> rooms = roomService.getRooms();
        return ApiResponse.success(HttpStatus.OK, "모각뜨 방 조회 성공", rooms);
    }

    @DeleteMapping("/sessions/{sessionId}")
    public ResponseEntity<?> exitRoom(@PathVariable("sessionId") String sessionId) throws OpenViduJavaClientException {
        // String token = jwtTokenProvider.getJwtFromCookie(request);
        // Long socialId = jwtTokenProvider.getIdFromToken(token);
        Long socialId = 100002L;
        roomService.exitRoom(sessionId, socialId);
        return ApiResponse.success(HttpStatus.OK, "모각뜨 방 나가기 성공");
    }

}
