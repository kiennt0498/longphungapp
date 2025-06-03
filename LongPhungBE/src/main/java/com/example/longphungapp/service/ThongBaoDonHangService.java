package com.example.longphungapp.service;

import com.example.longphungapp.entity.DonThuMua;
import com.example.longphungapp.entity.ListGiaThuMua;
import com.example.longphungapp.fileEnum.TrangThai;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ThongBaoDonHangService {

    @Autowired
    private DonHangService donHangService;
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    public void thongBaoDonDuyet(String nhanVienId) {
        var list = donHangService.findByNhanVien_IdAndTrangThai(nhanVienId, TrangThai.CHO_DUYET);
        messagingTemplate.convertAndSend("/topic/donduyet/" + nhanVienId, list);
        thongBaoDonHang();
    }

    public void thongBaoDonHang() {
        var list = donHangService.findByTrangThai(TrangThai.CHO_THIET_KE);
        System.out.println(list.size());
        messagingTemplate.convertAndSend("/topic/donhang", list);
    }

    public void thongBaoDonHoanThanh(String nhanVienId) {
        var list = donHangService.findDonHoanThanh(nhanVienId);
        messagingTemplate.convertAndSend("/topic/donhoanthanh/" + nhanVienId, list);
    }

    public void thongBaoDonHuy(String nhanVienId) {
        var list = donHangService.findByNhanVien_IdAndTrangThai(nhanVienId, TrangThai.HUY);
        messagingTemplate.convertAndSend("/topic/donhuy/" + nhanVienId, list);
    }

    public void guiThongBaoCapNhatDonHang(Boolean daThuMua, List<DonThuMua> danhSachDon) {
        String destination = daThuMua ? "/topic/dondathumua" : "/topic/donthumua";
        messagingTemplate.convertAndSend(destination, danhSachDon);
    }


}
