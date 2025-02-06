package com.ssafy.hamtteukka.service;

import com.ssafy.hamtteukka.common.S3FileLoader;
import com.ssafy.hamtteukka.domain.Category;
import com.ssafy.hamtteukka.domain.Feed;
import com.ssafy.hamtteukka.dto.FeedPaginationResponseDto;
import com.ssafy.hamtteukka.dto.FeedResponseDto;
import com.ssafy.hamtteukka.domain.FeedImage;
import com.ssafy.hamtteukka.domain.User;
import com.ssafy.hamtteukka.dto.FeedCreateRequest;
import com.ssafy.hamtteukka.dto.FeedCreateResponse;
import com.ssafy.hamtteukka.dto.SavedFeedPaginationResponseDto;
import com.ssafy.hamtteukka.dto.SavedFeedResponseDto;
import com.ssafy.hamtteukka.repository.CategoryRepository;
import com.ssafy.hamtteukka.repository.FeedImageRepository;
import com.ssafy.hamtteukka.repository.FeedRepository;
import com.ssafy.hamtteukka.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class FeedService {

    private final FeedRepository feedRepository;
    private final FeedImageRepository feedImageRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final S3FileLoader s3FileLoader;

    /**
     * 저장된 게시물 가져오기 메서드
     *
     * @param userId
     * @param cursor
     * @param limit
     * @return
     */
    public SavedFeedPaginationResponseDto getSavedFeeds(Long userId, Long cursor, Integer limit) {
        int pageSize = (limit != null) ? limit : 20;

        Slice<SavedFeedResponseDto> slice = feedRepository.findSavedFeedsWithPagination(
                userId,
                cursor,
                PageRequest.of(0, pageSize)
        );

        List<SavedFeedResponseDto> feeds = slice.getContent();
        boolean hasNextFeed = slice.hasNext();
        Long nextCursorId = hasNextFeed ? feeds.get(feeds.size() - 1).getSavedFeedId() : null;

        return new SavedFeedPaginationResponseDto(feeds, hasNextFeed, nextCursorId);
    }

    /**
     * 저장된 AI 도안 가져오기 메서드
     *
     * @param userId
     * @param cursor
     * @param limit
     * @return
     */
    public SavedFeedPaginationResponseDto getSavedAiFeeds(Long userId, Long cursor, Integer limit) {
        int pageSize = (limit != null) ? limit : 20;

        Slice<SavedFeedResponseDto> slice = feedRepository.findSavedAiFeedsWithPagination(
                userId,
                cursor,
                PageRequest.of(0, pageSize)
        );

        List<SavedFeedResponseDto> feeds = slice.getContent();
        boolean hasNextFeed = slice.hasNext();
        Long nextCursorId = hasNextFeed ? feeds.get(feeds.size() - 1).getSavedFeedId() : null;

        return new SavedFeedPaginationResponseDto(feeds, hasNextFeed, nextCursorId);
    }


    /**
     * 피드 삭제 메서드
     *
     * @param userId
     * @param feedId
     */
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

    public FeedPaginationResponseDto getFeedsByUserId(Long userId, Long cursor, int limit) {
        Slice<FeedResponseDto> feeds = feedRepository.findFeedsByUserIdWithCursor(
                userId, cursor, PageRequest.of(0, limit)
        );
        return new FeedPaginationResponseDto(
                feeds.getContent(), feeds.hasNext(),
                feeds.hasNext() ? feeds.getContent().get(feeds.getContent().size() - 1).getFeedId() : null
        );
    }

    public FeedPaginationResponseDto getAIFeedsByUserId(Long userId, Long cursor, int limit) {
        Slice<FeedResponseDto> feeds = feedRepository.findAIFeedsByUserIdWithCursor(
                userId, cursor, PageRequest.of(0, limit)
        );
        return new FeedPaginationResponseDto(
                feeds.getContent(), feeds.hasNext(),
                feeds.hasNext() ? feeds.getContent().get(feeds.getContent().size() - 1).getFeedId() : null
        );
    }

    /**
     * 피드 생성 메서드
     */
    @Transactional
    public FeedCreateResponse createFeed(Long userId, FeedCreateRequest request) throws IOException {

        List<MultipartFile> images = request.getImages();

        // images가 빈 리스트로 오는 경우 검증 추가
        if (images.isEmpty() || (images.size() == 1 && images.get(0).isEmpty())) {
            throw new IllegalArgumentException("이미지는 필수입니다");
        }

        // 이미지 개수 검증
        if (images.size() > 8) {
            throw new IllegalArgumentException("이미지는 1~8개 사이어야 합니다");
        }

        // 사용자 조회
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다"));

        // 카테고리 조회
        List<Category> categories = request.getCategoryIds().stream()
                .map(categoryId -> categoryRepository.findById(categoryId.longValue())
                        .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 카테고리입니다")))
                .collect(Collectors.toList());

        // 피드 생성 및 저장
        Feed feed = new Feed(
                user,
                request.getTitle(),
                request.getContent(),
                request.getFeedType().getValue(),
                categories
        );

        Feed savedFeed = feedRepository.save(feed);

        // 이미지 업로드 및 저장
        for (int i = 0; i < images.size(); i++) {
            String feedImageId = s3FileLoader.uploadFile(images.get(i));

            FeedImage feedImage = new FeedImage(feedImageId, savedFeed, i == 0 ? 0 : 1);
            feedImageRepository.save(feedImage);

        }

        return new FeedCreateResponse(savedFeed.getId());
    }
}
