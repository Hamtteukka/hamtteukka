package com.ssafy.hamtteukka.repository;

import com.ssafy.hamtteukka.domain.UserSubscribe;
import com.ssafy.hamtteukka.dto.UserSubscriptionResponseDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SubscribeRepository extends JpaRepository<UserSubscribe, Long> {
    @Query("""
                select new com.ssafy.hamtteukka.dto.UserSubscriptionResponseDto(
                    us.provider.id,
                    us.provider.nickname,
                    us.provider.profileId,
                    count(subs)
                )
                from UserSubscribe us
                left join UserSubscribe subs on us.provider.id = subs.provider.id
                where us.subscriber.id = :userId
                group by us.provider.id, us.provider.nickname, us.provider.profileId
            """)
    List<UserSubscriptionResponseDto> getSubscribedUsers(@Param("userId") Long userId);

    @Modifying
    @Query("""
                delete from UserSubscribe us
                where us.provider.id = :providerId
                and us.subscriber.id = :subscriberId
            """)
    int deleteByIds(
            @Param("providerId") Long providerId,
            @Param("subscriberId") Long subscriberId);

    @Query("""
                SELECT COUNT(us)
                FROM UserSubscribe us
                WHERE us.provider.id = :providerId
            """)
    long countSubscribedUsers(@Param("providerId") Long providerId);

}
