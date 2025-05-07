package com.example.longphungapp.controller;

import com.example.longphungapp.dto.PhieuDto;
import com.example.longphungapp.service.KhoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/kho")
@CrossOrigin
public class KhoController {
    private final KhoService khoService;

    private final SimpMessagingTemplate messagingTemplate;

    @GetMapping("phieu/list")
    public ResponseEntity getAllPhieu(){
        return ResponseEntity.ok(khoService.getAllPhieu());
    }

    @MessageMapping("/getVatTu")
    public void getListVatTu(){
        messagingTemplate.convertAndSend("/topic/vattu", khoService.getAllKho());
    }

    @MessageMapping("/getVatTu/update")
    public void getListVatTuUpdate(){
        messagingTemplate.convertAndSend("/topic/vattu/update", khoService.getAllKho());
    }

    @MessageMapping("/getPhieu")
    public void getListPhieu(){
        messagingTemplate.convertAndSend("/topic/phieu", khoService.getAllPhieu());
    }

    @PostMapping("phieu/save")
    public ResponseEntity test(@RequestBody PhieuDto dto){
        System.out.println(dto.getPhieuChiTiets().size());
        return ResponseEntity.ok(khoService.createPhieu(dto));
    }

    @DeleteMapping("phieu/delete/{id}")
    public ResponseEntity delete(@PathVariable Long id){
        khoService.deletePhieu(id);
        return ResponseEntity.ok().build();
    }
}
