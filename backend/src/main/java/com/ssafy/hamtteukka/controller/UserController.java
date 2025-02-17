package com.ssafy.hamtteukka.controller;

import com.ssafy.hamtteukka.common.ApiResponse;
import com.ssafy.hamtteukka.dto.UserSubscriptionResponseDto;
import com.ssafy.hamtteukka.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import lombok.extern.slf4j.Slf4j;
import java.io.IOException;
import java.security.SignatureException;
import java.util.List;
import java.util.Map;

@Slf4j
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
        log.info("back signUp api");
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

    @GetMapping("/{userId}")
    public ResponseEntity<?> getUserInfo(
            @PathVariable long userId,
            Authentication authentication
    ) {
        Long signInId = (Long) authentication.getPrincipal();
        try {
            return ApiResponse.success(
                    HttpStatus.OK,
                    "User information retrieved successfully",
                    userService.getUserInfo(userId,signInId)
            );
        }catch (IllegalArgumentException ie) {
            return ApiResponse.fail(HttpStatus.NOT_FOUND, ie.getMessage());
        }catch (Exception ex) {
            return ApiResponse.fail(HttpStatus.BAD_REQUEST, "Bad Request");
        }
    }

    /**
     * 사용자 정보 수정 API
     * @param nickname
     * @param profileImage
     * @param authentication
     * @return 닉네임 및 프로필 이미지 변경 성공 시 성공 응답, 실패 시 적절한 오류 응답
     * @throws IllegalArgumentException 닉네임 중복
     * @throws SignatureException 인증 정보가 유효하지 않은 경우
     * @throws Exception 기타 예외 발생 시
     */
    @PutMapping(value = "", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> modifyMyInfo(
            @RequestPart("nickname") String nickname,
            @RequestPart(value = "profileId", required = false) MultipartFile profileImage,
            Authentication authentication
    ){
        Long userId = (Long) authentication.getPrincipal();
        try {
            return ApiResponse.success(
                    HttpStatus.OK,
                    "User information modification completed",
                    userService.modifyUser(userId, nickname, profileImage)
            );
        } catch (IllegalArgumentException ex) {
            return ApiResponse.fail(HttpStatus.CONFLICT,ex.getMessage());
        } catch (SignatureException se) {
            return ApiResponse.fail(HttpStatus.UNAUTHORIZED, se.getMessage());
        } catch (Exception ex) {
            log.error("user profile update error: {}", ex.getMessage());
            return ApiResponse.fail(HttpStatus.BAD_REQUEST, "Bad Request");
        }
    }
    @PostMapping("/subscribe")
    @Operation(summary = "구독하기")
    public ResponseEntity<?> subscribe(
            @RequestBody Map<String, String> requestBody,
            Authentication authentication
    ){
        try {
            long singId = (Long) authentication.getPrincipal();
            long userId = requestBody.get("userId")==null?0:Long.parseLong(requestBody.get("userId"));

            if(userId==0L||singId==0L) return ApiResponse.fail(
                    HttpStatus.NOT_FOUND,
                    "구독할 사람을 찾을 수 없습니다"
            );

            return ApiResponse.success(
                    HttpStatus.OK,
                    "구독하기 성공",
                    userService.subscribe(userId, singId)
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
    @Operation(summary = "구독 취소하기")
    public ResponseEntity<?> subscribeCancle(
            @RequestBody Map<String, String> requestBody,
            Authentication authentication
    ){
        try {
            long singId = (Long) authentication.getPrincipal();
            long userId = requestBody.get("userId")==null?0:Long.parseLong(requestBody.get("userId"));

            if(userId==0L||singId==0L) return ApiResponse.fail(
                    HttpStatus.NOT_FOUND,
                    "구독 취소할 사람을 찾을 수 없습니다"
            );

            return ApiResponse.success(
                    HttpStatus.OK,
                    "구독 취소 성공",
                    userService.unsubscribe(userId, singId)
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


    @GetMapping("/subscription")
    @Operation(summary = "구독한 유저 리스트 불러오기")
    public ResponseEntity<?> getSubscribedUsers(Authentication authentication) {
        Long subscribeId = (Long) authentication.getPrincipal();

        if (subscribeId == 0L) {
            return ApiResponse.fail(HttpStatus.UNAUTHORIZED, "사용자 인증 정보가 없습니다");
        }
        return ApiResponse.success(
                HttpStatus.OK,
                "구독 유저 받아오기 완료",
                userService.getSubscription(subscribeId)
        );
    }

    @GetMapping("/myinfo")
    public ResponseEntity<?> getMyInfo(Authentication authentication){
        try {
            Long userId = (Long) authentication.getPrincipal();
            return ApiResponse.success(HttpStatus.OK,"",userService.getUserInfo(userId,userId));
        }catch (IllegalArgumentException ie){
            return ApiResponse.fail(HttpStatus.UNAUTHORIZED, ie.getMessage());
        }catch (Exception e){return ApiResponse.fail(HttpStatus.INTERNAL_SERVER_ERROR, "Invalid or expired access token");}
    }
}
