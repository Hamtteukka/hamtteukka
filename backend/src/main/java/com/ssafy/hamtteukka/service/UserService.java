package com.ssafy.hamtteukka.service;

import com.ssafy.hamtteukka.domain.User;
import com.ssafy.hamtteukka.dto.UserSignUpDTO;
import com.ssafy.hamtteukka.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * 닉네임 중복 여부 확인
     *
     * @param nickname 닉네임
     * @return 중복 여부
     */
    public boolean isNicknameDuplicate(String nickname) {
        return userRepository.existsByNickname(nickname);
    }

    /**
     * 회원가입 처리
     *
     * @param userSignUpDTO 회원가입 요청 DTO
     * @return DB에 등록된 사용자 엔티티
     */
    @Transactional
    public User registerUser(UserSignUpDTO userSignUpDTO) {
        if (isNicknameDuplicate(userSignUpDTO.getNickname())) {
            throw new IllegalArgumentException("nickname already exists");
        }

        if (userSignUpDTO.getUserId() <= 0 ||
                userSignUpDTO.getNickname() == null ||
                userSignUpDTO.getNickname().isEmpty()
        ) {
            throw new IllegalArgumentException("Invalid input data");
        }


        User user = new User(
                userSignUpDTO.getUserId(),
                userSignUpDTO.getNickname(),
                userSignUpDTO.getProfileId()
        );

        return userRepository.save(user);
    }
}
