package com.ssafy.hamtteukka.service;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
public class TokenBlacklistService {
    private final String BLACKLIST_REDIS_KEY = "blacklist";
    private final RedisTemplate<String, String> redisTemplate;

    public TokenBlacklistService(@Qualifier("userRedisTemplate") RedisTemplate<String, String> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    /**z
     * 블랙리스트에 토큰 추가
     * @param token 토큰 값
     * @param expirationTime 토큰의 만료 시간 (밀리초)
     */
    public void addToBlacklist(String token, long expirationTime) {
        long ttl = expirationTime - System.currentTimeMillis();
        if (ttl > 0) {
            redisTemplate.opsForValue().set(BLACKLIST_REDIS_KEY + token, "true", ttl, TimeUnit.MILLISECONDS);
        }
    }

    /**
     * 블랙리스트에 토큰이 있는지 확인
     * @param token 토큰 값
     * @return 블랙 T/F
     */
    public boolean isBlacklisted(String token) {
        return redisTemplate.opsForValue().get("blacklist:" + token) != null;
    }
}