package com.ssafy.hamtteukka.repository;

import com.ssafy.hamtteukka.domain.User;
import com.ssafy.hamtteukka.dto.UserInfoResponseDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByKakaoId(Long id);
    Optional<User> findById(Long id);

    Optional<User> findByKakaoId(Long kakaoId);

    boolean existsByNickname(String nickname);
    // 닉네임으로 유저아이디 받아오기

    @Query("SELECT u.id FROM User u WHERE u.nickname = :nickname")
    Optional<Long> findIdByNickname(@Param("nickname") String nickname);

    @Modifying
    @Query("UPDATE User u SET u.nickname = :nickname, u.profileId = :profileId WHERE u.id = :id")
    int updateUser(Long id, String nickname, String profileId);

    @Query(value = """
            SELECT DISTINCT new com.ssafy.hamtteukka.dto.UserInfoResponseDto(
                           u.id, u.nickname, u.profileId,
                           (SELECT COUNT(s) FROM UserSubscribe s WHERE s.provider.id = u.id),
                           (CASE WHEN EXISTS (SELECT 1 FROM UserSubscribe s2 WHERE s2.provider.id = :userId AND s2.subscriber.id = :signInUserId) THEN true ELSE false END)
                        ) FROM User u LEFT JOIN UserSubscribe s ON u.id = s.provider.id WHERE u.id = :userId
            """)
    UserInfoResponseDto findUserInfo(@Param("userId") Long userId, @Param("signInUserId") Long signInUserId);
}