package com.ssafy.hamtteukka.controller;

import com.ssafy.hamtteukka.common.ApiResponse;
import com.ssafy.hamtteukka.dto.NicknameRequestDto;
import com.ssafy.hamtteukka.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping(value = "", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> signUp(
            @RequestPart("nickname") String nickname,
            @RequestPart(value = "profileImage", required = false) MultipartFile profileImage,
            HttpServletRequest request,
            HttpServletResponse response
    ){
        try {
            return ApiResponse.success(
                    HttpStatus.CREATED,
                    "User registered successfully",
                    userService.registerUser(nickname,profileImage,request,response)
            );
        } catch (IllegalArgumentException ex) {
            if (ex.getMessage().equals("nickname already exists")) {
                return ApiResponse.fail(HttpStatus.CONFLICT,"nickname already exists");
            }
            return ApiResponse.fail(HttpStatus.UNAUTHORIZED, ex.getMessage());
        } catch (IOException io) {
            return ApiResponse.fail(HttpStatus.UNSUPPORTED_MEDIA_TYPE, io.getMessage());
        } catch (Exception ex) {
            return ApiResponse.fail(HttpStatus.BAD_REQUEST, "Bad Request");
        }
    }

    @GetMapping("/nickname/{nickname}")
    public ResponseEntity<?> checkNicknameDuplicate(@PathVariable String nickname) {
        try {
            boolean isAvailable = !userService.isNicknameDuplicate(nickname);
            return ApiResponse.success(
                    HttpStatus.OK,
                    isAvailable?"Nickname is available":"Nickname is already take",
                    Map.of("isAvailable",isAvailable)

            );
        }catch (Exception ex) {
            return ApiResponse.fail(HttpStatus.BAD_REQUEST, "Bad Request");
        }
    }

    @PostMapping("/subscribe")
    public ResponseEntity<?> subscribe(@RequestBody NicknameRequestDto dto, Authentication authentication){
        try {
            Optional<Long> providerId = userService.getUserIdByNickname(dto.getNickname());

            // 유저가 존재하지 않는 경우 처리
            if (providerId.isEmpty()) {
                return ApiResponse.fail(
                        HttpStatus.NOT_FOUND,
                        "유저 닉네임을 찾을 수 없습니다"
                );
            }

            Long subscribeId = (Long) authentication.getPrincipal();

            return ApiResponse.success(
                    HttpStatus.OK,
                    "구독하기 성공",
                    Map.of("isSubscribe",userService.subscribe(providerId.get(), subscribeId))

            );
        } catch (EntityNotFoundException e) {
            return ApiResponse.fail(HttpStatus.NOT_FOUND, e.getMessage());
        } catch (IllegalArgumentException e) {
            return ApiResponse.fail(HttpStatus.FORBIDDEN, e.getMessage());
        } catch (Exception e) {
            return ApiResponse.fail(HttpStatus.INTERNAL_SERVER_ERROR, "서버 오류가 발생했습니다");
        }
    }

    @DeleteMapping("/subscribe")
    public ResponseEntity<?> subscribeCancle(@RequestBody NicknameRequestDto dto, Authentication authentication){
        try {
            Optional<Long> providerId = userService.getUserIdByNickname(dto.getNickname());

            // 유저가 존재하지 않는 경우 처리
            if (providerId.isEmpty()) {
                return ApiResponse.fail(
                        HttpStatus.NOT_FOUND,
                        "유저 닉네임을 찾을 수 없습니다"
                );
            }

            Long subscribeId = (Long) authentication.getPrincipal();

            return ApiResponse.success(
                    HttpStatus.OK,
                    "구독 취소하기 성공",
                    Map.of("isSubscribeCancle",userService.subscribeCancle(providerId.get(), subscribeId))

            );
        } catch(NullPointerException ex){
            return ApiResponse.fail(HttpStatus.NOT_FOUND, "삭제하는 대상이 없습니다.");
        } catch (EntityNotFoundException e) {
            return ApiResponse.fail(HttpStatus.NOT_FOUND, e.getMessage());
        } catch (IllegalArgumentException e) {
            return ApiResponse.fail(HttpStatus.FORBIDDEN, e.getMessage());
        } catch (Exception e) {
            return ApiResponse.fail(HttpStatus.INTERNAL_SERVER_ERROR, "서버 오류가 발생했습니다");
        }
    }

}
