package com.ssafy.hamtteukka.repository;

import com.ssafy.hamtteukka.domain.User;
import com.ssafy.hamtteukka.domain.UserSubscribe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface SubscribeRepository extends JpaRepository<UserSubscribe,Long> {

    @Query("SELECT u.id FROM UserSubscribe u WHERE u.provider = :provider AND u.subscriber = :subscriber")
    Optional<Long> findIdByProviderAndSubscriber(@Param("provider") User provider, @Param("subscriber") User subscriber);

    @Query("SELECT us.provider FROM UserSubscribe us WHERE subscriber = :subscriber")
    List<User> findProvider(@Param("subscriber") User subscriber);

    int countByProvider(User provider);
}
