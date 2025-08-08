package com.example.longphungapp.service;

import com.example.longphungapp.Interface.MapperInterface;
import com.example.longphungapp.dto.DonHangCTDto;
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

    public void thongBaoDonChot(String id){
        var list = donHangService.findByNhanVien_IdAndTrangThai(id, TrangThai.CHO_XAC_NHAN);
        System.out.println("side don chot " + list.size());
        messagingTemplate.convertAndSend("/topic/donhangchot/"+id, list);
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
        List<DonHangCTDto> listDTO = list.stream()
                .map(donCT -> {
                    return MapperInterface.MAPPER.toDto(donCT);
                })
                .toList();

        messagingTemplate.convertAndSend("/topic/donchoduyet/"+nhanVienId, listDTO);
        thongBaoDonDuyet(nhanVienId);
        thongBaoDonHang();

    }

    public void guiThongBaoCapNhatDonHang(Boolean daThuMua, List<DonThuMua> danhSachDon) {
        String destination = daThuMua ? "/topic/dondathumua" : "/topic/donthumua";
        messagingTemplate.convertAndSend(destination, danhSachDon);
    }

}
