package com.ssafy.hamtteukka.service;

import com.ssafy.hamtteukka.common.S3FileLoader;
import com.ssafy.hamtteukka.domain.*;

import com.ssafy.hamtteukka.dto.*;
import com.ssafy.hamtteukka.repository.CategoryRepository;
import com.ssafy.hamtteukka.repository.FeedImageRepository;
import com.ssafy.hamtteukka.repository.FeedRepository;
import com.ssafy.hamtteukka.repository.UserRepository;
import com.ssafy.hamtteukka.repository.SavedFeedRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class FeedService {

    private final FeedRepository feedRepository;
    private final SavedFeedRepository savedFeedRepository;
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
    public FeedPaginationResponseDto getSavedFeeds(Long userId, Long cursor, Integer limit) {
        int pageSize = (limit != null) ? limit : 20;

        Slice<FeedResponseDto> slice = feedRepository.findSavedFeedsWithPagination(
                userId,
                cursor,
                PageRequest.of(0, pageSize)
        );

        List<FeedResponseDto> feeds = slice.stream()
                .map(feed -> new FeedResponseDto(
                        feed.getFeedId(),
                        s3FileLoader.getFileUrl(feed.getThumbnail()),
                        feed.getTitle(),
                        s3FileLoader.getFileUrl(feed.getUserProfile())
                ))
                .collect(Collectors.toList());
        boolean hasNextFeed = slice.hasNext();
        Long nextCursorId = hasNextFeed ? feeds.get(feeds.size() - 1).getFeedId() : null;

        return new FeedPaginationResponseDto(feeds, hasNextFeed, nextCursorId);
    }

    /**
     * 저장된 AI 도안 가져오기 메서드
     *
     * @param userId
     * @param cursor
     * @param limit
     * @return
     */
    public FeedPaginationResponseDto getSavedAiFeeds(Long userId, Long cursor, Integer limit) {
        int pageSize = (limit != null) ? limit : 20;

        Slice<FeedResponseDto> slice = feedRepository.findSavedFeedsWithPagination(
                userId,
                cursor,
                PageRequest.of(0, pageSize)
        );

        List<FeedResponseDto> feeds = slice.stream()
                .map(feed -> new FeedResponseDto(
                        feed.getFeedId(),
                        s3FileLoader.getFileUrl(feed.getThumbnail()),
                        feed.getTitle(),
                        s3FileLoader.getFileUrl(feed.getUserProfile())
                ))
                .collect(Collectors.toList());
        boolean hasNextFeed = slice.hasNext();
        Long nextCursorId = hasNextFeed ? feeds.get(feeds.size() - 1).getFeedId() : null;

        return new FeedPaginationResponseDto(feeds, hasNextFeed, nextCursorId);
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
     *
     * @param userId
     * @param request
     * @return
     * @throws IOException
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

        // 도안 피드 임베드 검증
        Feed knittingPatternsFeed = null;
        if (request.getFeedType() == FeedType.NORMAL && request.getKnittingPatternsFeedId() != null) {
            // 임베드하려는 도안피드가 존재하는지 검증
            knittingPatternsFeed = feedRepository.findById(request.getKnittingPatternsFeedId())
                    .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 도안입니다"));

            // 임베드하려는 피드가 도안 피드인지 검증
            if (knittingPatternsFeed.getFeedType() != FeedType.PATTERN.getValue()) {
                throw new IllegalArgumentException("도안 피드만 임베드할 수 있습니다");
            }
        }

        // 피드 생성 및 저장
        Feed feed = new Feed(
                user,
                request.getTitle(),
                request.getContent(),
                request.getFeedType().getValue(),
                categories,
                knittingPatternsFeed
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

    /**
     * 피드 상세조회 메서드
     *
     * @param userId
     * @param feedId
     * @return
     */
    public FeedDetailResponse getFeedDetail(Long userId, Long feedId) {
        // 피드 조회
        Feed feed = feedRepository.findById(feedId)
                .orElseThrow(() -> new EntityNotFoundException("피드를 찾을 수 없습니다"));

        // 이미지 URL 목록 생성
        List<FeedDetailResponse.Image> images = feed.getFeedImages().stream()
                .map(image -> new FeedDetailResponse.Image(
                        s3FileLoader.getFileUrl(image.getId()),
                        image.getImageType()
                ))
                .collect(Collectors.toList());

        // 카테고리 목록
        List<Integer> categories = feed.getFeedCategories().stream()
                .map(fc -> fc.getCategory().getId().intValue())
                .collect(Collectors.toList());

        // 임베드된 도안 정보
        FeedDetailResponse.AiPattern aiPattern = null;
        Feed knittingPatternsFeed = feed.getKnittingPatternsFeed();
        if (knittingPatternsFeed != null) {
            FeedImage feedImage = knittingPatternsFeed.getFeedImages().get(0);
            if (feedImage != null) {
                aiPattern = new FeedDetailResponse.AiPattern(
                        knittingPatternsFeed.getId(),
                        knittingPatternsFeed.getTitle(),
                        s3FileLoader.getFileUrl(feedImage.getId())
                );
            }
        }

        // 작성자 정보
        FeedDetailResponse.User user = new FeedDetailResponse.User(
                feed.getUser().getId(),
                feed.getUser().getNickname(),
                s3FileLoader.getFileUrl(feed.getUser().getProfileId())
        );

        // isOwner 확인
        boolean isOwner = feed.getUser().getId().equals(userId);

        // isScrap 확인 (내 게시물이 아닌 경우에만)
        Boolean isScrap = null;
        if (!isOwner) {
            isScrap = savedFeedRepository.existsByUserIdAndFeedId(userId, feedId);
        }

        return new FeedDetailResponse(
                feed.getId(),
                feed.getTitle(),
                feed.getContent(),
                images,
                categories,
                aiPattern,
                user,
                isOwner,
                isScrap
        );
    }

    /**
     * 피드 저장 On/Off (스크랩) 메서드
     *
     * isScrap = true 면 피드 저장 Off 한다는 것
     * isSCrap = false 면 피드 저장 On 한다는 것
     *
     * @param userId
     * @param feedId
     * @param isScrap
     * @return
     */
    @Transactional
    public boolean toggleFeedSave(Long userId, Long feedId, boolean isScrap) throws Exception {

        // 피드 저장 해제 (스크랩 Off)
        if (isScrap) {
            SavedFeed savedFeed = savedFeedRepository.findByUserIdAndFeedId(userId, feedId)
                    .orElseThrow(() -> new EntityNotFoundException("스크랩된 피드를 찾을 수 없습니다."));

            savedFeedRepository.delete(savedFeed);
            return false;
        }

        // 피드 저장 (스크랩 On)
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("사용자를 찾을 수 없습니다."));

        Feed feed = feedRepository.findById(feedId)
                .orElseThrow(() -> new EntityNotFoundException("피드를 찾을 수 없습니다."));

        if (savedFeedRepository.findByUserIdAndFeedId(userId, feedId).isPresent()) {
            throw new Exception("이미 스크랩된 피드입니다.");
        }

        savedFeedRepository.save(new SavedFeed(user, feed));
        return true;
    }

}
