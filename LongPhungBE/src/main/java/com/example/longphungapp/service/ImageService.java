package com.example.longphungapp.service;

import com.example.longphungapp.Exception.FileStorageException;
import com.example.longphungapp.confi.FileStorageProperties;
import com.example.longphungapp.dto.ImagesDto;
import com.example.longphungapp.entity.Images;
import com.example.longphungapp.repository.ImagesRepository;
import org.apache.poi.util.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.nio.file.*;
import java.util.List;
import java.util.UUID;

@Service
public class ImageService {
    @Autowired
    ImagesRepository dao;

    private final Path location;
    private static final long maxSize = 20*1024*1024;
    private static final List<String> ALLOWED_EXTENSIONS = List.of("jpg", "png", "jpeg", "gif");

    public ImageService(FileStorageProperties properties) {
        this.location = Paths.get(properties.getUploadImageDir()).toAbsolutePath().normalize();
        try {
            Files.createDirectories(location);
        } catch (Exception ex) {
            throw new FileStorageException("Không thể tạo thư mục lưu trữ ảnh", ex);
        }
    }

    public String storeImageFile(MultipartFile file){
        return (String) storeFile(location, file,false);
    }
    public Images storeUploadFile(MultipartFile file){
        return (Images) storeFile(location, file,true);
    }
    public Resource loadImageFile(String filename){
        return loadFileResource(location, filename);
    }
    public void deleteImageFile(String filename){
        deleteFile(filename);
    }

    private Object storeFile(Path location,MultipartFile file, boolean returnInfo) {
        if(file.isEmpty()) {
            throw new FileStorageException("Không để có file tải lên");
        }
        if(file.getSize() > maxSize) {
            throw new FileStorageException("File quá lớn");

        }
        String fileName = createFileName(file);
        Path filePath = location.resolve(fileName);
        try {
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            if(returnInfo){
                Images dto = new Images();
                dto.setTenAnh(file.getOriginalFilename());
                dto.setTenTep(fileName);
                dto.setUri(filePath.toString());
                return dao.save(dto);

            }

            return fileName;
        }catch (Exception ex) {
            throw new FileStorageException("Không thể lưu file", ex);
        }
    }

    private String createFileName(MultipartFile file) {
        String ext = StringUtils.getFilenameExtension(file.getOriginalFilename());
        if(ext == null || !ALLOWED_EXTENSIONS.contains(ext.toLowerCase())) {
            throw new FileStorageException("File không hợp lệ");
        }
        return UUID.randomUUID().toString() + "." + ext;
    }
    private Resource loadFileResource(Path location, String fileName) {
        try {
            Path filePath = location.resolve(fileName).normalize();
            System.out.println("Đường dẫn kiểm tra: " + filePath.toString());

            if (!Files.exists(filePath)) {
                throw new FileNotFoundException("Không tìm thấy file " + fileName);
            }

            return new UrlResource(filePath.toUri());
        } catch (Exception ex) {
            throw new FileStorageException("Không tìm thấy file " + fileName, ex);
        }
    }

    private void deleteFile(String fileName) {
        var found = dao.findByTenTep(fileName);
        if(found == null) {
            throw new FileStorageException("Không tìm thấy file " + fileName);
        }
        Path filePath = location.resolve(fileName).normalize();
        try {
            Files.deleteIfExists(filePath);
            dao.delete(found);
        } catch (Exception ex) {
            throw new FileStorageException("Không thể xóa file " + fileName, ex);
        }
    }

    public Images findByTenTep(String name){
        return dao.findByTenTep(name);
    }

    public Images saveImg(Images img){
        return dao.save(img);
    }


}
