package com.ssafy.hamtteukka.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Entity
@Getter
public class Category {

    /**
     * 101, 102: 대 카테고리
     * 0~100: 중 카테고리
     */
    @Id
    @GeneratedValue
    @Column(name = "category_id", columnDefinition = "INT") //INT UNSIGNED아님 주의
    private Long id;

    @Column(nullable = false)
    private String name;

}
