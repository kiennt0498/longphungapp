package com.example.longphungapp.controller;

import com.example.longphungapp.dto.ThongBaoDto;
import com.example.longphungapp.service.ThongBaoService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
@RequiredArgsConstructor
@RestController
@MessageMapping("/thongbao")
@CrossOrigin
public class ThongBaoController {
    private final ThongBaoService thongBaoService;
    private final SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/getThongBao")
    public void getAllThongBao(){
        messagingTemplate.convertAndSend("/topic/thongbao", thongBaoService.getAll());
    }

    @MessageMapping("/guiAll")
    public void guiThongBaoAll(ThongBaoDto thongBaoDto){
        var thongBao = thongBaoService.createThongBao(thongBaoDto);
        messagingTemplate.convertAndSend("/topic/thongbao", thongBao);
    }

    @MessageMapping("/gui/{id}")
    public void guiThongBao(ThongBaoDto thongBaoDto,@PathVariable String id){

    }
}
