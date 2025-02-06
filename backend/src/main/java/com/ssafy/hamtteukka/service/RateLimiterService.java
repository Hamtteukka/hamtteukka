package com.ssafy.hamtteukka.service;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.concurrent.TimeUnit;

@Service
public class RateLimiterService {
    private final RedisTemplate<String, Integer> redisTemplate;
    private final String REQUEST_REDIS_KEY = "request:";
    private final int REQUEST_LIMIT = 3;

    public RateLimiterService(@Qualifier("aiRedisTemplate") RedisTemplate<String, Integer> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    /**
     * userId별 요청 횟수를 체크
     * @param userId 유저 ID
     * @return 요청 수행 가능 여부
     */
    public boolean isRequestAllowed(Long userId) {
        String key = REQUEST_REDIS_KEY + userId;
        ValueOperations<String, Integer> ops = redisTemplate.opsForValue();

        Integer currentCount = ops.get(key);
        currentCount = currentCount == null ? 0 : currentCount;

        if(currentCount >= REQUEST_LIMIT) return false;

        if (currentCount == 0) {
            redisTemplate.expire(key, getSecondsUntilMidnight(), TimeUnit.SECONDS);
        }
        ops.increment(key, 1); // increment() 사용 가능
        return true;
    }

    public int getRequestCount(Long userId) {
        String key = REQUEST_REDIS_KEY + userId;
        ValueOperations<String, Integer> ops = redisTemplate.opsForValue();

        Integer currentCount = ops.get(key);
        return currentCount == null ? REQUEST_LIMIT : REQUEST_LIMIT-currentCount;
    }

    /**
     * 현재 시점부터 내일 0시까지 남은 초를 계산
     * @return 남은 시간(초)
     */
    private long getSecondsUntilMidnight() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime flag = now.toLocalDate().atStartOfDay().plusDays(1); // 다음 날 00:00:00
        return flag.atZone(ZoneId.systemDefault()).toEpochSecond() - now.atZone(ZoneId.systemDefault()).toEpochSecond();
    }
}
