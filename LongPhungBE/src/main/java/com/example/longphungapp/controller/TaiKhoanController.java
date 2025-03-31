package com.example.longphungapp.controller;

import com.example.longphungapp.dto.TaiKhoanDto;
import com.example.longphungapp.service.TaiKhoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("api/v1/acc")
@CrossOrigin
public class TaiKhoanController {
    @Autowired
    TaiKhoanService service;

    @GetMapping()
    public ResponseEntity getList(){
        return new ResponseEntity<>(service.findAll(), HttpStatus.OK);
    }
    @PutMapping("update")
    public ResponseEntity AccUpdate(@RequestBody TaiKhoanDto dto){
        service.update(dto);
        return new ResponseEntity<>("cap nhat thanh cong",HttpStatus.OK);
    }
}
