package com.example.longphungapp.service;


import com.example.longphungapp.Exception.BadReqException;
import com.example.longphungapp.component.SessionUtils;
import com.example.longphungapp.entity.CongViecCT;
import com.example.longphungapp.entity.LichSuCV;
import com.example.longphungapp.entity.NhanVien;
import com.example.longphungapp.fileEnum.TacVu;
import com.example.longphungapp.fileEnum.TrangThai;
import com.example.longphungapp.repository.CongViecCTRepository;
import com.example.longphungapp.repository.DonHangCTRepository;
import com.example.longphungapp.repository.DonHangRepository;
import com.example.longphungapp.repository.LichSuCVRepository;
import com.example.longphungapp.repository.QuyTrinhCongDoanRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.session.Session;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
public class CongViecService {

    @Autowired
    private CongViecCTRepository congViecCTRepo;
    @Autowired
    private DonHangRepository donHangRepo;
    @Autowired
    private DonHangCTRepository donHangCTRepo;
    @Autowired
    private LichSuCVRepository lichSuCVRepo;
    @Autowired
    private QuyTrinhCongDoanRepository quyTrinhCongDoanRepo;


    public List<CongViecCT> findAll() {
        return congViecCTRepo.findAll();
    }

    public List<CongViecCT> findByTrangThaiAndTacVu(TrangThai trangThai, String tacVu) {
        TacVu tv = TacVu.valueOf(tacVu);
        return removeNestedData(congViecCTRepo.findByTrangThaiAndTacVu(trangThai, tv));
    }

    public List<CongViecCT> findByNhanVien_IdAndTrangThai(String id, TrangThai trangThai) {
        return removeNestedData(congViecCTRepo.findByNhanVien_IdLikeAndTrangThai(id, trangThai));
    }

    public List<CongViecCT> findCongViecHoanThanh(String nhanVienId) {
        var lichSuList = lichSuCVRepo.findByNhanVien_Id(nhanVienId);
        var congViecList = lichSuList.stream().map(LichSuCV::getCongViecCT).toList();
        return removeNestedData(congViecList);
    }

    public String getNhanVienTK(Long id) {
        var congViec = congViecCTRepo.findById(id).orElseThrow(() -> new RuntimeException("Không tìm thấy công việc"));
        return congViec.getNhanVien().getId();
    }

    @Transactional(rollbackFor = Exception.class)
    public void setViec(Long id,String maNV, TrangThai trangThai) {
        var congViec = congViecCTRepo.findById(id).orElseThrow(() -> new RuntimeException("Không tìm thấy công việc"));
        congViec.setTrangThai(trangThai);

        var nhanVien = new NhanVien();
        nhanVien.setId(maNV);
        congViec.setNhanVien(nhanVien);

        if (trangThai == TrangThai.DA_GIAO) {
            var lichSu = new LichSuCV();
            lichSu.setCongViecCT(congViec);
            lichSu.setNhanVien(nhanVien);
            lichSu.setTrangThai(trangThai);
            BigDecimal kpi = congViec.getKpi();
            if(congViec.getTacVu() != TacVu.THIET_KE) kpi = kpi.multiply(BigDecimal.valueOf(congViec.getDonHangCT().getSoLuong()));
            lichSu.setKpi(kpi);
            lichSuCVRepo.save(lichSu);

            congViec.setNgayGiao(new java.util.Date());
        }

        congViecCTRepo.save(congViec);
    }

