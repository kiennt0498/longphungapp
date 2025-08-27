package com.example.longphungapp.controller;

import com.example.longphungapp.dto.*;
import com.example.longphungapp.fileEnum.TrangThai;
import com.example.longphungapp.service.DonHangService;
import com.example.longphungapp.service.PhanPhoiService;
import com.example.longphungapp.service.ThongBaoDonHangService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/bill")
@CrossOrigin
@RequiredArgsConstructor
@Slf4j
public class DonHangController {

    private final DonHangService service;
    private final ThongBaoDonHangService tbService;
    private final SimpMessagingTemplate messagingTemplate;
    private final PhanPhoiService phanPhoiService;

    /* ======================= REST API ======================= */

    @GetMapping("/donct/{id}")
    public ResponseEntity<?> getChiTietDon(@PathVariable String id) {
        log.info("Lấy chi tiết đơn hàng id={}", id);
        return ResponseEntity.ok(service.findByDonHang_MaDonHang(id));
    }

    @PostMapping("/setPhanPhoi")
    public ResponseEntity<String> setPhanPhoi(@RequestBody PhanPhoiDonDto dto) {
        log.info("Phân phối đơn: {}", dto);
        var ppdh =  phanPhoiService.setPhanPhoiDon(dto);

        refreshDonSauPhanPhoi(ppdh.getNguoiNhan().getId());
        return ResponseEntity.ok("Phân phối đơn thành công");
    }

