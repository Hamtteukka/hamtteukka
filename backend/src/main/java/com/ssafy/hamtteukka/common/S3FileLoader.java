package com.ssafy.hamtteukka.common;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;

import java.io.IOException;
import java.util.UUID;

@Component
public class S3FileLoader {
    @Value("${S3_BUCKET_NAME}")
    private String bucketName;
    @Value("${REGION}")
    private String region;
    @Value("${S3_BUCKET_URL}")
    private String bucketUrl;

    private final S3Client s3Client;

    public S3FileLoader(S3Client s3Client) {
        this.s3Client = s3Client;
    }

    /**
     * S3에 파일 업로드
     *
     * @param file 업로드할 파일 (MultipartFile)
     * @return 업로드된 파일의 이름
     */
    public String uploadFile(MultipartFile file) throws IOException {
        String fileName = generateFileName(file);
        try {
            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(fileName)
                    .contentType(file.getContentType())
                    .build();

            s3Client.putObject(putObjectRequest, RequestBody.fromBytes(file.getBytes()));

            return fileName;
        } catch (S3Exception e) {
            throw new IOException("S3 file upload fail");
        }
    }

    /**
     * S3에 저장된 파일의 URL 리턴
     *
     * @param fileName 파일명
     * @return S3에서 접근 가능한 URL
     */
    public String getFileUrl(String fileName) {
        return bucketUrl + fileName;
    }

    /**
     * UUID 기반 고유한 파일명 생성
     *
     * @param file 업로드할 파일
     * @return UUID + 원본 파일명
     */
    private String generateFileName(MultipartFile file) {
        return UUID.randomUUID().toString() + "-" + file.getOriginalFilename();
    }
}
