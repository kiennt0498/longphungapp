package com.example.longphungapp.controller;

import com.example.longphungapp.dto.EnumDto;
import com.example.longphungapp.dto.NhanVienDto;
import com.example.longphungapp.entity.NhanVien;
import com.example.longphungapp.fileEnum.BoPhan;
import com.example.longphungapp.fileEnum.ChucVu;
import com.example.longphungapp.fileEnum.TacVu;
import com.example.longphungapp.service.NhanVienService;
import jakarta.persistence.GeneratedValue;
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
        return new ResponseEntity(service.findByBoPhan(BoPhan.SAN_XUAT), HttpStatus.OK);
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
        List<EnumDto> list = Arrays.stream(BoPhan.values()).map(i->{
            var dto = new EnumDto();
            dto.setName(i.name());
            dto.setDescription(i.getDescription());
            return dto;
        }).toList();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
    @GetMapping("chucvu")
    public ResponseEntity getChucVu() {
        List<EnumDto> list = Arrays.stream(ChucVu.values()).map(i->{
            var dto = new EnumDto();
            dto.setName(i.name());
            dto.setDescription(i.getDescription());
            return dto;
        }).toList();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
    @GetMapping("tacvu")
    public ResponseEntity getTacVu() {
        List<EnumDto> list = Arrays.stream(TacVu.values()).map(i->{
            var dto = new EnumDto();
            dto.setName(i.name());
            dto.setDescription(i.getDescription());
            return dto;
        }).toList();
        return new ResponseEntity<>(list, HttpStatus.OK);
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
}
