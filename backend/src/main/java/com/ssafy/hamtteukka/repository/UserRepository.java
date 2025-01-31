package com.ssafy.hamtteukka.repository;

import com.ssafy.hamtteukka.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findById(Long id);
    boolean existsByNickname(String nickname);
    
    
    // 닉네임으로 유저아이디 받아오기
    @Query("SELECT u.id FROM User u WHERE u.nickname = :nickname")
    Optional<Long> findIdByNickname(@Param("nickname") String nickname);
}
