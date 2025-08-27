package com.example.longphungapp.controller;

import com.example.longphungapp.dto.EnumDto;
import com.example.longphungapp.dto.NhanVienDto;

import com.example.longphungapp.service.NhanVienService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Array;
import java.util.Arrays;
import java.util.List;

@Controller
@RequestMapping("api/v1/emp")
@CrossOrigin
public class NhanVienController {
    @Autowired
    NhanVienService service;

    @GetMapping
    public ResponseEntity getList(){
        return new ResponseEntity(service.findAll(), HttpStatus.OK);
    }

    @GetMapping("sanxuat")
    public ResponseEntity getSanXuat(){

        return new ResponseEntity(service.findByBoPhan(1), HttpStatus.OK);
    }

    @PostMapping("create")
    public ResponseEntity createAcc(@RequestBody NhanVienDto dto){
        var newDto = service.save(dto);
        return new ResponseEntity(newDto, HttpStatus.CREATED);
    }

    @PutMapping("update")
    public ResponseEntity updateAcc(@RequestBody NhanVienDto dto){
        var newDto = service.update(dto);
        return new ResponseEntity(newDto, HttpStatus.CREATED);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity deleteAcc(@PathVariable String id){
        service.delete(id);
        return new ResponseEntity("Xóa thành công", HttpStatus.OK);
    }

    @GetMapping("bophan")
    public ResponseEntity getBoPhan() {

        return new ResponseEntity<>(service.getBoPhanAll(), HttpStatus.OK);
    }
    @GetMapping("chucvu")
    public ResponseEntity getChucVu() {
        return new ResponseEntity<>(service.getChucVuAll(), HttpStatus.OK);
    }

    @GetMapping("search")
    public ResponseEntity searchdata(@RequestParam String type, @RequestParam String keyword){
        switch (type){
            case "1" : return new ResponseEntity<>(service.findByHoTenContains(keyword),HttpStatus.OK);
            case "2" : return new ResponseEntity<>(service.findByIdContains(keyword),HttpStatus.OK);
            case "3" : return new ResponseEntity<>(service.findByTaiKhoan_SdtContains(keyword),HttpStatus.OK);
            default: return new ResponseEntity<>(service.findAll(),HttpStatus.OK);
        }

    }

    @GetMapping("nvinphieu")
    public ResponseEntity getNhanVienInPhieu(){
        return new ResponseEntity<>(service.getNhanVienInPhieu(),HttpStatus.OK);
    }
}
