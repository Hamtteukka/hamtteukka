package com.ssafy.hamtteukka.common;

import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.Base64;

public class Base64ToMultipartFileConverter {
    public static MultipartFile convert(String base64Image, String fileName) {
        try {
            String[] parts = base64Image.split(",");
            String imageData = parts.length > 1 ? parts[1] : parts[0];
            byte[] data = Base64.getDecoder().decode(imageData);

            return new MultipartFile() {
                @Override
                public String getName() {
                    return fileName;
                }

                @Override
                public String getOriginalFilename() {
                    return fileName;
                }

                @Override
                public String getContentType() {
                    return "image/png";
                }

                @Override
                public boolean isEmpty() {
                    return data == null || data.length == 0;
                }

                @Override
                public long getSize() {
                    return data.length;
                }

                @Override
                public byte[] getBytes() throws IOException {
                    return data;
                }

                @Override
                public InputStream getInputStream() throws IOException {
                    return new ByteArrayInputStream(data);
                }

                @Override
                public void transferTo(File dest) throws IOException, IllegalStateException {
                    try (FileOutputStream fos = new FileOutputStream(dest)) {
                        fos.write(data);
                    }
                }
            };
        } catch (Exception e) {
            throw new IllegalArgumentException("Invalid base64 string", e);
        }
    }
}