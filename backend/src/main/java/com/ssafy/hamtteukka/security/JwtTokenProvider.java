    package com.ssafy.hamtteukka.security;

    import io.jsonwebtoken.*;
    import jakarta.servlet.http.Cookie;
    import jakarta.servlet.http.HttpServletRequest;
    import org.springframework.beans.factory.annotation.Value;
    import org.springframework.stereotype.Component;

    import java.util.Date;

    @Component
    public class JwtTokenProvider {
        @Value("${JWT_SECRETKEY}")
        private String secretKey;

        /**
         * JWT 발급 메서드
         * @param id 페이로드에 저장할 id 값
         * @param expiration 유효 시간(분)
         * @return 새로운 JWT 토큰
         */
        public String generateJwt(long id, int expiration) {
            return Jwts
                    .builder()
                    .setHeaderParam(Header.TYPE, Header.JWT_TYPE)
                    .claim("id", id)
                    // System.currentTimeMillis(): 1/1000초(ms) 단위의 현재 시간을 반환
                    // 현재 시간부터 expiration분 후 만료
                    .setExpiration(new Date(System.currentTimeMillis() + 1000L * 60 * expiration))
                    .signWith(SignatureAlgorithm.HS256, secretKey)
                    .compact();
        }

        /**
         * JWT Token 검증 메서드
         * @param token JWT 토큰
         * @return JWT 유효 여부
         */
        public boolean validToken(String token) {
            try {
                Jwts.parserBuilder()
                        .setSigningKey(secretKey)
                        .build()
                        .parseClaimsJws(token);
                return true;
            } catch (Exception e) {
                return false;
            }
        }

        /**
         * JWT Token Claims(페이로드 부) 정보 파싱 메서드
         * @param token
         * @return JWT 토큰의 페이로드
         */
        private Claims getClaims(String token) {
            return Jwts.parserBuilder()
                    .setSigningKey(secretKey)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        }

        /**
         * JWT Token Claims(페이로드 부) 정보에서 id 값 추출 메서드
         * @param token
         * @return 페이로드에서 추출한 id 값
         */
        public long getIdFromToken(String token) {
            Claims claims = getClaims(token);
            return claims.get("id", Long.class);
        }

        /**
         * 토큰에서 만료 시간을 추출
         * @param token JWT 토큰
         * @return 만료 시간 (밀리초)
         */
        public long getExpiration(String token) {
            Claims claims = Jwts.parser()
                    .setSigningKey(secretKey)
                    .parseClaimsJws(token)
                    .getBody();

            return claims.getExpiration().getTime();
        }

        /**
         * Cookie에서 Token 추출 메서드
         * @param request
         * @return 쿠키에서 추출한 jwt 토큰
         */

        public String getJwtFromCookie(HttpServletRequest request) {
            Cookie[] cookies = request.getCookies();
            if(cookies != null) {
                for (Cookie cookie : cookies) {
                    if("accessToken".equals(cookie.getName())) {
                        return cookie.getValue(); // jwt 토큰 반환
                    }
                }
            }
            return null;
        }

    }
