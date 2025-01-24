package com.ssafy.hamtteukka.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class DescriptionPatternCreateRequest {
    private String needle;
    private String work;
    private String detail;
}
