package com.example.longphungapp.service;

import com.example.longphungapp.Exception.BadReqException;
import com.example.longphungapp.dto.PhanPhoiDonDto;
import com.example.longphungapp.entity.*;
import com.example.longphungapp.fileEnum.TrangThai;
import com.example.longphungapp.repository.DonHangCTRepository;
import com.example.longphungapp.repository.DonHangRepository;
import com.example.longphungapp.repository.NhanVienRepository;
import com.example.longphungapp.repository.PhanPhoiDonHangRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class PhanPhoiService {
    private final PhanPhoiDonHangRepository phanPhoiDao;
    private final DonHangCTRepository ctDao;
    private final CongViecService cvService;
    private final DonHangRepository dao;
    private final NhanVienRepository nhanVienRepository;
    private final DonHangWorkflowService workflowService;

    @Transactional(rollbackFor = Exception.class)
    public PhanPhoiDonHang setPhanPhoiDon(PhanPhoiDonDto dto) {
        PhanPhoiDonHang ppdh = phanPhoiDao.findByDonHang_MaDonHang(dto.getMaDonHang());
        boolean isNew = (ppdh == null);

        if (isNew) {
            var dh = dao.findByMaDonHang(dto.getMaDonHang());
            ppdh = new PhanPhoiDonHang();
            ppdh.setDonHang(dh);
        }

        // Set Xưởng
        ppdh.setXuong(new Xuong(dto.getXuong(), ""));
        var qlXuong = nhanVienRepository.findByChucVu_IdAndXuong_Id(2, dto.getXuong());
        ppdh.setNguoiNhan(qlXuong);

        // Nếu có khu thì set và tạo jobs
        if (dto.getKhu() != null) {
            ppdh.setKhu(new Khu(dto.getKhu(), ""));
            var donHangId = isNew ? ppdh.getDonHang().getId() : ppdh.getDonHang().getId();
            assignFirstJobs(donHangId);
            var qlKhu = dto.getKhu() != null
                    ? nhanVienRepository.findByChucVu_IdAndXuong_IdAndKhu_Id(3, dto.getXuong(), dto.getKhu())
                    : null;
            if(qlKhu != null) ppdh.setNguoiNhan(qlKhu);

        }
        workflowService.setDonHangStatus(ppdh.getDonHang().getId(), TrangThai.CHO_SAN_XUAT, false);
        return phanPhoiDao.save(ppdh);
    }


    private void assignFirstJobs(Long donHangId) {
        ctDao.findByDonHang_Id(donHangId).forEach(i -> cvService.createFistJobs(i.getId()));
    }

    @Transactional
    public void nhanDon(DonHang don, NhanVien nhanVien) {
        var xuongNV = nhanVien.getXuong();
        var khuNV = nhanVien.getKhu();

        var phanPhoi = phanPhoiDao.findByDonHang_Id(don.getId());

        if (phanPhoi == null) {
            if (xuongNV == null) throw new BadReqException("Bạn không thuộc xưởng nào để nhận đơn");
            phanPhoi = new PhanPhoiDonHang();
            phanPhoi.setDonHang(don);
            phanPhoi.setXuong(xuongNV);
            phanPhoi.setNguoiNhan(nhanVien);
            phanPhoiDao.save(phanPhoi);
            workflowService.setDonHangStatus(don.getId(), TrangThai.CHO_SAN_XUAT, false);
            return;
        }

        if (phanPhoi.getXuong() == null) {
            phanPhoi.setXuong(xuongNV);
            phanPhoiDao.save(phanPhoi);
            workflowService.setDonHangStatus(don.getId(), TrangThai.CHO_SAN_XUAT, false);
            return;
        }

        if (phanPhoi.getKhu() != null) throw new BadReqException("Đơn này đã được nhận bởi khu khác");
        if (!phanPhoi.getXuong().getId().equals(xuongNV.getId())) throw new BadReqException("Bạn không thuộc xưởng được phân phối đơn này");

        phanPhoi.setKhu(khuNV);
        phanPhoi.setNguoiNhan(nhanVien);
        phanPhoiDao.save(phanPhoi);
        workflowService.setDonHangStatus(don.getId(), TrangThai.CHO_SAN_XUAT, false);
        // create first jobs for details
        ctDao.findByDonHang_Id(don.getId()).forEach(dct -> {
            if (dct.getSoLuong() > 500) {
                dct.setTrangThai(TrangThai.CHO_XAC_NHAN_CHIA);
                ctDao.save(dct);
            } else {
                cvService.createFistJobs(dct.getId());
            }
        });
    }
}
