package com.example.longphungapp.controller;

import com.example.longphungapp.component.SessionUtils;
import com.example.longphungapp.dto.*;
import com.example.longphungapp.entity.PhanPhoiDonHang;
import com.example.longphungapp.fileEnum.TrangThai;
import com.example.longphungapp.repository.PhanPhoiDonHangRepository;
import com.example.longphungapp.service.DonHangService;
import com.example.longphungapp.service.ThongBaoDonHangService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.http.HttpMessageConverters;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/bill")
@CrossOrigin
@RequiredArgsConstructor
public class DonHangController {

    private final DonHangService service;
    private final ThongBaoDonHangService tbService;
    private final SimpMessagingTemplate messagingTemplate;


    @GetMapping("donct/{id}")
    public ResponseEntity<?> getCT(@PathVariable String id) {

        return ResponseEntity.ok(service.findByDonHang_MaDonHang(id));
    }

    @PostMapping("createDonAo")
    public ResponseEntity createDonAo(@RequestBody donAoDto dto) {
        service.createDonAo(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body("Tạo đơn thành công");
    }

    @PutMapping("updateCT/{id}")
    public void setImage(@PathVariable Long id, @RequestBody ImagesDto dto) {
        service.setImage(id, dto.getId());
    }

    @PostMapping("create")
    public ResponseEntity<?> save(@RequestBody TaoDonDTO dto) {
        return ResponseEntity.ok(service.saveListDon(dto));
    }

    @PutMapping("huydon")
    public ResponseEntity<?> huyDon(@RequestBody DonHuyDto dto, @RequestParam String maNV) {

        service.huyDon(dto);

        getDonHuy(maNV);
        getDonDuyet(maNV);
        getDonHT(maNV);
        getDonHang();
        tbService.thongBaoDonHuy(maNV);
        return ResponseEntity.ok("Hủy đơn thành công");
    }

    @PutMapping("chotdon/{id}")
    public ResponseEntity<?> chotDon(@PathVariable String id,@RequestParam String maNV) {
        service.chotDon(id);
        getDonDuyet(maNV);
        getDonHT(maNV);
        return ResponseEntity.ok("Chốt đơn thành công");
    }

    @GetMapping("donhuy/{id}")
    public ResponseEntity<?> getLyDo(@PathVariable Long id) {
        return ResponseEntity.ok(service.getLyDoHuy(id));
    }

    @PostMapping("/donhangct/{id}/chia")
    public void chiaDonHangCT(@PathVariable Long id, @RequestParam Integer soPhan) {

    }

    @MessageMapping("/getDonDuyet")
    public void getDonDuyet(@Payload String id) {
        tbService.thongBaoDonDuyet(id);
    }

    @MessageMapping("/getDonHang")
    public void getDonHang() {
        tbService.thongBaoDonHang();
    }

    @MessageMapping("/getDonChoDuyet")
    public void getDonChoDuyet(@Payload String id) {
        tbService.thongBaoDonChoDuyet(id);
    }

    @MessageMapping("/getDonHT")
    public void getDonHT(@Payload String id) {
        tbService.thongBaoDonHoanThanh(id);
    }

    @MessageMapping("/getDonHuy")
    public void getDonHuy(@Payload String id) {
        tbService.thongBaoDonHuy(id);
    }

    @MessageMapping("/getDonNhan")
    public void getDonNhan() {
        var list = service.findByTrangThai(TrangThai.CHO_NHAN_DON);
        messagingTemplate.convertAndSend("/topic/donnhan", list);
    }

    @MessageMapping("/getDonXuongNhan")
    public void getDonXuongNhan(@Payload String maNV) {
        var xuong = service.getXuong(maNV);
        messagingTemplate.convertAndSend("/topic/donxuongnhan/"+ xuong, service.getDonXuongNhan(maNV));
    }

    @MessageMapping("/getDonDaPP")
    public void getDonDaPP(String maNV){
        var xuong = service.getXuong(maNV);
        messagingTemplate.convertAndSend("/topic/dondapp/"+xuong, service.getDonDaPP(xuong));
    }

    @MessageMapping("/getDonKhuNhan")
    public void getDonKhuNhan(String maNV){
        var khu = service.getKhu(maNV);
        messagingTemplate.convertAndSend("/topic/donkhunhan/"+khu, service.getDonKhuNhan(maNV));
    }

    @MessageMapping("/getDonXuongHT")
    public void getDonXuongHT(String maNV){
        var xuong = service.getXuong(maNV);
        messagingTemplate.convertAndSend("/topic/donxuonght/"+xuong, service.getDonXuongHT(xuong));
    }



    @MessageMapping("/NhanDon")
    public void NhanDon(NhanViecReq req) {
        var id = req.getId();
        service.nhanDon(req.getId(),req.getMaNV());
        getDonXuongNhan(req.getMaNV());
        getDonKhuNhan(req.getMaNV());
        getDonChia(req.getMaNV());
        getDonNhan();
    }

    @MessageMapping("/getDonChia")
    public void getDonChia(@Payload String id) {
        messagingTemplate.convertAndSend("/topic/donchia/"+id, service.getListDonChia(id));
    }

    @MessageMapping("/hoanDonKhu")
    public void hoanDonKhu(NhanViecReq req) {
        System.out.println("run hoan don khu");
        service.HoanDonKhu(req.getId());
        getDonXuongNhan(req.getMaNV());
        getDonKhuNhan(req.getMaNV());
        getDonChia(req.getMaNV());
    }

    @MessageMapping("/hoanDonXuong")
    public void hoanDonXuong(NhanViecReq req) {
        System.out.println("run hoan don xuong");
        service.HoanDonXuong(req.getId());
        getDonXuongNhan(req.getMaNV());
        getDonKhuNhan(req.getMaNV());
        getDonChia(req.getMaNV());
        getDonNhan();
    }

    @MessageMapping("/getDonGuiPhieu")
    public void getDonGuiPhieu(String maNV){

    }
}
