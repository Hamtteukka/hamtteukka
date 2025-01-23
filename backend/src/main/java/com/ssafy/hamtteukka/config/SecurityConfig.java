package com.ssafy.hamtteukka.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // CSRF 보호 비활성화 (테스트 환경에서는 사용하지 않아도 됨)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/swagger-ui/**", "/v3/api-docs","/v3/api-docs/**", "/swagger-ui.html" // Swagger 경로 허용

                        ).permitAll()
                        .anyRequest().authenticated()
                )
                .formLogin(form -> form.disable()); // 폼 로그인 비활성화
        return http.build();
    }
}
