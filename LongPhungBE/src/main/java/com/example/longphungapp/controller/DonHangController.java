package com.example.longphungapp.controller;

import com.example.longphungapp.dto.DonHuyDto;
import com.example.longphungapp.dto.ImagesDto;
import com.example.longphungapp.dto.SetImageReq;
import com.example.longphungapp.dto.TaoDonDTO;
import com.example.longphungapp.fileEnum.TrangThai;
import com.example.longphungapp.service.DonHangService;
import com.example.longphungapp.service.ThongBaoDonHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/bill")
@CrossOrigin
public class DonHangController {
    @Autowired
    private DonHangService service;
    @Autowired
    ThongBaoDonHangService tbService;




    @GetMapping("donct/{id}")
    public ResponseEntity getCT(@PathVariable String id){
        return ResponseEntity.ok(service.findByDonHang_MaDonHang(id));
    }

    @PutMapping("updateCT/{id}")
    public void setImage(@PathVariable Long id, @RequestBody ImagesDto dto){
        service.setImage(id,dto);
    }

    @PostMapping("create")
    public ResponseEntity save(@RequestBody TaoDonDTO dto){
        return ResponseEntity.ok(service.save(dto));
    }

    @PutMapping("huydon")
    public ResponseEntity huyDon(@RequestBody DonHuyDto dto){
        service.huyDon(dto);
        getDonHuy("NV00001");
        getDonDuyet();
        getDonHT("NV00001");
        getDonHang();
        return ResponseEntity.ok("Hủy đơn thành công");
    }

    @PutMapping("chotdon/{id}")
    public ResponseEntity chotDon(@PathVariable String id){
        service.chotDon(id);
        getDonDuyet();
        getDonHT("NV00001");
        return ResponseEntity.ok("Chốt đơn thành công");
    }

    @GetMapping("donhuy/{id}")
    public ResponseEntity getLyDo(@PathVariable Long id){
        return ResponseEntity.ok(service.getLyDoHuy(id));
    }

    @MessageMapping("/getDonDuyet")
    public void getDonDuyet(){
        tbService.thongBaoDonDuyet("NV00001");
    }

    @MessageMapping("/getDonHang")
    public void getDonHang(){
       tbService.thongBaoDonHang("NV00001");
    }

    @MessageMapping("/getDonHT")
    public void getDonHT(@Payload String id) {
        tbService.thongBaoDonHoanThanh("NV00001");
    }

    @MessageMapping("/getDonHuy")
    public void getDonHuy(@Payload String id) {
       tbService.thongBaoDonHuy("NV00001");
    }

}
