package com.example.longphungapp.controller;

import com.example.longphungapp.service.NguyenLieuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/nguyenlieu")
@CrossOrigin
public class NguyenLieuController {
    @Autowired
    NguyenLieuService service;

    @GetMapping()
    public ResponseEntity getAll(){
        return  ResponseEntity.ok(service.findAll());
    }
}
