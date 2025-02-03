package com.ssafy.hamtteukka.service;

import com.ssafy.hamtteukka.domain.Feed;
import com.ssafy.hamtteukka.repository.FeedRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class FeedService {

    private final FeedRepository feedRepository;

    //피드 삭제
    @Transactional
    public void deleteFeed(Long userId, Long feedId) {
        // 1. 피드 존재 여부 확인
        Feed feed = feedRepository.findById(feedId)
                .orElseThrow(() -> new EntityNotFoundException("피드를 찾을 수 없습니다"));

        // 2. 피드 작성자와 요청한 사용자가 같은지 확인
        if (!feed.getUser().getId().equals(userId)) {
            throw new IllegalArgumentException("피드를 삭제할 권한이 없습니다");
        }

        // 3. 피드 삭제 (연관된 댓글, 저장된 피드도 함께 삭제)
        feedRepository.delete(feed);
    }

}
