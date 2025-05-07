package com.example.longphungapp.controller;


import com.example.longphungapp.dto.SanPhamDto;
import com.example.longphungapp.service.SanPhamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("api/v1/prod")
@CrossOrigin
public class SanPhamController {
    @Autowired
    SanPhamService service;

    @GetMapping
    public ResponseEntity getList() {
        return new ResponseEntity<>(service.findAll(), HttpStatus.OK);
    }

    @GetMapping("truong")
    public ResponseEntity getListNhomSP() {
        return ResponseEntity.ok(service.getTruong());
    }

    @GetMapping("loinhuan/{id}")
    public ResponseEntity getLoiNhuan(@PathVariable Long id) {
        return new ResponseEntity<>(service.getLoiNhuan(id), HttpStatus.OK);
    }

    @GetMapping("donvi")
    public ResponseEntity getDoViTinh() {
        return new ResponseEntity<>(service.getAllDV(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity createProd(@RequestBody SanPhamDto dto) {
        var newDto = service.save(dto);
        return new ResponseEntity(newDto, HttpStatus.CREATED);

    }

    @PutMapping
    public ResponseEntity update(@RequestBody SanPhamDto dto) {
        var newDto = service.update(dto);
        return new ResponseEntity(newDto, HttpStatus.OK);

    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity delete(@PathVariable Long id) {
        service.delete(id);
        return new ResponseEntity(HttpStatus.OK);
    }
}
