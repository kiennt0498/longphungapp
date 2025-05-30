package com.example.longphungapp.controller;

import com.example.longphungapp.dto.TaiKhoanDto;
import com.example.longphungapp.service.NhanVienService;
import com.example.longphungapp.service.TaiKhoanService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
@RequiredArgsConstructor
@Controller
@RequestMapping("api/v1/acc")
@CrossOrigin
public class TaiKhoanController {

    private final TaiKhoanService service;
    private final NhanVienService nhanVienService;

    @GetMapping()
    public ResponseEntity getList(){
        return new ResponseEntity<>(service.findAll(), HttpStatus.OK);
    }
    @PutMapping("update")
    public ResponseEntity AccUpdate(@RequestBody TaiKhoanDto dto){
        service.update(dto);
        return new ResponseEntity<>("cap nhat thanh cong",HttpStatus.OK);
    }
    @GetMapping("/getdata/{id}")
    public ResponseEntity getData(@PathVariable String id){
        return new ResponseEntity<>(nhanVienService.findById(id),HttpStatus.OK);
    }
}
