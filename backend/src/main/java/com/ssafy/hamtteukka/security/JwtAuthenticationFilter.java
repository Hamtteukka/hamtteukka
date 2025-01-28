package com.ssafy.hamtteukka.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@Slf4j
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtTokenProvider jwtTokenProvider;

    public JwtAuthenticationFilter(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    // token 없어도되는 path
    private static final List<String> CHECK_URLS = Arrays.asList(
            "/feeds/search",
            "/swagger-ui",
            "/v3/api-docs",
            "/users",
            "/auth",
            "/test/"
    );

    protected boolean checkPath(HttpServletRequest request) {
        String path = request.getRequestURI();
        return CHECK_URLS.stream()
                .anyMatch(uri -> path.startsWith(uri));
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws IOException {
        try {
            String token = request.getHeader("Authorization");

            if (!checkPath(request) && (token == null || !jwtTokenProvider.validToken(token)))
                throw new UnauthorizedException(
                        token == null
                                ? "Token not found in the request"
                                : "Invalid token provided. Token validation failed."
                );

            long id = token == null ?
                    0 : jwtTokenProvider.getIdFromToken(token);

            SecurityContextHolder.getContext().setAuthentication(
                    new UsernamePasswordAuthenticationToken(id, null, null));

            filterChain.doFilter(request, response);
        } catch (UnauthorizedException e) {
            // 토큰 겁증 실패 로직 처리
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            response.getWriter().write("Invalid or expired access token");
        } catch (Exception e) {
            // 처리 에러 부분
            log.error(e.getMessage());
            response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
            response.getWriter().write("Internal Server Error");
        }
    }

    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public static class UnauthorizedException extends RuntimeException {
        public UnauthorizedException(String message) {
            super(message);
        }
    }
}