package com.example.longphungapp.service;


import com.example.longphungapp.Exception.BadReqException;
import com.example.longphungapp.component.SessionUtils;
import com.example.longphungapp.dto.ListChia;
import com.example.longphungapp.entity.*;
import com.example.longphungapp.fileEnum.TacVu;
import com.example.longphungapp.fileEnum.TrangThai;
import com.example.longphungapp.repository.*;
import jakarta.persistence.EntityManager;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.session.Session;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Objects;
@Slf4j
@Service
@RequiredArgsConstructor
public class CongViecService {


    private final CongViecCTRepository congViecCTRepo;
    private final DonHangRepository donHangRepo;
    private final LichSuCVRepository lichSuCVRepo;
    private final TonKhoRepository tonKhoRepo;
    private final DonHangCTRepository donHangCTRepository;
    private final NhanVienRepository nhanVienRepository;
    private final PhanPhoiDonHangRepository phanPhoiDonHangRepository;
    private final ChamCongRepository chamCongRepository;
    private Double kichThuocMica = 2880000.0;
    private Double tiLeKeo = 0.0014;
    private BigDecimal kpiXuong = BigDecimal.valueOf(0.02);
    private BigDecimal kpiKhu = BigDecimal.valueOf(0.03);


    public List<CongViecCT> findAll() {
        return congViecCTRepo.findAll();
    }

    public List<CongViecCT> findByTrangThai(TrangThai trangThai) {
        return removeNestedData(congViecCTRepo.findByTrangThai(trangThai));
    }

    public List<CongViecCT> findByNhanVien_IdAndTrangThai(String id, TrangThai trangThai) {
        return removeNestedData(congViecCTRepo.findByNhanVien_IdLikeAndTrangThai(id, trangThai));
    }

    public List<CongViecCT> findCongViecHoanThanh(String nhanVienId) {
        var lichSuList = lichSuCVRepo.findByNhanVien_Id(nhanVienId);
        var congViecList = lichSuList.stream().map(LichSuCV::getCongViecCT).toList();
        return removeNestedData(congViecList);
    }

    public String getNhanVienTK(Long id, Boolean isViec) {
        CongViecCT congViec;
        if (isViec) {
            congViec = congViecCTRepo.findById(id)
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy công việc"));
        }else{
            var list = congViecCTRepo.findByDonHangCT_Id(id);
            if(list == null){
                throw new BadReqException("Không tìm thấy công việc");
            }
            congViec = list.stream().filter(i-> i.getTrangThai() == TrangThai.DA_GIAO)
                    .findFirst().orElseThrow(()-> new BadReqException("Không tìm thấy công việc"));
        }
        return congViec.getNhanVien().getId();
    }

    @Transactional(rollbackFor = Exception.class)
    public void setViec(Long id, String maNV, TrangThai trangThai, Boolean isViec) {
        CongViecCT congViec;

        if (isViec) {
             congViec = congViecCTRepo.findById(id)
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy công việc"));
        }else{
            var list = congViecCTRepo.findByDonHangCT_Id(id);
            if(list == null){
                throw new BadReqException("Không tìm thấy công việc");
            }
            congViec = list.stream().filter(i-> i.getTrangThai() != TrangThai.DA_GIAO)
                    .findFirst().orElseThrow(()-> new BadReqException("Không tìm thấy công việc"));
        }

        congViec.setTrangThai(trangThai);

        if(maNV != null){
            NhanVien nhanVien = new NhanVien();
            nhanVien.setId(maNV);
            congViec.setNhanVien(nhanVien);
        }

        congViecCTRepo.save(congViec);

        if (trangThai == TrangThai.DA_GIAO) {
            var nhanVien = congViec.getNhanVien();
            handleDaGiao(congViec, nhanVien);
        }

    }

