package com.example.longphungapp.service;

import com.example.longphungapp.Exception.BadReqException;
import com.example.longphungapp.Interface.MapperInterface;
import com.example.longphungapp.dto.*;
import com.example.longphungapp.entity.*;
import com.example.longphungapp.fileEnum.TacVu;
import com.example.longphungapp.fileEnum.TrangThai;
import com.example.longphungapp.repository.*;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Optional;


@Slf4j
@Service
@RequiredArgsConstructor
public class DonHangService {
    private final DonHangRepository dao;
    private final DonHangCTRepository ctDao;
    private final CongViecCTRepository cvDao;
    private final KhachHangService khDao;
    private final LichSuDonHangRepository lichDao;
    private final DonHuyRepository dhDao;
    private final NhanVienRepository nvDao;
    private final LichSuCVRepository lichCvDao;
    private final ImagesRepository imagesRepository;
    private final ImageService imageService;
    private final EntityManager entityManager;
    private final PhanPhoiDonHangRepository phanPhoiDao;

    private final DonHangCTService donHangCTService;
    private final PhanPhoiService phanPhoiService;
    private final DonHangWorkflowService workflowService;

    private final Double kpiThietKe = 0.06;
    private final BigDecimal kpiKinhDoanh = BigDecimal.valueOf(0.2);

    public List<DonHangDto> findAll() {
        var list = dao.findAll();
        return list.stream().map(i -> {
            var dto = new DonHangDto();
            BeanUtils.copyProperties(i, dto);
            var kh = new KhachHangDto();
            if (i.getKhachHang() != null) BeanUtils.copyProperties(i.getKhachHang(), kh);
            dto.setKhachHang(kh);
            return dto;
        }).toList();
    }



    @Transactional(rollbackFor = Exception.class)
    public void createDonAo(donAoDto dto) {
        // create or reuse customer
        var khFound = khDao.findBySdt(dto.getSdt());
        KhachHang kh = new KhachHang();
        if (khFound == null) {
            var khDto = new KhachHangDto();
            khDto.setSdt(dto.getSdt());
            khDto.setTenKhachHang(dto.getTenKhachHang());
            var newKH = khDao.create(khDto);
            BeanUtils.copyProperties(newKH, kh);
        } else {
            BeanUtils.copyProperties(khFound, kh);
        }

        var nv = nvDao.findById(dto.getMaNhanVien())
                .orElseThrow(() -> new BadReqException("Không tìm thấy nhân viên với ID: " + dto.getMaNhanVien()));

        var donHang = new DonHang();
        var countD = dao.count();
        String maDH = String.valueOf(countD) + "." + kh.getId() + "." + dto.getMaNhanVien() + "." + kh.getSdt();

        donHang.setNhanVien(nv);
        donHang.setKhachHang(kh);
        donHang.setGia(dto.getGia());
        donHang.setMaDonHang(maDH);
        donHang.setTrangThai(TrangThai.CHO_THIET_KE);
        dao.save(donHang);

        // delegate creation of DonHangCT and images
        donHangCTService.createDonHangCTsFromDto(dto.getSanPhams(), donHang);
    }

    public List<DonHangCTDto> getCT(Long id) {
        return donHangCTService.getCTByDonId(id);
    }

    @Transactional(rollbackFor = Exception.class)
    public List<DonHangCT> saveListDon(TaoDonDTO dto) {
        var nv = nvDao.findById(dto.getDon().getNhanVien().getId())
                .orElseThrow(() -> new BadReqException("Không tìm thấy nhân viên"));

        var donHang = new DonHang();
        donHang.setNhanVien(nv);
        donHang.setGia(dto.getDon().getGia());
        donHang.setMaDonHang(dto.getDon().getMaDonHang());
        donHang.setTrangThai(TrangThai.CHO_GUI_PHIEU);
        dao.save(donHang);

        var listDonCT = donHangCTService.createDonHangCTs(dto.getDonCT(), donHang);

        return listDonCT;
    }

    public void deleteDonHang(DonHang entity) {
        dao.delete(entity);
    }

    public List<DonHangCTDto> findByDonHang_MaDonHang(String maDonHang) {
        var listEntity = ctDao.findByDonHang_MaDonHang(maDonHang);
        return listEntity.stream().map(MapperInterface.MAPPER::toDto).toList();
    }

    public List<DonHang> findByNhanVien_IdAndTrangThai(String id, TrangThai trangThai) {
        return dao.findByNhanVien_IdAndTrangThai(id, trangThai);
    }

    public List<DonHangCT> findByDonHang_NhanVien_IdAndTrangThai(String id, TrangThai trangThai) {
        return ctDao.findByDonHang_NhanVien_IdAndTrangThai(id, trangThai);
    }

