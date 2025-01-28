package com.ssafy.hamtteukka.controller;

import com.ssafy.hamtteukka.common.ApiResponse;
import com.ssafy.hamtteukka.dto.UserSignUpDTO;
import com.ssafy.hamtteukka.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("")
    public ResponseEntity<?> signUp(@RequestBody UserSignUpDTO userSignUpDTO) {
        try {
            userService.registerUser(userSignUpDTO);
            return ApiResponse.success(HttpStatus.CREATED,"User registered successfully");
        } catch (IllegalArgumentException ex) {
            if (ex.getMessage().equals("nickname already exists")) {
                return ApiResponse.fail(HttpStatus.CONFLICT,"nickname already exists");
            }
            return ApiResponse.fail(HttpStatus.BAD_REQUEST, ex.getMessage());
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