    @Transactional(rollbackFor = Exception.class)
    public void chiaDon(Long id, List<ListChia> map, String maNV, TrangThai trangThai) {
        CongViecCT congViecGoc = congViecCTRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy công việc"));

        // Cập nhật trạng thái bản gốc nếu cần
        congViecGoc.setTrangThai(trangThai);
        congViecCTRepo.save(congViecGoc);

        var kpiGoc = congViecGoc.getKpi();
        var donHangCT = congViecGoc.getDonHangCT();
        long soLuongDaTru = 0;

        for (ListChia i : map) {
            var nhanVien = nhanVienRepository.findById(i.getMaNV())
                    .orElseThrow(() -> new BadReqException("Không tìm thấy nhân viên"));

            // Tạo bản sao công việc
            CongViecCT cvMoi = new CongViecCT();
            cvMoi.setDonHangCT(donHangCT);
            cvMoi.setNhanVien(nhanVien);
            cvMoi.setTrangThai(TrangThai.DA_GIAO);
            cvMoi.setKpi(kpiGoc.multiply(BigDecimal.valueOf(i.getSoLuong())));

            congViecCTRepo.save(cvMoi);

            handleDaGiao(cvMoi, nhanVien);
            soLuongDaTru += i.getSoLuong();
        }

        // Phần còn lại giao cho người tạo
        long soLuongConLai = donHangCT.getSoLuong() - soLuongDaTru;
        if (soLuongConLai > 0) {
            var nhanVienNguoiChia = nhanVienRepository.findById(maNV)
                    .orElseThrow(() -> new BadReqException("Không tìm thấy nhân viên"));

            CongViecCT cvConLai = new CongViecCT();
            cvConLai.setDonHangCT(donHangCT);
            cvConLai.setNhanVien(nhanVienNguoiChia);
            cvConLai.setTrangThai(TrangThai.DA_GIAO);
            cvConLai.setKpi(kpiGoc.multiply(BigDecimal.valueOf(soLuongConLai)));

            congViecCTRepo.save(cvConLai);

            handleDaGiao(cvConLai, nhanVienNguoiChia);
        }
    }

    private void handleDaGiao(CongViecCT congViec, NhanVien nhanVien) {
        congViec.setNgayGiao(new Date());
        saveLichSu(congViec, nhanVien);

    }

    private void saveLichSu(CongViecCT congViec, NhanVien nhanVien) {
        LichSuCV lichSu = new LichSuCV();
        lichSu.setCongViecCT(congViec);
        lichSu.setNhanVien(nhanVien);
        lichSu.setTrangThai(TrangThai.DA_GIAO);

        BigDecimal kpi = congViec.getKpi();
        if (congViec.getTacVu() != TacVu.THIET_KE) {
            kpi = kpi.multiply(BigDecimal.valueOf(congViec.getDonHangCT().getSoLuong()));
        }
        lichSu.setKpi(kpi);

        var newLSCV = lichSuCVRepo.save(lichSu);
        setKPIQL(congViec,newLSCV);

    }

    public void setKPIQL(CongViecCT congViec, LichSuCV ls) {
        var donHangCT = congViec.getDonHangCT();
        var donHang = donHangCT.getDonHang();
        var phanPhoi = phanPhoiDonHangRepository.findByDonHang_Id(donHang.getId());

        if (phanPhoi == null) return;

        var xuong = phanPhoi.getXuong();
        var khu = phanPhoi.getKhu();

        var qlXuong = nhanVienRepository.findByChucVu_IdAndXuong_Id(2, xuong.getId());
        var qlKhu = khu != null
                ? nhanVienRepository.findByChucVu_IdAndXuong_IdAndKhu_Id(3, xuong.getId(), khu.getId())
                : null;

        if (qlXuong != null) {
            saveChamCong(qlXuong, ls, congViec.getKpi().multiply(kpiXuong));
        }

        if (qlKhu != null) {
            saveChamCong(qlKhu, ls, congViec.getKpi().multiply(kpiKhu));
        }
    }

    private void saveChamCong(NhanVien nv, LichSuCV ls, BigDecimal kpi) {
        ChamCong cc = new ChamCong();
        cc.setNhanVien(nv);
        cc.setLichSuCV(ls);
        cc.setKpi(kpi);
        chamCongRepository.save(cc);
    }

