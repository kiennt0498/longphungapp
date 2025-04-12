package com.example.longphungapp.service;

import com.example.longphungapp.fileEnum.TrangThai;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class ThongBaoDonHangService {

    @Autowired
    private DonHangService donHangService;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    public void thongBaoDonDuyet(String nhanVienId) {
        var list = donHangService.findByNhanVien_IdAndTrangThai(nhanVienId, TrangThai.CHO_DUYET);
        messagingTemplate.convertAndSend("/topic/donduyet/" + nhanVienId, list);
        thongBaoDonHang(nhanVienId);
    }

    public void thongBaoDonHang(String nhanVienId) {
        var list = donHangService.findByNhanVien_IdAndTrangThai(nhanVienId, TrangThai.CHO_THIET_KE);
        messagingTemplate.convertAndSend("/topic/donhang/" + nhanVienId, list);
    }

    public void thongBaoDonHoanThanh(String nhanVienId) {
        var list = donHangService.findDonHoanThanh(nhanVienId);
        messagingTemplate.convertAndSend("/topic/donhoanthanh/" + nhanVienId, list);
    }

    public void thongBaoDonHuy(String nhanVienId) {
        var list = donHangService.findByNhanVien_IdAndTrangThai(nhanVienId, TrangThai.HUY);
        messagingTemplate.convertAndSend("/topic/donhuy/" + nhanVienId, list);
    }
}