    @Transactional(rollbackFor = Exception.class)
    public void setDonHangCT(Long id) {
        var donHangCT = congViecCTRepo.findById(id).orElseThrow(() -> new RuntimeException("Không tìm thấy công việc"))
                .getDonHangCT();
        donHangCT.setTrangThai(TrangThai.DA_GIAO);
        donHangCTRepo.save(donHangCT);

        var listDonCT = donHangCTRepo.findByDonHang_MaDonHang(donHangCT.getDonHang().getMaDonHang());
        var donHangCTChuaGiao = listDonCT.stream().filter(ct -> ct.getTrangThai() != TrangThai.DA_GIAO).toList();

        if (donHangCTChuaGiao.isEmpty()) {
            var donHang = donHangRepo.findByMaDonHang(donHangCT.getDonHang().getMaDonHang());
            donHang.setTrangThai(TrangThai.CHO_DUYET);
            donHangRepo.save(donHang);
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

        var nextCD = listCD.stream()
                .filter(cd -> cd.getThuTu() == currentCD.getThuTu() + 1)
                .findFirst();

        if (nextCD.isPresent()) {
            newCV.setCongDoan(nextCD.get().getCongDoan());
            newCV.setTacVu(nextCD.get().getCongDoan().getTacVu());
            newCV.setKpi(nextCD.get().getCongDoan().getCongNV()
                    .multiply(BigDecimal.valueOf(nextCD.get().getCongDoan().getHeSoTienCong())));
            congViecCTRepo.save(newCV);
        } else {
//            var ls = new LichSuCV();
//            var sl = congViec.getDonHangCT().getSoLuong();
//            ls.setCongViecCT(congViec);
//            ls.setKpi(congViec.getKpi().multiply(BigDecimal.valueOf(congViec.getDonHangCT().getSoLuong())));
//            ls.setNhanVien(congViec.getNhanVien());
//            ls.setTrangThai(TrangThai.DA_GIAO);
//            lichSuCVRepo.save(ls);

            var donHangCT = congViec.getDonHangCT();
            donHangCT.setTrangThai(TrangThai.CHO_VAN_CHUYEN);
            donHangCTRepo.save(donHangCT);
        }

        updateTrangThaiDonHang(congViec.getDonHangCT().getDonHang().getMaDonHang());
        return  newCV.getTacVu().toString();
    }

    @Transactional(rollbackFor = Exception.class)
    public void createFistJobs(Long id){
        var congViecCT = congViecCTRepo.findById(id).orElseThrow(()-> new BadReqException("Không tìm thấy công việc"));
        var found = congViecCT.getDonHangCT();

            var cdOpt = found.getSanPham()
                    .getQuyTrinh()
                    .getQuyTrinhCongDoans()
                    .stream()
                    .filter(j -> j.getThuTu() != null && j.getThuTu() == 1)
                    .findFirst();

            if (cdOpt.isEmpty()) {
                System.out.println("❌ Không tìm thấy công đoạn thứ tự 1 cho sản phẩm: " + found.getSanPham().getTenSP());
                cdOpt.get().getQuyTrinh().getQuyTrinhCongDoans().forEach(cd ->
                        System.out.println("----> ThuTu: " + cd.getThuTu())
                );
                throw new BadReqException("Không có công đoạn bắt đầu cho sản phẩm");
            }
            var cv = new CongViecCT();
            var kpi = cdOpt.get().getCongDoan().getCongNV()
                    .multiply(BigDecimal.valueOf(cdOpt.get().getCongDoan().getHeSoTienCong()));
            cv.setDonHangCT(found);
            cv.setCongDoan(cdOpt.get().getCongDoan());
            cv.setKpi(kpi);
            cv.setTrangThai(TrangThai.CHO_NHAN_DON);
            cv.setTacVu(cdOpt.get().getCongDoan().getTacVu());
            congViecCTRepo.save(cv);
    };

    // --- PRIVATE METHODS ---

    private void updateTrangThaiDonHang(String maDonHang) {
        var listDonCT = donHangCTRepo.findByDonHang_MaDonHang(maDonHang);
        boolean allChuaGiao = listDonCT.stream().allMatch(ct -> ct.getTrangThai() != TrangThai.DA_GIAO);
        if (allChuaGiao) {
            var donHang = donHangRepo.findByMaDonHang(maDonHang);
            donHang.setTrangThai(TrangThai.CHO_VAN_CHUYEN);
            donHangRepo.save(donHang);
        }
    }

    private List<CongViecCT> removeNestedData(List<CongViecCT> list) {
        return list.stream().peek(cv -> {
            var sanPham = cv.getDonHangCT().getSanPham();
            if (sanPham.getQuyTrinh() != null) {
                sanPham.getQuyTrinh().setQuyTrinhCongDoans(null);
            }
            sanPham.setNguyenVatLieus(null);
        }).toList();
    }
}
