package com.ssafy.hamtteukka.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {
    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
                .info(apiInfo());
    }

    private Info apiInfo() {
        return new Info().title("hamtteukka API")
                        .description("뜨개인을 위한 서비스")
                        .version("v0.0.1") // 버전입력
                        .license(new License().name("Apache 2.0").url("http://springdoc.org"));
    }
}