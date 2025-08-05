package com.example.longphungapp.controller;

import com.example.longphungapp.dto.KhachHangDto;
import com.example.longphungapp.service.KhachHangService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("api/v1/cus")
@CrossOrigin
public class KhachHangController {
    @Autowired
    KhachHangService service;

    @GetMapping
    public ResponseEntity getList(HttpServletRequest request){
        System.out.println("Session ID: " + request.getSession(false).getId());
        return new ResponseEntity<>(service.findAll(), HttpStatus.OK);
    }

    @PostMapping("create")
    public ResponseEntity createCus(@RequestBody KhachHangDto dto){
        var newDto = service.create(dto);
        return new ResponseEntity<>(newDto, HttpStatus.CREATED);
    }

    @PutMapping("update")
    public ResponseEntity updateCus(@RequestBody KhachHangDto dto){
        var newDto = service.update(dto);
        return new ResponseEntity<>(newDto, HttpStatus.OK);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity deleteCus(@PathVariable String id){
        service.delete(id);
        return new ResponseEntity<String>("Xóa thành công", HttpStatus.OK);
    }

    @GetMapping("search")
    public ResponseEntity searchdata(@RequestParam String type, @RequestParam String keyword){
        switch (type){
            case "1" : return new ResponseEntity<>(service.findByTenKhachHangContains(keyword),HttpStatus.OK);
            case "2" : return new ResponseEntity<>(service.findByIdLike(keyword),HttpStatus.OK);
            case "3" : return new ResponseEntity<>(service.findBySdtContains(keyword),HttpStatus.OK);
            default: return new ResponseEntity<>(service.findAll(),HttpStatus.OK);
        }

    }
}
