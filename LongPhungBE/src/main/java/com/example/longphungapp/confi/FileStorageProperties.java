package com.example.longphungapp.confi;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;


@Data
@Component
@ConfigurationProperties(prefix = "file")
public class FileStorageProperties {
    private String uploadImageDir;
}