    @PostMapping("/createDonAo")
    public ResponseEntity<String> createDonAo(@RequestBody donAoDto dto) {
        log.info("Tạo đơn ảo: {}", dto);
        service.createDonAo(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body("Tạo đơn thành công");
    }

    @PutMapping("/updateCT/{id}")
    public ResponseEntity<Void> setImage(@PathVariable Long id, @RequestBody ImagesDto dto) {
        log.info("Cập nhật ảnh cho chi tiết id={}, imageId={}", id, dto.getId());
        service.setImage(id, dto.getId());
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/create")
    public ResponseEntity<?> createDon(@RequestBody TaoDonDTO dto) {
        log.info("Tạo đơn mới: {}", dto);
        return ResponseEntity.ok(service.saveListDon(dto));
    }

    @GetMapping("getDonGuiPhieu/{id}")
    public ResponseEntity<?> getDonPhieu(@PathVariable String id) {
        return ResponseEntity.ok(service.getDonPhieu(id));
    }

    @PutMapping("/huydon")
    public ResponseEntity<String> huyDon(@RequestBody DonHuyDto dto, @RequestParam String maNV) {
        log.info("Hủy đơn: {}, maNV={}", dto, maNV);
        service.huyDon(dto);
        refreshDonSauHuy(maNV);
        tbService.thongBaoDonHuy(maNV);
        return ResponseEntity.ok("Hủy đơn thành công");
    }

    @PutMapping("/chotdon/{id}")
    public ResponseEntity<String> chotDon(@PathVariable String id, @RequestParam String maNV) {
        log.info("Chốt đơn id={}, maNV={}", id, maNV);
        service.chotDon(id);
        getDonDuyet(maNV);
        getDonHT(maNV);
        return ResponseEntity.ok("Chốt đơn thành công");
    }

    @GetMapping("/donhuy/{id}")
    public ResponseEntity<?> getLyDoHuy(@PathVariable Long id) {
        log.info("Lấy lý do hủy cho đơn chi tiết id={}", id);
        return ResponseEntity.ok(service.getLyDoHuy(id));
    }

    @PostMapping("/donhangct/{id}/chia")
    public ResponseEntity<Void> chiaDonHangCT(@PathVariable Long id, @RequestParam Integer soPhan) {
        log.info("Chia đơn hàng chi tiết id={}, số phần={}", id, soPhan);
        // TODO: Gọi service xử lý chia đơn nếu có
        return ResponseEntity.noContent().build();
    }

    /* ======================= WebSocket Message Mapping ======================= */

    @MessageMapping("/getDonDuyet")
    public void getDonDuyet(@Payload String id) {
        log.debug("WS: getDonDuyet for id={}", id);
        tbService.thongBaoDonDuyet(id);
    }

    @MessageMapping("/getDonHang")
    public void getDonHang() {
        log.debug("WS: getDonHang");
        tbService.thongBaoDonHang();
    }

    @MessageMapping("/getDonChoDuyet")
    public void getDonChoDuyet(@Payload String id) {
        log.debug("WS: getDonChoDuyet for id={}", id);
        tbService.thongBaoDonChoDuyet(id);
    }

    @MessageMapping("/getDonHT")
    public void getDonHT(@Payload String id) {
        log.debug("WS: getDonHT for id={}", id);
        tbService.thongBaoDonHoanThanh(id);
    }

    @MessageMapping("/getDonHuy")
    public void getDonHuy(@Payload String id) {
        log.debug("WS: getDonHuy for id={}", id);
        tbService.thongBaoDonHuy(id);
    }

    @MessageMapping("/getDonNhan")
    public void getDonNhan() {
        var list = service.findByTrangThai(TrangThai.CHO_NHAN_DON);

        messagingTemplate.convertAndSend("/topic/donnhan", list);
    }

    @MessageMapping("/getDonXuongNhan")
    public void getDonXuongNhan(@Payload String id) {
        var xuong = service.getXuong(id);
        var list = service.getDonXuongNhan(xuong);
        messagingTemplate.convertAndSend("/topic/donxuongnhan/" + xuong, list);
    }

    @MessageMapping("/getDonDaPP")
    public void getDonDaPP(String maNV) {
        var xuong = service.getXuong(maNV);
        var list = service.getDonDaPP(xuong);
        messagingTemplate.convertAndSend("/topic/dondapp/" + xuong, list);
    }

    @MessageMapping("/getDonKhuNhan")
    public void getDonKhuNhan(String maNV) {
        log.debug("WS: getDonKhuNhan xuong={}, khu={}", maNV);
        var xuong = service.getXuong(maNV);
        var khu = service.getKhu(maNV);
        messagingTemplate.convertAndSend("/topic/donkhunhan/" + khu, service.getDonKhuNhan(xuong, khu));
    }

    @MessageMapping("/getDonXuongHT")
    public void getDonXuongHT(String maNV) {
        log.debug("WS: getDonXuongHT maNV={}", maNV);
        var xuong = service.getXuong(maNV);
        messagingTemplate.convertAndSend("/topic/donxuonght/" + xuong, service.getDonXuongHT(xuong));
    }

    @MessageMapping("/NhanDon")
    public void nhanDon(NhanViecReq req) {
        log.debug("WS: NhanDon {}", req);
        service.nhanDon(req.getId(), req.getMaNV());
        refreshDonNhanVien(req.getMaNV());
    }

    @MessageMapping("/getDonChia")
    public void getDonChia(@Payload String id) {
        log.debug("WS: getDonChia id={}", id);
        messagingTemplate.convertAndSend("/topic/donchia/" + id, service.getListDonChia(id));
    }

    @MessageMapping("/hoanDonKhu")
    public void hoanDonKhu(NhanViecReq req) {
        log.debug("WS: hoanDonKhu {}", req);
        service.HoanDonKhu(req.getId());
        refreshDonNhanVien(req.getMaNV());
    }

    @MessageMapping("/hoanDonXuong")
    public void hoanDonXuong(NhanViecReq req) {
        log.debug("WS: hoanDonXuong {}", req);
        service.HoanDonXuong(req.getId());
        refreshDonNhanVien(req.getMaNV());
        getDonNhan();
    }

    @MessageMapping("/getDonPhieu")
    public void getDonGuiPhieu(String maNV) {
        log.debug("WS: getDonGuiPhieu maNV={}", maNV);
        var list = service.findByNhanVien_IdAndTrangThai(maNV, TrangThai.CHO_GUI_PHIEU);
        System.out.println("list=" + list);
        messagingTemplate.convertAndSend("/topic/donPhieu/"+maNV, list);
    }

    /* ======================= Private Helper Methods ======================= */

    private void refreshDonSauPhanPhoi(String maNV) {
        getDonXuongNhan(maNV);
        getDonKhuNhan(maNV);
        getDonNhan();
    }

    private void refreshDonSauHuy(String maNV) {
        getDonHuy(maNV);
        getDonDuyet(maNV);
        getDonHT(maNV);
        getDonHang();
    }

    private void refreshDonNhanVien(String maNV) {
        getDonXuongNhan(maNV);
        getDonKhuNhan(maNV);
        getDonNhan();
        getDonChia(maNV);
    }
}
