package com.example.longphungapp.confi;


import jakarta.servlet.MultipartConfigElement;
import org.springframework.boot.web.servlet.MultipartConfigFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.unit.DataSize;

import java.io.File;

@Configuration
public class MultipartConfig {
    @Bean
    public MultipartConfigElement multipartConfigElement() {
        MultipartConfigFactory factory = new MultipartConfigFactory();
        // folder tạm
        String location = System.getProperty("java.io.tmpdir") + File.separator + "drive-uploads";
        new File(location).mkdirs();
        factory.setLocation(location);
        // threshold 0 => luôn ghi temp file (không giữ trong RAM)
        factory.setFileSizeThreshold(DataSize.ofBytes(0));
        factory.setMaxFileSize(DataSize.parse("250MB"));
        factory.setMaxRequestSize(DataSize.parse("250MB"));
        return factory.createMultipartConfig();
    }
}

