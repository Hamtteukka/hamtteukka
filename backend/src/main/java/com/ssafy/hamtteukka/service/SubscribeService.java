package com.ssafy.hamtteukka.service;

import com.ssafy.hamtteukka.domain.User;
import com.ssafy.hamtteukka.domain.UserSubscribe;
import com.ssafy.hamtteukka.repository.SubscribeRepository;
import com.ssafy.hamtteukka.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class SubscribeService {
    private final SubscribeRepository subscribeRepository;
    private final UserRepository userRepository;
    public boolean subscribe(Long providerId, Long subscribeId){

        // id로 각각 유저 받아오기
        User providerUser = userRepository.getReferenceById(providerId);
        User subscribeUser = userRepository.getReferenceById(subscribeId);


        // 구독자, 구독 당하는사람 저장
        UserSubscribe savedSubscribe = subscribeRepository.save(new UserSubscribe(providerUser,subscribeUser));

        /**
         * 저장한 UserSubscribe 객체가
         * 각각 providerUser와 subscribeUser가 같으면
         * True 반환
         * 아니면 False
         */
        if(savedSubscribe.getSubscriber().equals(subscribeUser)&&savedSubscribe.getProvider().equals(providerUser)){
            return true;
        }
        return false;
    }


    public boolean subscribeCancle(Long providerId, Long subscribeId){

        // id로 각각 유저 받아오기
        User providerUser = userRepository.getReferenceById(providerId);
        User subscribeUser = userRepository.getReferenceById(subscribeId);


        // UserSubscribe PK 받아오기
        Optional<Long> userSubscribeId = subscribeRepository.findIdByProviderAndSubscriber(providerUser,subscribeUser);

        log.info(userSubscribeId.toString());

        if(userSubscribeId.isEmpty()){
            throw new NullPointerException("데이터가 없습니다");
        }

        subscribeRepository.deleteById(userSubscribeId.get());

        return true;
    }
}
