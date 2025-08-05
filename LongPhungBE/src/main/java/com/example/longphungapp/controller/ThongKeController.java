package com.example.longphungapp.controller;

import com.example.longphungapp.repository.PhieuChiTietRepository;
import com.example.longphungapp.service.BaoCaoService;
import com.example.longphungapp.service.ChamCongService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/thongke")
@CrossOrigin
@RequiredArgsConstructor
public class ThongKeController {
    private final ChamCongService chamCongService;
    private final BaoCaoService baoCaoService;

    @GetMapping("tongkpi")
    public ResponseEntity getKpiTheoThang(@RequestParam String thang) {
        return ResponseEntity.ok(chamCongService.getKpiTheoThang(thang));
    }
    @GetMapping("san-pham")
    public ResponseEntity getBCSP(){
        return ResponseEntity.ok(baoCaoService.getBaoCaoSP());
    }
    @GetMapping("xuat")
    public ResponseEntity getXuatVT(){
        return ResponseEntity.ok(baoCaoService.getVatTuXuat());
    }
    @GetMapping("nhap")
    public ResponseEntity getNhapVT(){
        return ResponseEntity.ok(baoCaoService.getVatTuNhap());
    }
}
