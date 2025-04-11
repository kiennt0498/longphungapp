package com.example.longphungapp.controller;


import com.example.longphungapp.component.ExportFile;
import com.example.longphungapp.component.ParseFile;
import com.example.longphungapp.dto.ImagesDto;
import com.example.longphungapp.dto.KhachHangDto;
import com.example.longphungapp.dto.NhanVienDto;

import com.example.longphungapp.service.DonHangService;
import com.example.longphungapp.service.ImageService;
import com.example.longphungapp.service.KhachHangService;
import com.example.longphungapp.service.NhanVienService;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("api/v1/file")
@CrossOrigin
public class FileControll {
    @Autowired
    NhanVienService service;
    @Autowired
    KhachHangService khachHangService;
    @Autowired
    ParseFile parseFile;
    @Autowired
    ExportFile exportFile;
    @Autowired
    ImageService imageService;
    @Autowired
    DonHangService hangService;


    @PostMapping("upload/emp")
    public ResponseEntity upFileEmp(@RequestParam("file") MultipartFile file){
        try {
            List<NhanVienDto> list = parseFile.parseEmp(file);
            service.saveAll(list);
            return new ResponseEntity<>(service.findAll(), HttpStatus.CREATED);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("lỗi xử lý file: "+ e.getMessage());
        }

    }
    @PostMapping("upload/cus")
    public ResponseEntity upFileCus(@RequestParam("file") MultipartFile file){
        try {
            List<KhachHangDto> list = parseFile.parseCus(file);
            khachHangService.saveAll(list);
            return new ResponseEntity<>(service.findAll(), HttpStatus.CREATED);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("lỗi xử lý file: "+ e.getMessage());
        }

    }

    @GetMapping("download/emp")
    public ResponseEntity downFileEmp() throws IOException {
        ResponseEntity<byte[]> body = ResponseEntity.status(200)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename= nhanvien.xlsx")
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(exportFile.ExportEmp());
        return body;
    }

    @GetMapping("download/cus")
    public ResponseEntity downFileCus() throws IOException {
        ResponseEntity<byte[]> body = ResponseEntity.status(200)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename= khachHang.xlsx")
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(exportFile.exportCus());
        return body;
    }

    @PostMapping(path = "upload/image",consumes = {MediaType.MULTIPART_FORM_DATA_VALUE}, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ImagesDto> uploadImage(@RequestParam("file") MultipartFile imgFile, HttpServletRequest request) {
        var fileInfo = imageService.storeUploadFile(imgFile);
        String baseUrl = request.getRequestURL().toString().replace(request.getRequestURI(), "");
        String fileUrl = baseUrl + "/api/v1/images/" + fileInfo.getTenTep();

        ImagesDto dto = new ImagesDto();
        dto.setId(fileInfo.getId());
        dto.setTenAnh(fileInfo.getTenAnh());
        dto.setTenTep(fileInfo.getTenTep());
        dto.setStatus("done");
        return ResponseEntity.status(HttpStatus.CREATED).body(dto);
    }
    @GetMapping("image/{filename:.+}")
    public ResponseEntity<Resource> viewOrDownloadImage(
            @PathVariable String filename,
            @RequestParam(value = "download", required = false, defaultValue = "false") boolean download,
            HttpServletRequest req) {
        try {


            Resource resource = imageService.loadImageFile(filename);



            String contentType = req.getServletContext().getMimeType(resource.getFile().getAbsolutePath());

            if (contentType == null) {
                contentType = "application/octet-stream";
            }

            HttpHeaders headers = new HttpHeaders();
            if (download) {
                headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"");
            }

            return ResponseEntity.ok()
                    .headers(headers)
                    .contentType(MediaType.parseMediaType(contentType))
                    .body(resource);
        } catch (FileNotFoundException e) {

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
    @DeleteMapping("image/{filename:.+}")
    public ResponseEntity<String> deleteImage(@PathVariable String filename) {
        hangService.deleteImg(filename);
        imageService.deleteImageFile(filename);

        return ResponseEntity.ok("Đã xóa ảnh: " + filename);
    }
}
