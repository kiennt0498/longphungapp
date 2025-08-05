package com.example.longphungapp.controller;

import com.example.longphungapp.dto.CongViecCTDto;
import com.example.longphungapp.dto.NhanViecReq;
import com.example.longphungapp.entity.CongViecCT;
import com.example.longphungapp.fileEnum.TrangThai;
import com.example.longphungapp.service.CongViecService;
import com.example.longphungapp.service.DonHangService;
import com.example.longphungapp.service.ThongBaoDonHangService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequiredArgsConstructor
public class CongViecController {
    private final CongViecService service;
    private final ThongBaoDonHangService tbService;
    private final SimpMessagingTemplate messagingTemplate;
    private final DonHangService donHangService;



    @MessageMapping("/getJobs")
    public void getJobs() {
        var jobs = service.findByTrangThai(TrangThai.CHO_NHAN_DON);
        System.out.println("sl jobs: "+jobs.size());
        messagingTemplate.convertAndSend("/topic/jobs", jobs);
    }

    @MessageMapping("/nhan")
    public void acceptJob(NhanViecReq req) {
        Long id = req.getId();
        String maNV = req.getMaNV();

        service.setViec(id,maNV, TrangThai.DANG_SAN_XUAT,true);

        getJobs();

        messagingTemplate.convertAndSend("/topic/jobsNhan/" + maNV, service.findByNhanVien_IdAndTrangThai(maNV, TrangThai.DANG_SAN_XUAT));
    }

    @MessageMapping("/getJobsNhan")
    public void getJobsNhan(@Payload String id) {
        id = cleanId(id);
        messagingTemplate.convertAndSend("/topic/jobsNhan/" + id, service.findByNhanVien_IdAndTrangThai(id, TrangThai.DANG_SAN_XUAT));
    }

    @MessageMapping("noptk")
    public void nop(@Payload NhanViecReq req) {

        System.out.println("req id: "+ req.getId());

        service.setViec(req.getId(), null, TrangThai.CHO_DUYET, true);
        service.setDonHangCT(req.getId(), TrangThai.CHO_DUYET, true);
        donHangService.setImage(req.getId(), req.getFile());

        String maNVTao = service.getMaNVTao(req.getId());

        messagingTemplate.convertAndSend("/topic/jobsNhan/" + req.getMaNV(), service.findByNhanVien_IdAndTrangThai(req.getMaNV(), TrangThai.DANG_SAN_XUAT));
        messagingTemplate.convertAndSend("/topic/jobsduyet/" + req.getMaNV(), service.findByNhanVien_IdAndTrangThai(req.getMaNV(), TrangThai.CHO_DUYET));
        tbService.thongBaoDonChoDuyet(maNVTao);
    }

    @MessageMapping("nopcv")
    public void nopcv(@Payload NhanViecReq req) {
        Long id = req.getId();
        service.setViec(id, null,TrangThai.DA_GIAO, true);
        service.createCVCT(id);
        var nv = service.getNhanVienTK(id, true);
        messagingTemplate.convertAndSend("/topic/jobshoanthanhtk/" + nv, service.findByNhanVien_IdAndTrangThai(nv, TrangThai.DA_GIAO));
        getJobsNhan(nv);
        getJobs();
    }

    @MessageMapping("/getJobsDuyet")
    public void getJobsDuyet(@Payload String id) {
        id = cleanId(id);
        var jobs = service.findByNhanVien_IdAndTrangThai(id, TrangThai.CHO_DUYET);
        messagingTemplate.convertAndSend("/topic/jobsduyet/" + id, jobs);
    }

    @MessageMapping("/duyet")
    public void duyetSP(NhanViecReq req) {
        Long id = req.getId();
        System.out.println("id duyet: "+ id);

        service.setViec(id,null, TrangThai.DA_GIAO, false);

        service.setDonHangCT(id,TrangThai.DA_GIAO, false);
        donHangService.setDonHang(id,TrangThai.CHO_NHAN_DON, true);
//        service.createFistJobs(id);

        String maNVTK = service.getNhanVienTK(id, false);
        String maNVTao = service.getMaNVTao(id);

        tbService.thongBaoDonChoDuyet(maNVTao);
        updateJobsAfterApproval(maNVTK);
    }

    @MessageMapping("/lamlai")
    public void lamLaiSP(NhanViecReq req) {
        Long id = req.getId();
        String maNV = req.getMaNV();

        System.out.println("lamlai: "+ id);

        service.setViec(id,null, TrangThai.DANG_SAN_XUAT, false);
        service.setDonHangCT(id, TrangThai.CHO_NHAN_DON, false);

        String maNVTao = service.getMaNVTao(id);



        tbService.thongBaoDonChoDuyet(maNVTao);
        messagingTemplate.convertAndSend("/topic/jobsNhan/" + maNV, service.findByNhanVien_IdAndTrangThai(maNV, TrangThai.DANG_SAN_XUAT));
        messagingTemplate.convertAndSend("/topic/jobsduyet/" + maNV, service.findByNhanVien_IdAndTrangThai(maNV, TrangThai.CHO_DUYET));
    }

    @MessageMapping("/getJobsTKHoanThanh")
    public void getJobsTKHoanThanh(@Payload String id) {
        id = cleanId(id);
        messagingTemplate.convertAndSend("/topic/jobshoanthanhtk/" + id, service.findCongViecHoanThanh(id));
    }


    private String cleanId(String id) {
        return id.replace("\"", "");
    }

    private void updateJobsAfterApproval(String nv) {
        messagingTemplate.convertAndSend("/topic/jobsduyet/" + nv, service.findByNhanVien_IdAndTrangThai(nv, TrangThai.CHO_DUYET));
        messagingTemplate.convertAndSend("/topic/jobshoanthanhtk/" + nv, service.findByNhanVien_IdAndTrangThai(nv, TrangThai.DA_GIAO));
    }
}
