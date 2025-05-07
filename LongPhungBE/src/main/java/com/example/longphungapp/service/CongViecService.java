package com.example.longphungapp.service;

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
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    public void setViec(Long id, TrangThai trangThai) {
        var congViec = congViecCTRepo.findById(id).orElseThrow(() -> new RuntimeException("Không tìm thấy công việc"));
        congViec.setTrangThai(trangThai);

        var nhanVien = new NhanVien();
        nhanVien.setId("NV00001");
        congViec.setNhanVien(nhanVien);

        if (trangThai == TrangThai.DA_GIAO) {
            var lichSu = new LichSuCV();
            lichSu.setCongViecCT(congViec);
            lichSu.setNhanVien(nhanVien);
            lichSu.setTrangThai(trangThai);
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

            congViecCTRepo.save(newCV);
        } else {
            var ls = new LichSuCV();
            ls.setCongViecCT(congViec);
            ls.setNhanVien(congViec.getNhanVien());
            ls.setTrangThai(TrangThai.DA_GIAO);
            lichSuCVRepo.save(ls);

            var donHangCT = congViec.getDonHangCT();
            donHangCT.setTrangThai(TrangThai.CHO_VAN_CHUYEN);
            donHangCTRepo.save(donHangCT);
        }

        updateTrangThaiDonHang(congViec.getDonHangCT().getDonHang().getMaDonHang());
        return  newCV.getTacVu().toString();
    }

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
