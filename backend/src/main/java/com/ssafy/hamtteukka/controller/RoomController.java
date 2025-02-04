package com.ssafy.hamtteukka.controller;


import com.ssafy.hamtteukka.common.ApiResponse;
import com.ssafy.hamtteukka.domain.Room;
import com.ssafy.hamtteukka.dto.RoomEnterResponseDto;
import com.ssafy.hamtteukka.dto.RoomResponseDto;
import com.ssafy.hamtteukka.service.RoomService;
import io.openvidu.java.client.*;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/openvidu")
public class RoomController {

    private final RoomService roomService;

    @Value("${OPENVIDU_URL}")
    private String OPENVIDU_URL;

    @Value("${OPENVIDU_SECRET}")
    private String OPENVIDU_SECRET;

    @PostMapping(value = "/sessions", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @Operation(summary = "모각뜨 방 생성하기")
    public ResponseEntity<?> makeRoom(
            @RequestParam(value = "title", required = false) String title,
            @RequestParam(value="capacity", required = false) Integer capacity,
            @RequestPart(value = "thumbnail", required = false) MultipartFile thumbnail,
            Authentication auth) {
        try {
            System.out.println("이거 뜨냐? 뜨면 여기까진 들어옴"); // 안찍힘
            if (auth == null || auth.getPrincipal() == null) {
                return ApiResponse.fail(HttpStatus.UNAUTHORIZED, "사용자 인증 정보가 없습니다");
            }
            Map<String, Object> params = new HashMap<>();

            Long userId = (Long) auth.getPrincipal();
            System.out.println("방 만들 때 넘어오는 USER_id : " + userId);
            params.put("title", title);
            params.put("capacity", capacity);
            params.put("captainId", userId); // 방 만드는 유저 (방장)
            params.put("thumbnail", thumbnail);

            SessionProperties properties = SessionProperties.fromJson(params).build();
            Session session = roomService.createSession(properties);
            RoomResponseDto roomResponseDto = roomService.createRoom(session.getSessionId(), params);

            return ApiResponse.success(HttpStatus.OK, "모각뜨 방 생성 성공", roomResponseDto);

        } catch (OpenViduHttpException | OpenViduJavaClientException ex) {
            return ApiResponse.fail(HttpStatus.INTERNAL_SERVER_ERROR, "OpenVidu 서버 오류: " + ex.getMessage());
        } catch (IOException io) {
            return ApiResponse.fail(HttpStatus.UNSUPPORTED_MEDIA_TYPE, "파일 업로드 실패: " + io.getMessage());
        } catch (ClassCastException e) {
            return ApiResponse.fail(HttpStatus.UNAUTHORIZED, "잘못된 사용자 인증 정보");
        } catch (NullPointerException e) {
            return ApiResponse.fail(HttpStatus.BAD_REQUEST, "필수 값 누락: " + e.getMessage());
        } catch (Exception ex) {
            return ApiResponse.fail(HttpStatus.INTERNAL_SERVER_ERROR, "모각뜨 방 생성 중 오류 발생");
        }
    }


    @GetMapping("/sessions/{sessionId}/connections")
    @Operation(summary = "모각뜨 방 참여하기")
    public ResponseEntity<?> enterRoom(@PathVariable("sessionId") String sessionId, Authentication auth) {
        try {
            System.out.println("방 참여에 들어온 것");
            if (auth == null || auth.getPrincipal() == null) {
                return ApiResponse.fail(HttpStatus.UNAUTHORIZED, "사용자 인증 정보가 없습니다");
            }

            Long userId = (Long) auth.getPrincipal();
            System.out.println("userId: " + userId);

            Session session = roomService.getActiveSession(sessionId);
            Connection connection = session.createConnection();
            if(connection == null) {
                return ApiResponse.fail(HttpStatus.INTERNAL_SERVER_ERROR, "연결이 이루어지지 않음");
            }
            RoomEnterResponseDto roomResponseDto = roomService.joinRoom(sessionId, userId, connection.getToken());

            return ApiResponse.success(HttpStatus.OK, "모각뜨 방 입장 성공", roomResponseDto);
        } catch (OpenViduHttpException | OpenViduJavaClientException ex) {
            return ApiResponse.fail(HttpStatus.INTERNAL_SERVER_ERROR, "OpenVidu 서버 오류: " + ex.getMessage());
        } catch (NullPointerException e) {
            return ApiResponse.fail(HttpStatus.BAD_REQUEST, "필수 값 누락: " + e.getMessage());
        } catch (ClassCastException e) {
            return ApiResponse.fail(HttpStatus.UNAUTHORIZED, "잘못된 사용자 인증 정보");
        } catch (Exception ex) {
            return ApiResponse.fail(HttpStatus.INTERNAL_SERVER_ERROR, "모각뜨 방 입장 중 오류 발생");
        }
    }

    @GetMapping("/sessions")
    @Operation(summary = "모각뜨 방 전체 조회하기")
    public ResponseEntity<?> listRooms() {
        try {
            List<Room> rooms = roomService.getRooms();
            return ApiResponse.success(HttpStatus.OK, "모각뜨 방 조회 성공", rooms);
        } catch (ClassCastException e) {
            return ApiResponse.fail(HttpStatus.UNAUTHORIZED, "잘못된 사용자 인증 정보");
        } catch (Exception ex) {
            return ApiResponse.fail(HttpStatus.BAD_REQUEST, "모각뜨 방 조회 중 오류 발생");
        }
    }

    @DeleteMapping("/sessions/{sessionId}")
    @Operation(summary = "모각뜨 방 나가기")
    public ResponseEntity<?> exitRoom(@PathVariable("sessionId") String sessionId, Authentication auth) {
        try {
            if (auth == null || auth.getPrincipal() == null) {
                return ApiResponse.fail(HttpStatus.UNAUTHORIZED, "사용자 인증 정보가 없습니다");
            }

            Object principal = auth.getPrincipal();
            Long userId = (Long) principal;

            roomService.exitRoom(sessionId, userId);
            return ApiResponse.success(HttpStatus.OK, "모각뜨 방 나가기 성공");
        } catch (ClassCastException e) {
            return ApiResponse.fail(HttpStatus.UNAUTHORIZED, "잘못된 사용자 인증 정보");
        } catch (NullPointerException e) {
            return ApiResponse.fail(HttpStatus.BAD_REQUEST, "필수 값 누락: " + e.getMessage());
        } catch (Exception ex) {
            return ApiResponse.fail(HttpStatus.BAD_REQUEST, "모각뜨 방 나가기 중 오류 발생");
        }
    }

}
