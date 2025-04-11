package com.example.longphungapp.controller;

import com.example.longphungapp.dto.DonHuyDto;
import com.example.longphungapp.dto.ImagesDto;
import com.example.longphungapp.dto.SetImageReq;
import com.example.longphungapp.dto.TaoDonDTO;
import com.example.longphungapp.fileEnum.TrangThai;
import com.example.longphungapp.service.DonHangService;
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
    SimpMessagingTemplate messagingTemplate;


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
        var list = service.findByNhanVien_IdAndTrangThai("NV00001", TrangThai.CHO_DUYET);
        getDonHang();
        messagingTemplate.convertAndSend("/topic/donduyet/"+"NV00001", list);
    }

    @MessageMapping("/getDonHang")
    public void getDonHang(){
        var list = service.findByNhanVien_IdAndTrangThai("NV00001", TrangThai.CHO_THIET_KE);
        System.out.println(list.size());
        messagingTemplate.convertAndSend("/topic/donhang/"+"NV00001", list);
    }

    @MessageMapping("/getDonHT")
    public void getDonHT(@Payload String id) {
        id = id.replace("\"", ""); // Loại bỏ dấu ngoặc kép nếu bị lỗi JSON.stringify
        var list = service.findDonHoanThanh(id);
        messagingTemplate.convertAndSend("/topic/donhoanthanh/" + id, list);
    }

    @MessageMapping("/getDonHuy")
    public void getDonHuy(@Payload String id) {
        id = id.replace("\"","");
        var list = service.findByNhanVien_IdAndTrangThai(id, TrangThai.HUY);
        messagingTemplate.convertAndSend("/topic/donhuy/"+id, list);
    }

}
