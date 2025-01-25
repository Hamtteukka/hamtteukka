package com.ssafy.hamtteukka.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@AllArgsConstructor
public class DotPatternCreateRequest {
    private MultipartFile file;
    private int height;
    private int width;
    private int nColors;
    private boolean background;
}
