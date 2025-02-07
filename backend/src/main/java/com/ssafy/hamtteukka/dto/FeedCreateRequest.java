package com.ssafy.hamtteukka.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class FeedCreateRequest {
    @Size(min = 1, message = "이미지는 최소 1개 이상 업로드해야 합니다")
    private List<MultipartFile> images;

    @NotEmpty(message = "제목은 필수 입력값입니다")
    @Size(max = 100, message = "제목은 최대 100자까지 입력 가능합니다")
    private String title;

    private String content; // 선택

    @Size(min = 1, message = "카테고리는 필수 입력값입니다")
    private List<Integer> categoryIds;

    private Long knittingPatternsFeedId; // 선택 (임베드된 "뜨개도안 feed")

    @NotNull(message = "피드 타입은 필수 입력값입니다")
    private FeedType feedType; // "NORMAL" : 일반 feed, "PATTERN" : 뜨개도안 feed
}