    public List<DonHang> findDonHoanThanh(String id) {
        var listLS = lichDao.findByNhanVien_Id(id);
        return listLS.stream().map(i -> i.getDonHang()).toList();
    }

    @Transactional(rollbackFor = Exception.class)
    public void huyDon(DonHuyDto dto) {
        var found = dao.findById(dto.getId()).orElseThrow(() -> new BadReqException("Không tìm thấy đơn hàng"));
        workflowService.huyDon(found, dto.getLyDo());
    }

    @Transactional(rollbackFor = Exception.class)
    public void chotDon(String maDonHang) {
        var found = dao.findByMaDonHang(maDonHang);
        if (found == null) throw new BadReqException("Không tìm thấy đơn hàng");
        workflowService.chotDon(found, kpiKinhDoanh(), ctDao.findByDonHang_MaDonHang(maDonHang));
    }

    @Transactional
    public void setImage(Long id, Long imageId) {
        donHangCTService.setImageForCv(id, imageId);
    }

    @Transactional
    public void setDonHang(Long id, TrangThai trangThai, Boolean isCT) {
        // Delegate workflow responsibility
        workflowService.setDonHangStatus(id, trangThai, isCT);
    }

    @Transactional
    public void nhanDon(Long donHangId, String maNV) {
        var nhanVien = nvDao.findById(maNV)
                .orElseThrow(() -> new BadReqException("Không tìm thấy nhân viên"));
        var don = dao.findById(donHangId)
                .orElseThrow(() -> new BadReqException("Không tìm thấy đơn hàng"));

        phanPhoiService.nhanDon(don, nhanVien);
    }

    public List<DonHang> getDonXuongNhan(Integer id) {
        return dao.findBy_Xuong(id);
    }



    public List<DonHang> getDonKhuNhan(Integer xuong, Integer khu) {
        if (khu == null) return List.of();
        return dao.findBy_XuongAndKhu(xuong, khu);
    }

    public Integer getXuong(String maNV) {
        var nhanVien = nvDao.findById(maNV).orElseThrow(() -> new BadReqException("Không tìm thấy nhân viên"));
        return nhanVien.getXuong().getId();
    }

    public Integer getKhu(String maNV) {
        var nhanVien = nvDao.findById(maNV).orElseThrow(() -> new BadReqException("Không tìm thấy nhân viên"));
        var khuNV = nhanVien.getKhu();
        return (khuNV == null) ? null : khuNV.getId();
    }

    public List<DonHangCT> getListDonChia(String maNV) {
        var nhanVien = nvDao.findById(maNV).orElseThrow(() -> new BadReqException("Không tìm thấy nhân viên"));
        var xuong = nhanVien.getXuong().getId();
        var khu = nhanVien.getKhu();
        if (khu == null) return List.of();
        return ctDao.findDonHangCTCanChiaByKhuXuong(khu.getId(), xuong);
    }

    public List<DonHang> getDonXuongHT(Integer xuongId) {
        return dao.findDonHTByXuong_Id(xuongId);
    }

    public String getLyDoHuy(Long id) {
        var dh = dhDao.findByDonHang_Id(id);
        return (dh == null) ? null : dh.getLydo();
    }

    public List<DonHang> findByTrangThai(TrangThai trangThai) {
        return dao.findByTrangThai(trangThai);
    }

    @Transactional
    public void chiaDon(Long id, Integer soPhan) {
        donHangCTService.chiaDon(id, soPhan);
    }

    public List<PhanPhoiDonHang> getDonDaPP(Integer xuongId) {
        var list = phanPhoiDao.findByXuong_IdAndKhu_IdNotNull(xuongId);
        return list;
    }

    public void HoanDonKhu(Long id) {
        var found = phanPhoiDao.findByDonHang_Id(id);
        if (found == null) return;
        found.setKhu(null);
        var donHang = found.getDonHang();
        donHang.setTrangThai(TrangThai.CHO_SAN_XUAT);
        dao.save(donHang);
        phanPhoiDao.save(found);
    }

    public void HoanDonXuong(Long id) {
        var found = phanPhoiDao.findByDonHang_Id(id);
        if (found == null) return;
        found.setXuong(null);
        found.setKhu(null);
        var donHang = found.getDonHang();
        donHang.setTrangThai(TrangThai.CHO_NHAN_DON);
        dao.save(donHang);
        phanPhoiDao.save(found);
    }

    public TaoDonDTO getDonPhieu(String id){
        var don = dao.findByMaDonHang(id);
        var listDon = ctDao.findByDonHang_MaDonHang(id);
        var donDto = MapperInterface.MAPPER.toDto(don);
        var listDto = listDon.stream().map(MapperInterface.MAPPER::toDto).toList();
        return new TaoDonDTO(donDto,listDto);
    }

    // helper for KPI calculation
    private BigDecimal kpiKinhDoanh() {
        return kpiKinhDoanh;
    }

}






