package com.example.longphungapp.controller;

import com.example.longphungapp.entity.Images;
import com.example.longphungapp.service.ImageService;
import com.example.longphungapp.service.MinioService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;

@RestController
@RequestMapping("/api/v1/file/minio")
@RequiredArgsConstructor
public class MinioController {

    private final MinioService minioService;
    private final ImageService imageService;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            var img =minioService.uploadFile(file);

            return ResponseEntity.ok(imageService.saveImg(img));
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Upload thất bại: " + e.getMessage());
        }
    }

    @GetMapping("/download/{fileName}")
    public ResponseEntity<?> downloadFile(@PathVariable String fileName) {
        var file = imageService.findByTenTep(fileName);
        try {
            InputStream stream = minioService.downloadFile(fileName);

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION,
                            "attachment; filename=\"" + file.getTenAnh() + "\"")
                    .contentType(MediaType.parseMediaType(file.getStatus()))
                    .body(new InputStreamResource(stream)); // stream trực tiếp
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Download thất bại: " + e.getMessage());
        }
    }
}