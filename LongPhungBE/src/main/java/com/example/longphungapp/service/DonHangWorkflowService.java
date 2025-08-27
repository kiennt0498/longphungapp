package com.example.longphungapp.service;

import com.example.longphungapp.Exception.BadReqException;
import com.example.longphungapp.entity.*;
import com.example.longphungapp.fileEnum.TrangThai;
import com.example.longphungapp.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class DonHangWorkflowService {
    private final DonHangRepository dao;
    private final LichSuDonHangRepository lichDao;
    private final LichSuCVRepository lichCvDao;
    private final DonHuyRepository dhDao;
    private final DonHangCTRepository ctDao;

    @Transactional(rollbackFor = Exception.class)
    public void huyDon(DonHang found, String lyDo) {
        found.setTrangThai(TrangThai.HUY);
        dao.save(found);

        var dh = new DonHuy();
        dh.setLydo(lyDo);
        dh.setDonHang(found);
        dhDao.save(dh);

        var foundLS = lichDao.findByDonHang_Id(found.getId());
        if (foundLS != null) lichDao.delete(foundLS);

        var listDonCT = ctDao.findByDonHang_Id(found.getId());
        listDonCT.forEach(i -> {
            i.setTrangThai(TrangThai.HUY);
            ctDao.save(i);
        });

        // TODO: also cancel CVs and lich su CV, similar to original
    }

    @Transactional(rollbackFor = Exception.class)
    public void chotDon(DonHang found, BigDecimal kpi, List<DonHangCT> listDon) {
        found.setNgayChotDon(LocalDateTime.now());
        found.setTrangThai(TrangThai.DA_GIAO);
        dao.save(found);

        var ls = new LichSuDonHang();
        ls.setDonHang(found);
        ls.setNhanVien(found.getNhanVien());
        ls.setTrangThai(TrangThai.DA_GIAO);
        lichDao.save(ls);

        var lsCV = new LichSuCV();
        lsCV.setKpi(kpi);
        lsCV.setNgayHoanThanh(new Date());
        lsCV.setNhanVien(found.getNhanVien());
        lsCV.setTrangThai(TrangThai.DA_GIAO);
        lichCvDao.save(lsCV);
    }

    @Transactional
    public void setDonHangStatus(Long id, TrangThai trangThai, Boolean isCT) {
        DonHang found;
        if (isCT) {
            found = dao.findByDonHangCT_Id(id);
            if (found == null) throw new BadReqException("Không tìm thấy đơn hàng");

            var listChuaGiao = ctDao.findByDonHang_Id(found.getId()).stream()
                    .filter(i -> i.getTrangThai() != TrangThai.DA_GIAO)
                    .toList();
            if (!listChuaGiao.isEmpty()) return;
        } else {
            found = dao.findById(id).orElseThrow(() -> new BadReqException("Không tìm thấy đơn hàng"));
        }

        found.setTrangThai(trangThai);
        dao.save(found);
    }
}
