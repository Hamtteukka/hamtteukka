package com.ssafy.hamtteukka.config;

import com.ssafy.hamtteukka.domain.Room;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

@Configuration
public class RedisConfig {
    @Value("${spring.data.redis.host}")
    private String host;

    @Value("${spring.data.redis.port}")
    private int port;

    @Bean
    public RedisConnectionFactory redisConnectionFactory() {
        System.out.println(host + ":" + port);
        return new LettuceConnectionFactory(host, port);
    }

    @Bean
    @Qualifier("roomRedisTemplate")
    public RedisTemplate<?,?> roomRedisTemplate() {
        RedisTemplate<String, Object> redisTemplate = new RedisTemplate<>();
        redisTemplate.setConnectionFactory(redisConnectionFactory());
        redisTemplate.setKeySerializer(new StringRedisSerializer());
        redisTemplate.setHashKeySerializer(new StringRedisSerializer());

        redisTemplate.setValueSerializer(new Jackson2JsonRedisSerializer<>(Room.class));
        redisTemplate.setHashValueSerializer(new Jackson2JsonRedisSerializer<>(Room.class));
        return redisTemplate;
    }

    @Bean
    @Qualifier("userRedisTemplate")
    public RedisTemplate<?,?> userRedisTemplate() {
        RedisTemplate<String, Object> redisTemplate = new RedisTemplate<>();
        redisTemplate.setConnectionFactory(redisConnectionFactory());
        redisTemplate.setKeySerializer(new StringRedisSerializer());
        redisTemplate.setHashKeySerializer(new StringRedisSerializer());

        redisTemplate.setValueSerializer(new Jackson2JsonRedisSerializer<>(Room.class));
        redisTemplate.setHashValueSerializer(new Jackson2JsonRedisSerializer<>(Room.class));
        return redisTemplate;
    }
}
