package com.ssafy.hamtteukka.common;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

/**
 * 공통 API 응답 클래스
 * @param <T> 응답 데이터의 타입
 */
public class ApiResponse<T> {
    private final String status;
    private final String message;
    private final T data;

    public ApiResponse(String status, String message, T data) {
        this.status = status;
        this.message = message;
        this.data = data;
    }

    public String getStatus() {
        return status;
    }

    public String getMessage() {
        return message;
    }

    public T getData() {
        return data;
    }

    /**
     * data 전송이 필요한 성공 응답
     *
     * @param message 메시지
     * @param data    데이터
     * @param <T>     데이터의 타입
     * @return ResponseEntity
     */
    public static <T> ResponseEntity<ApiResponse<T>> success(HttpStatus status, String message, T data) {
        return ResponseEntity.status(status)
                .body(new ApiResponse<>("success", message, data));
    }

    /**
     * 데이터 전송 필요없는 성공 응답
     *
     * @param message 메시지
     * @return ResponseEntity
     */
    public static <T> ResponseEntity<ApiResponse<T>> success(HttpStatus status,String message) {
        return success(status,message, null);
    }

    /**
     * 실패 응답
     *
     * @param status  HTTP 상태 코드
     * @param message 메시지
     * @return ResponseEntity
     */
    public static <T> ResponseEntity<ApiResponse<T>> fail(HttpStatus status, String message) {
        return ResponseEntity.status(status)
                .body(new ApiResponse<>("fail", message, null));
    }
}