    @Transactional(rollbackFor = Exception.class)
    public void setDonHangCT(Long id, TrangThai trangThai, Boolean isViec) {
        DonHangCT donHangCT;
        try {
            if(isViec){
                donHangCT= congViecCTRepo.findById(id)
                        .orElseThrow(()-> new RuntimeException("Không tìm thấy đơn hàng")).getDonHangCT();
            }else{
                donHangCT = donHangCTRepository.findById(id)
                        .orElseThrow(()-> new RuntimeException("Không tìm thấy đơn hàng"));
            }

            System.out.println("id don hang"+donHangCT.getId());
            donHangCT.setTrangThai(trangThai);
            var dhct = donHangCTRepository.save(donHangCT);

            System.out.println("da set thanh cong: " +dhct.getId()+" "+ dhct.getTrangThai().toString());

            var listDonCT = donHangCTRepository.findByDonHang_MaDonHang(donHangCT.getDonHang().getMaDonHang());
            var donHangCTChuaGiao = listDonCT.stream().filter(ct -> ct.getTrangThai() != TrangThai.DA_GIAO).toList();

            if (donHangCTChuaGiao.isEmpty()) {
                var donHang = donHangRepo.findByMaDonHang(donHangCT.getDonHang().getMaDonHang());
                donHang.setTrangThai(TrangThai.CHO_DUYET);
                donHangRepo.save(donHang);
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Transactional(rollbackFor = Exception.class)
    public String createCVCT(Long id) {
        var congViec = congViecCTRepo.findById(id).orElseThrow(() -> new RuntimeException("Không tìm thấy công việc"));
        var newCV = new CongViecCT();
        BeanUtils.copyProperties(congViec, newCV);
        newCV.setId(null);
        newCV.setTrangThai(TrangThai.CHO_NHAN_DON);

        var quyTrinh = congViec.getDonHangCT().getSanPham().getQuyTrinh();
        var listCD = quyTrinh.getQuyTrinhCongDoans();
        var currentCD = listCD.stream()
                .filter(cd -> cd.getCongDoan().getId().equals(congViec.getCongDoan().getId()))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Không tìm thấy công đoạn"));

        if(currentCD.getThuTu() == 2 ){
            boolean haiMat = false;
            for (var i : quyTrinh.getQuyTrinhCongDoans()) {
                int check = 0;
                if (i.getCongDoan().getTenCongDoan().equalsIgnoreCase("ĐỔ KEO")) {
                    check++;
                }
                if(check == 2){
                    haiMat = true;
                    break;
                }
            }
            capNhatTonKho(congViec, haiMat, false);
        }

        var nextCD = listCD.stream()
                .filter(cd -> cd.getThuTu() == currentCD.getThuTu() + 1)
                .findFirst();

        if (nextCD.isPresent()) {
            newCV.setCongDoan(nextCD.get().getCongDoan());

            newCV.setKpi(nextCD.get().getCongDoan().getCongNV()
                    .multiply(BigDecimal.valueOf(nextCD.get().getCongDoan().getHeSoTienCong())));
            congViecCTRepo.save(newCV);
        } else {

            var donHangCT = congViec.getDonHangCT();
            donHangCT.setTrangThai(TrangThai.CHO_VAN_CHUYEN);
            donHangCTRepository.save(donHangCT);
        }

        updateTrangThaiDonHang(congViec.getDonHangCT().getDonHang().getMaDonHang());
        return  newCV.getTacVu().toString();
    }

    public void capNhatTonKho(CongViecCT congViec, boolean haiMat, boolean isCongLai) {
        DonHangCT dh = congViec.getDonHangCT();
        double dienTich = dh.getChieuDai() * dh.getChieuRong();
        int soLuong = dh.getSoLuong();

        for (VatTu vatTu : dh.getSanPham().getNguyenVatLieus()) {
            TonKho tonKho = tonKhoRepo.findByVatTu_Id(vatTu.getId());
            long donViId = vatTu.getDoViTinh().getId();

            double deltaKichThuoc = 0;
            long deltaSoLuong = 0;

            if (donViId == 4) { // mica theo diện tích
                deltaKichThuoc = dienTich * soLuong;
                deltaSoLuong = (long) (deltaKichThuoc / kichThuocMica);
            } else if (donViId == 5) { // keo theo diện tích và tỉ lệ
                double soMat = haiMat ? 2 : 1;
                deltaKichThuoc = dienTich * soLuong * tiLeKeo * soMat;
                deltaSoLuong = (long) (deltaKichThuoc / 800);
            } else { // các vật tư còn lại
                deltaSoLuong = soLuong;
            }

            if (isCongLai) {
                tonKho.setKichThuoc(tonKho.getKichThuoc() + deltaKichThuoc);
                tonKho.setSoLuong(tonKho.getSoLuong() + deltaSoLuong);
            } else {
                if (donViId == 4 || donViId == 5) {
                    tonKho.setKichThuoc(tonKho.getKichThuoc() - deltaKichThuoc);
                }
                tonKho.setSoLuong(tonKho.getSoLuong() - deltaSoLuong);
            }

            tonKhoRepo.save(tonKho);
        }
    }

    @Transactional(rollbackFor = Exception.class)
    public void createFistJobs(Long id){
        System.out.println("id don tao cv: "+ id);
        var found = donHangCTRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Không tìm thấy đơn hàng"));

            var cdOpt = found.getSanPham()
                    .getQuyTrinh()
                    .getQuyTrinhCongDoans()
                    .stream()
                    .filter(j -> j.getThuTu() != null && j.getThuTu() == 1)
                    .findFirst();

            if (cdOpt.isEmpty()) {
                throw new BadReqException("Không có công đoạn bắt đầu cho sản phẩm");
            }
            var cv = new CongViecCT();
            var kpi = cdOpt.get().getCongDoan().getCongNV()
                    .multiply(BigDecimal.valueOf(cdOpt.get().getCongDoan().getHeSoTienCong()));
            cv.setDonHangCT(found);
            cv.setCongDoan(cdOpt.get().getCongDoan());
            cv.setKpi(kpi);
            cv.setTrangThai(TrangThai.CHO_NHAN_DON);
            cv.setTacVu(TacVu.SAN_XUAT);

            congViecCTRepo.save(cv);
    };

    public String getMaNVTao(Long id){
        var congViec = congViecCTRepo.findById(id).orElseThrow(()-> new BadReqException("Không tìm thấy công việc"));
        return congViec.getDonHangCT().getDonHang().getNhanVien().getId();
    }

    // --- PRIVATE METHODS ---

    private void updateTrangThaiDonHang(String maDonHang) {
        var listDonCT = donHangCTRepository.findByDonHang_MaDonHang(maDonHang);
        boolean allChuaGiao = listDonCT.stream().allMatch(ct -> ct.getTrangThai() != TrangThai.DA_GIAO);
        if (allChuaGiao) {
            var donHang = donHangRepo.findByMaDonHang(maDonHang);
            donHang.setTrangThai(TrangThai.CHO_VAN_CHUYEN);
            donHangRepo.save(donHang);
        }
    }

    private List<CongViecCT> removeNestedData(List<CongViecCT> list) {
        if (list.isEmpty()) {
            return list;
        }

        System.out.println("list size: " + list.size());

        return list.stream()
                .filter(Objects::nonNull)
                .peek(cv -> {
                    var donHangCT = cv.getDonHangCT();
                    if (donHangCT != null) {
                        var sanPham = donHangCT.getSanPham();
                        if (sanPham != null) {
                            if (sanPham.getQuyTrinh() != null) {
                                sanPham.getQuyTrinh().setQuyTrinhCongDoans(null);
                            }
                            sanPham.setNguyenVatLieus(null);
                        }
                    }
                })
                .toList();
    }


}
