package com.ssafy.hamtteukka.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor 
public enum ErrorCode {
    /**
     * 임시(추후 논의)
     */
    //== 400 Bad Request==//
    NOT_SUPPORTED_HTTP_METHOD(HttpStatus.BAD_REQUEST, "지원하지 않는 Http Method 방식입니다."),
    NOT_VALID_METHOD_ARGUMENT(HttpStatus.BAD_REQUEST, "유효하지 않은 Request Body 혹은 Argument입니다."),

    //== 404 Not Found ==//
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 사용자를 찾을 수 없습니다."),
    FEED_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 피드를 찾을 수 없습니다."),

    //== 500 INTERNAL SERVER ERROR ==//
    ROOM_CAPACITY_OVER(HttpStatus.INTERNAL_SERVER_ERROR, "정원초과");

    private final HttpStatus status;
    private final String message;

}