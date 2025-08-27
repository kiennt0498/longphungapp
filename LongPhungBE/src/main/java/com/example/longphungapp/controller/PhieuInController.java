package com.example.longphungapp.controller;

import com.example.longphungapp.dto.PhieuInDto;
import com.example.longphungapp.service.PhieuInService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequiredArgsConstructor
@RequestMapping("api/v1/phieu-in")
@CrossOrigin
public class PhieuInController {
    private final PhieuInService service;
    private final SimpMessagingTemplate messagingTemplate;

    @PostMapping("create")
    public ResponseEntity<?> createPhieu(@RequestBody PhieuInDto dto){
        return ResponseEntity.ok(service.savePhieu(dto));
    }

    @MessageMapping("/getListPhieu")
    public void getListPhieu(@PathVariable String maNV){
        messagingTemplate.convertAndSend("/topic/phieu-in/" + maNV, service.findByMaNhanVien(maNV));
    }

    @MessageMapping("/getListPhieuHT")
    public void getListPhieuHT(@PathVariable String maNV){
        messagingTemplate.convertAndSend("/topic/phieu-in-ht/" + maNV, service.getListPhieuHT(maNV));
    }


}
