package com.ssafy.hamtteukka.repository;

import com.ssafy.hamtteukka.domain.User;
import com.ssafy.hamtteukka.domain.UserSubscribe;
import com.ssafy.hamtteukka.dto.UserSubscriptionResponseDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface SubscribeRepository extends JpaRepository<UserSubscribe,Long> {
    @Query("SELECT u.id FROM UserSubscribe u WHERE u.provider = :provider AND u.subscriber = :subscriber")
    Optional<Long> findIdByProviderAndSubscriber(@Param("provider") User provider, @Param("subscriber") User subscriber);

    @Query("""
        select new com.ssafy.hamtteukka.dto.UserSubscriptionResponseDto(
            us.subscriber.id,
            us.subscriber.nickname,
            us.subscriber.profileId,
            count(subs)
        )
        from UserSubscribe us
        left join UserSubscribe subs on us.subscriber.id = subs.provider.id
        where us.provider.id = :userId
        group by us.subscriber.id, us.subscriber.nickname, us.subscriber.profileId
    """)
    List<UserSubscriptionResponseDto> getSubscribedUsers(Long userId);
}
