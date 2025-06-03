package com.example.longphungapp.controller;

import com.example.longphungapp.component.SessionUtils;
import com.example.longphungapp.dto.DonHuyDto;
import com.example.longphungapp.dto.ImagesDto;
import com.example.longphungapp.dto.SetImageReq;
import com.example.longphungapp.dto.TaoDonDTO;
import com.example.longphungapp.service.DonHangService;
import com.example.longphungapp.service.ThongBaoDonHangService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/bill")
@CrossOrigin
@RequiredArgsConstructor
public class DonHangController {

    private final DonHangService service;
    private final ThongBaoDonHangService tbService;
    private final SessionUtils sessionUtils;

    @GetMapping("donct/{id}")
    public ResponseEntity<?> getCT(@PathVariable String id) {

        return ResponseEntity.ok(service.findByDonHang_MaDonHang(id));
    }

    @PutMapping("updateCT/{id}")
    public void setImage(@PathVariable Long id, @RequestBody ImagesDto dto) {
        service.setImage(id, dto);
    }

    @PostMapping("create")
    public ResponseEntity<?> save(@RequestBody TaoDonDTO dto) {
        return ResponseEntity.ok(service.save(dto));
    }

    @PutMapping("huydon")
    public ResponseEntity<?> huyDon(@RequestBody DonHuyDto dto, @RequestParam String maNV) {

        service.huyDon(dto);
        getDonHuy(maNV);
        getDonDuyet(maNV);
        getDonHT(maNV);
        getDonHang();
        return ResponseEntity.ok("Hủy đơn thành công");
    }

    @PutMapping("chotdon/{id}")
    public ResponseEntity<?> chotDon(@PathVariable String id,@RequestParam String maNV) {
        service.chotDon(id);
        getDonDuyet(maNV);
        getDonHT(maNV);
        return ResponseEntity.ok("Chốt đơn thành công");
    }

    @GetMapping("donhuy/{id}")
    public ResponseEntity<?> getLyDo(@PathVariable Long id) {
        return ResponseEntity.ok(service.getLyDoHuy(id));
    }

    @MessageMapping("/getDonDuyet")
    public void getDonDuyet(@Payload String id) {
        tbService.thongBaoDonDuyet(id);
    }

    @MessageMapping("/getDonHang")
    public void getDonHang() {
        tbService.thongBaoDonHang();
    }

    @MessageMapping("/getDonHT")
    public void getDonHT(@Payload String id) {
        tbService.thongBaoDonHoanThanh(id);
    }

    @MessageMapping("/getDonHuy")
    public void getDonHuy(@Payload String id) {
        tbService.thongBaoDonHuy(id);
    }
}
