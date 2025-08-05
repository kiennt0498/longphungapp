package com.example.longphungapp.service;

import com.example.longphungapp.dto.NhanViecReq;
import com.example.longphungapp.entity.DonHangCT;
import com.example.longphungapp.entity.DonThuMua;
import com.example.longphungapp.entity.ListGiaThuMua;
import com.example.longphungapp.entity.NhanVien;
import com.example.longphungapp.fileEnum.TrangThai;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

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

    public void thongBaoDonChoDuyet(String nhanVienId) {
        var list = donHangService.findByDonHang_NhanVien_IdAndTrangThai(nhanVienId, TrangThai.CHO_DUYET);
        System.out.println("list don hang cd: "+list.size());
        var listfilter = list.stream()
                .filter(Objects::nonNull) // loại bỏ phần tử null
                .peek(dh -> {
                    var sanPham = dh.getSanPham();
                    if (sanPham.getQuyTrinh() != null) {
                        sanPham.getQuyTrinh().setQuyTrinhCongDoans(null);
                    }
                    sanPham.setNguyenVatLieus(null);
                })
                .toList();

        messagingTemplate.convertAndSend("/topic/donchoduyet/"+nhanVienId, listfilter);
        thongBaoDonDuyet(nhanVienId);
        thongBaoDonHang();

    }

    public void guiThongBaoCapNhatDonHang(Boolean daThuMua, List<DonThuMua> danhSachDon) {
        String destination = daThuMua ? "/topic/dondathumua" : "/topic/donthumua";
        messagingTemplate.convertAndSend(destination, danhSachDon);
    }

}
