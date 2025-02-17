package com.ssafy.hamtteukka.dto;

import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
public class CommentListResponseDto {
    private final Long commentId;
    private final String userId;
    private final String nickname;
    private final String profileId;
    private final String content;
    private final LocalDateTime createDate;
    private final boolean owner;
    private final List<CommentListResponseDto> subComments;

    public CommentListResponseDto(Long commentId, String userId, String nickname, String profileUrl,
                                  String content, LocalDateTime createDate, boolean owner,
                                  List<CommentListResponseDto> subComments) {
        this.commentId = commentId;
        this.userId = userId;
        this.nickname = nickname;
        this.profileId = profileUrl;
        this.content = content;
        this.createDate = createDate;
        this.owner = owner;
        this.subComments = subComments;
    }
}