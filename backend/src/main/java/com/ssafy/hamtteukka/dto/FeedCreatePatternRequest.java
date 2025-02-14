package com.ssafy.hamtteukka.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FeedCreatePatternRequest {
    @NotEmpty(message = "AI 도안 이미지는 필수입니다")
    private String base64Image;

    @NotEmpty(message = "제목은 필수 입력값입니다")
    @Size(max = 100, message = "제목은 최대 100자까지 입력 가능합니다")
    private String title;

    private String content;

    @Size(min = 1, message = "카테고리는 필수 입력값입니다")
    private List<Integer> categoryIds;
}