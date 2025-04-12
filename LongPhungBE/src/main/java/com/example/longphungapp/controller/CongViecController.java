package com.example.longphungapp.controller;

import com.example.longphungapp.dto.CongViecCTDto;
import com.example.longphungapp.entity.CongViecCT;
import com.example.longphungapp.fileEnum.TrangThai;
import com.example.longphungapp.service.CongViecService;
import com.example.longphungapp.service.ThongBaoDonHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class CongViecController {
    @Autowired
    CongViecService service;
    @Autowired
    ThongBaoDonHangService tbService;
    @Autowired
    SimpMessagingTemplate messagingTemplate;


    @MessageMapping("/getJobs")
    public void getJobs() {
        List<CongViecCT> jobs = service.findByTrangThai(TrangThai.CHO_NHAN_DON);
        messagingTemplate.convertAndSend("/topic/jobs", jobs);
    }

    @MessageMapping("/nhan")
    public void acceptJob(Long id) {
        service.setViec(id, TrangThai.DANG_SAN_XUAT);

        List<CongViecCT> updatedJobs = service.findByTrangThai(TrangThai.CHO_NHAN_DON);
        messagingTemplate.convertAndSend("/topic/jobs", updatedJobs);

        var nv = service.getNhanVienTK(id);

        List<CongViecCT> jobs = service.findByNhanVien_IdAndTrangThai(nv, TrangThai.DANG_SAN_XUAT);
        messagingTemplate.convertAndSend("/topic/jobsNhan/" + nv, jobs);
    }

    @MessageMapping("/getJobsNhan")
    public void getJobsNhan(@Payload String id) {
        id = id.replace("\"", ""); // Loại bỏ dấu ngoặc kép nếu bị lỗi JSON.stringify
        List<CongViecCT> jobs = service.findByNhanVien_IdAndTrangThai(id, TrangThai.DANG_SAN_XUAT);
        messagingTemplate.convertAndSend("/topic/jobsNhan/" + id, jobs);
    }

    @MessageMapping("noptk")
    public void nop(Long id) {
        service.setViec(id, TrangThai.CHO_DUYET);
        var nv = service.getNhanVienTK(id);

        List<CongViecCT> jobs = service.findByNhanVien_IdAndTrangThai(nv,TrangThai.DANG_SAN_XUAT);
        List<CongViecCT> jobsUpdate = service.findByNhanVien_IdAndTrangThai(nv,TrangThai.CHO_DUYET);

        messagingTemplate.convertAndSend("/topic/jobsNhan/" + nv, jobs);
        messagingTemplate.convertAndSend("/topic/jobsduyet/" + nv, jobsUpdate);

    }

    @MessageMapping("/getJobsDuyet")
    public void getJobsDuyet(@Payload String id) {
        id = id.replace("\"", ""); // Loại bỏ dấu ngoặc kép nếu bị lỗi JSON.stringify
        List<CongViecCT> jobs = service.findByNhanVien_IdAndTrangThai(id, TrangThai.CHO_DUYET);
        messagingTemplate.convertAndSend("/topic/jobsduyet/" + id, jobs);
    }



    @MessageMapping("/duyet")
    public void duyetSP(Long id) {
        service.setViec(id, TrangThai.DA_GIAO);
        service.setDonHangCT(id);
        var nv = service.getNhanVienTK(id);

        tbService.thongBaoDonDuyet(nv);

        List<CongViecCT> updatedJobs = service.findByNhanVien_IdAndTrangThai(nv, TrangThai.CHO_DUYET);
        messagingTemplate.convertAndSend("/topic/jobsduyet/" + nv, updatedJobs);

        List<CongViecCT> jobs = service.findByNhanVien_IdAndTrangThai(nv, TrangThai.DA_GIAO);
        messagingTemplate.convertAndSend("/topic/jobshoanthanhtk/" + nv, jobs);

    }
    @MessageMapping("/lamlai")
    public void lamLaiSP(Long id) {
        service.setViec(id, TrangThai.DANG_SAN_XUAT);
        var nv = service.getNhanVienTK(id);

        List<CongViecCT> jobs = service.findByNhanVien_IdAndTrangThai(nv, TrangThai.DANG_SAN_XUAT);
        messagingTemplate.convertAndSend("/topic/jobsNhan/" + nv, jobs);

        List<CongViecCT> jobsDuyet = service.findByNhanVien_IdAndTrangThai(nv, TrangThai.CHO_DUYET);
        messagingTemplate.convertAndSend("/topic/jobsduyet/" + nv, jobsDuyet);
    }

    @MessageMapping("/getJobsTKHoanThanh")
    public void getJobsTKHoanThanh(@Payload String id) {
        id = id.replace("\"", ""); // Loại bỏ dấu ngoặc kép nếu bị lỗi JSON.stringify
        List<CongViecCT> jobs = service.findCongViecHoanThanh(id);
        messagingTemplate.convertAndSend("/topic/jobshoanthanhtk/" + id, jobs);
    }



}
