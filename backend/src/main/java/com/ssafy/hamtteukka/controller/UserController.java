package com.ssafy.hamtteukka.controller;

import com.ssafy.hamtteukka.common.ApiResponse;
import com.ssafy.hamtteukka.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

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

}
