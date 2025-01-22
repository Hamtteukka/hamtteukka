package com.ssafy.hamtteukka.exception;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;

@Getter
@Builder
@RequiredArgsConstructor
public class ErrorResponse {

    private final String status; // "fail"등 상태 표시
    private final String message;

    public static ResponseEntity<ErrorResponse> error(CustomException e) {
        return ResponseEntity
                .status(e.getErrorCode().getStatus()) // HTTP 상태 코드
                .body(ErrorResponse.builder()
                        .status("fail") // 실패 응답 시 "fail"
                        .message(e.getMessage())
                        .build());
    }
}
