package com.example.longphungapp.service;

import com.example.longphungapp.entity.Images;
import io.minio.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.UUID;

@Service

public class MinioService {

    private final MinioClient minioClient;
    private final String bucketName;


    public MinioService(
            @Value("${minio.url}") String url,
            @Value("${minio.access-key}") String accessKey,
            @Value("${minio.secret-key}") String secretKey,
            @Value("${minio.bucket}") String bucketName
    ) {
        this.minioClient = MinioClient.builder()
                .endpoint(url)
                .credentials(accessKey, secretKey)
                .build();
        this.bucketName = bucketName;
    }



    public Images uploadFile(MultipartFile file) throws Exception {
        // Tạo bucket nếu chưa có
        boolean found = minioClient.bucketExists(BucketExistsArgs.builder().bucket(bucketName).build());
        if (!found) {
            minioClient.makeBucket(MakeBucketArgs.builder().bucket(bucketName).build());
        }
        String tenTep = String.valueOf(UUID.randomUUID());
        // Upload file
        minioClient.putObject(
                PutObjectArgs.builder()
                        .bucket(bucketName)
                        .object(tenTep)
                        .stream(file.getInputStream(), -1, 10485760) // 10MB part size
                        .contentType(file.getContentType())
                        .build()
        );
        String uri = String.format("%s/%s/%s", "http://localhost:9000", bucketName, tenTep);
        var img = new Images();
        img.setTenTep(tenTep);
        img.setTenAnh(file.getOriginalFilename());
        img.setUri(uri);
        img.setStatus(file.getContentType());

     return img;
    }

    public InputStream downloadFile(String fileName) throws Exception {
        return minioClient.getObject(
                GetObjectArgs.builder()
                        .bucket(bucketName)
                        .object(fileName)
                        .build()
        );
    }
}
