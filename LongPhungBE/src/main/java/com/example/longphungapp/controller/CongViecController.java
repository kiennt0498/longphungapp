package com.example.longphungapp.controller;

import com.example.longphungapp.dto.CongViecCTDto;
import com.example.longphungapp.dto.NhanViecReq;
import com.example.longphungapp.entity.CongViecCT;
import com.example.longphungapp.fileEnum.TrangThai;
import com.example.longphungapp.service.CongViecService;
import com.example.longphungapp.service.ThongBaoDonHangService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
public class CongViecController {
    private final CongViecService service;
    private final ThongBaoDonHangService tbService;
    private final SimpMessagingTemplate messagingTemplate;

    public CongViecController(CongViecService service, ThongBaoDonHangService tbService, SimpMessagingTemplate messagingTemplate) {
        this.service = service;
        this.tbService = tbService;
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/getJobs")
    public void getJobs(String tacVu) {
        var jobs = service.findByTrangThaiAndTacVu(TrangThai.CHO_NHAN_DON, tacVu);
        System.out.println(jobs.size());
        sendJobsToTopic("/topic/jobs/"+ tacVu, jobs);
    }

    @MessageMapping("/nhan")
    public void acceptJob(NhanViecReq req) {
        Long id = req.getId();
        String tacVu = req.getTacVu();
        String maNV = req.getMaNV();

        service.setViec(id,maNV, TrangThai.DANG_SAN_XUAT);

        getJobs(tacVu);

        sendJobsToTopic("/topic/jobsNhan/" + maNV, service.findByNhanVien_IdAndTrangThai(maNV, TrangThai.DANG_SAN_XUAT));
    }

    @MessageMapping("/getJobsNhan")
    public void getJobsNhan(@Payload String id) {
        id = cleanId(id);
        sendJobsToTopic("/topic/jobsNhan/" + id, service.findByNhanVien_IdAndTrangThai(id, TrangThai.DANG_SAN_XUAT));
    }

    @MessageMapping("noptk")
    public void nop(NhanViecReq req) {
        service.setViec(req.getId(), req.getMaNV(), TrangThai.CHO_DUYET);


        sendJobsToTopic("/topic/jobsNhan/" + req.getMaNV(), service.findByNhanVien_IdAndTrangThai(req.getMaNV(), TrangThai.DANG_SAN_XUAT));
        sendJobsToTopic("/topic/jobsduyet/" + req.getMaNV(), service.findByNhanVien_IdAndTrangThai(req.getMaNV(), TrangThai.CHO_DUYET));
    }

    @MessageMapping("nopcv")
    public void nopcv(NhanViecReq req) {
        Long id = req.getId();
        String maNV = req.getMaNV();

        service.setViec(id, maNV,TrangThai.DA_GIAO);
        String tv = service.createCVCT(id);
        var nv = service.getNhanVienTK(id);
        sendJobsToTopic("/topic/jobshoanthanhtk/" + nv, service.findByNhanVien_IdAndTrangThai(nv, TrangThai.DA_GIAO));
        getJobsNhan(nv);
        getJobs(tv);
    }

    @MessageMapping("/getJobsDuyet")
    public void getJobsDuyet(@Payload String id) {
        id = cleanId(id);
        var jobs = service.findByNhanVien_IdAndTrangThai(id, TrangThai.CHO_DUYET);
        System.out.println("jobs duyet: " + id + " " + jobs.size());
        sendJobsToTopic("/topic/jobsduyet/" + id, jobs);
    }

    @MessageMapping("/duyet")
    public void duyetSP(NhanViecReq req) {
        Long id = req.getId();
        String maNV = req.getMaNV();
        System.out.println("id đơnz: "+id);
        service.setViec(id,maNV, TrangThai.DA_GIAO);
        service.setDonHangCT(id);
        service.createFistJobs(id);


        tbService.thongBaoDonDuyet(maNV);
        updateJobsAfterApproval(maNV);
    }

    @MessageMapping("/lamlai")
    public void lamLaiSP(NhanViecReq req) {
        Long id = req.getId();
        String maNV = req.getMaNV();

        service.setViec(id,maNV, TrangThai.DANG_SAN_XUAT);


        sendJobsToTopic("/topic/jobsNhan/" + maNV, service.findByNhanVien_IdAndTrangThai(maNV, TrangThai.DANG_SAN_XUAT));
        sendJobsToTopic("/topic/jobsduyet/" + maNV, service.findByNhanVien_IdAndTrangThai(maNV, TrangThai.CHO_DUYET));
    }

    @MessageMapping("/getJobsTKHoanThanh")
    public void getJobsTKHoanThanh(@Payload String id) {
        id = cleanId(id);
        sendJobsToTopic("/topic/jobshoanthanhtk/" + id, service.findCongViecHoanThanh(id));
    }

    private void sendJobsToTopic(String destination, List<CongViecCT> jobs) {
        messagingTemplate.convertAndSend(destination, jobs);
    }

    private String cleanId(String id) {
        return id.replace("\"", "");
    }

    private void updateJobsAfterApproval(String nv) {
        sendJobsToTopic("/topic/jobsduyet/" + nv, service.findByNhanVien_IdAndTrangThai(nv, TrangThai.CHO_DUYET));
        sendJobsToTopic("/topic/jobshoanthanhtk/" + nv, service.findByNhanVien_IdAndTrangThai(nv, TrangThai.DA_GIAO));
    }
}
