package com.ssafy.hamtteukka.security;

import com.ssafy.hamtteukka.service.TokenBlacklistService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.Cookie;
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
    private final TokenBlacklistService tokenBlacklistService;

    public JwtAuthenticationFilter(
            JwtTokenProvider jwtTokenProvider,
            TokenBlacklistService tokenBlacklistService
    ) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.tokenBlacklistService = tokenBlacklistService;
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
            String token = getCookie(request, "accessToken");

            if(!checkPath(request)) {
                if(token==null) throw new UnauthorizedException("Token not found in the request");
                if(!jwtTokenProvider.validToken(token)) throw new UnauthorizedException("Invalid token provided. Token validation failed.");
                if(tokenBlacklistService.isBlacklisted(token)) throw new UnauthorizedException("Token is blacklisted. Access is forbidden.");
            }

            long id = token == null ?
                    0 : jwtTokenProvider.getIdFromToken(token);

            SecurityContextHolder.getContext().setAuthentication(
                    new UsernamePasswordAuthenticationToken(id, null, null));

            filterChain.doFilter(request, response);
        } catch (UnauthorizedException e) {
            HttpStatus status = e.getMessage().equals("Token is blacklisted. Access is forbidden.")?HttpStatus.FORBIDDEN:HttpStatus.UNAUTHORIZED;
            response.setStatus(status.value());
            response.getWriter().write(e.getMessage());
        } catch (Exception e) {
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

    /**
     * 쿠키 값 가져오는 메서드
     * @param request
     * @param name 가지고올 쿠키 이름
     * @return 쿠키 값
     */
    private String getCookie(HttpServletRequest request, String name) {
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if (name.equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }
}