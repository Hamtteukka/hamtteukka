package com.ssafy.hamtteukka.dto;

import lombok.Getter;

@Getter
public class CommentResponse {

    private Long commentId;

    public CommentResponse(Long commentId) {
        this.commentId = commentId;
    }
}
