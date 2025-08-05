package com.example.longphungapp.controller;

import com.example.longphungapp.dto.CongDoanDto;
import com.example.longphungapp.entity.CongDoan;
import com.example.longphungapp.service.CongDoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/congdoan")
@CrossOrigin
public class CongDoanController {
    @Autowired
    private CongDoanService service;
    @GetMapping("")
    public ResponseEntity getListCD(){
        return ResponseEntity.ok(service.findAll());
    }

    @PostMapping("save")
    public ResponseEntity save(@RequestBody CongDoanDto dto){
        return ResponseEntity.ok(service.saveCongDoan(dto));
    }

    @PutMapping("update")
    public ResponseEntity update(@RequestBody CongDoanDto dto){
        service.update(dto);
        return ResponseEntity.ok(service.update(dto));
    }
    @DeleteMapping("delete/{id}")
    public ResponseEntity delete(@PathVariable Integer id){
        service.delete(id);
        return ResponseEntity.ok("Xóa thành công");
    }
    @GetMapping("updatecong")
    public ResponseEntity updateCongNhanVien(@RequestParam Double cong){
        service.updateCong(cong);
        return ResponseEntity.ok("Cập nhật thành công");
    }
}
