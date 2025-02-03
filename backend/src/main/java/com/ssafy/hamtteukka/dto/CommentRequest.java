package com.ssafy.hamtteukka.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CommentRequest {

    private Long feedId;
    private String content;
    private Long parentCommentId;
}
