package com.example.longphungapp.controller;

import com.example.longphungapp.dto.DonThuMuaDto;
import com.example.longphungapp.dto.GiaThuMuaDto;
import com.example.longphungapp.service.VatTuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/nguyenlieu")
@CrossOrigin
public class NguyenLieuController {
    @Autowired
    VatTuService service;
    @Autowired
    SimpMessagingTemplate messagingTemplate;



    @GetMapping()
    public ResponseEntity getAll(){
        return  ResponseEntity.ok(service.findAll());
    }

    @GetMapping("loaivattu")
    public ResponseEntity getLoaiVatTu(){
        return ResponseEntity.ok(service.getListLoai());
    }

    @GetMapping("donthumua/{id}")
    public ResponseEntity getDonThuMua(@PathVariable Long id){
        System.out.println(id);
        return ResponseEntity.ok(service.findDonThuMuaById(id));
    }

    @PostMapping("donthumua/save")
    public ResponseEntity save(@RequestBody DonThuMuaDto dto){
        System.out.println(dto.getTenNguyenLieu());
        service.saveAndUpdateDonThuMua(dto);
        return ResponseEntity.status(201).body("Thêm thành công");
    }

    @DeleteMapping("donthumua/huy/{id}")
    public ResponseEntity huyDonThuMua(@PathVariable Long id){
        service.huyDon(id);
        return ResponseEntity.ok("Hủy đơn thành công");
    }



    @MessageMapping("/getDonThuMua")
    public void getDon(Boolean done){
        messagingTemplate.convertAndSend("/topic/donthumua", service.findAllTM(done));
    }

    @MessageMapping("/getDonDaThuMua")
    public void getDonDaThuMua(Boolean done){
        messagingTemplate.convertAndSend("/topic/dondathumua", service.findAllTM(done));
    }

    @MessageMapping("/getGiaThuMua")
    public void getGiaThuMua(Long id){
       messagingTemplate.convertAndSend("/topic/giathumua/"+id, service.findByDonThuMua_Id(id));
    }

    @MessageMapping("/setGiaThuMua")
    public void setGiaThuMua(GiaThuMuaDto dto){
        service.setGiaThuMua(dto);
        getGiaThuMua(dto.getDonThuMua());
    }

    @MessageMapping("/chotGia")
    public void ChotGia(DonThuMuaDto dto){
        service.saveAndUpdateDonThuMua(dto);
        getDon(false);
        getDonDaThuMua(true);
    }

}
