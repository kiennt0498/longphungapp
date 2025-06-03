package com.example.longphungapp.service;

import com.example.longphungapp.Exception.BadReqException;
import com.example.longphungapp.Interface.MapperInterface;
import com.example.longphungapp.dto.*;
import com.example.longphungapp.entity.*;
import com.example.longphungapp.fileEnum.TacVu;
import com.example.longphungapp.fileEnum.TrangThai;
import com.example.longphungapp.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DonHangService {



    @Autowired
    DonHangRepository dao;
    @Autowired
    DonHangCTRepository ctDao;
    @Autowired
    CongViecCTRepository cvDao;
    @Autowired
    KhachHangService khDao;
    @Autowired
    LichSuDonHangRepository lichDao;
    @Autowired
    DonHuyRepository dhDao;
    @Autowired
    NhanVienRepository nvDao;

    private final LichSuCVRepository lichCvDao;

    private Double kpiThietKe = 0.06;
    private BigDecimal kpiKinhDoanh = BigDecimal.valueOf(0.2);


    public List<DonHangDto> findAll() {
        var list = dao.findAll();
        if(list.isEmpty()){
             List<DonHangDto> listDto = new ArrayList<>();
             return listDto;
        }
        var listDto = list.stream().map(i->{
            var dto = new DonHangDto();
            BeanUtils.copyProperties(i, dto);
            var kh = new KhachHangDto();
            BeanUtils.copyProperties(i.getKhachHang(), kh);
            dto.setKhachHang(kh);
            return dto;
        }).toList();
        return listDto;
    }

    public List<DonHangCTDto> getCT(Long id){
        var list = ctDao.findByDonHang_Id(id);
        if(list.isEmpty()){
            throw new BadReqException("Chưa có chi tiết đơn hàng");
        }
        var listDto = list.stream().map(i->{
            var dto = new DonHangCTDto();
            BeanUtils.copyProperties(i, dto);
            var sp = new SanPhamDto();
            BeanUtils.copyProperties(i.getSanPham(), sp);
            dto.setSanPham(sp);
            return dto;
        }).toList();
        return listDto;
    }
    @Transactional(rollbackFor = Exception.class)
    public List<DonHangCT> save(TaoDonDTO dto) {
        var kh = new KhachHang();
        if(dto.getDon().getKhachHang().getId() == null){
           var newDTO = khDao.create(dto.getDon().getKhachHang());
           BeanUtils.copyProperties(newDTO, kh);
        }else{
            var found = khDao.findByIdLike(dto.getDon().getKhachHang().getId());
            if(found.isEmpty()){
                throw new BadReqException("Không tìm thấy khách hàng");
            }
            BeanUtils.copyProperties(found.get(0), kh);
        }
        var nv = nvDao.findById(dto.getDon().getNhanVien().getId()).get();
        var donHang = new DonHang();
        var countD = dao.count();
        String maNV = dto.getDon().getNhanVien().getId();
        System.out.println(maNV);
        String maDH = String.valueOf(countD)+"."+kh.getId()+"."+maNV+"."+kh.getSdt();

        donHang.setNhanVien(nv);
        donHang.setKhachHang(kh);
        donHang.setGia(dto.getDon().getGia());
        donHang.setMaDonHang(maDH);
        donHang.setTrangThai(TrangThai.CHO_THIET_KE);
        dao.save(donHang);



        var listDonCT = dto.getDonCT().stream().map(i->{
            var donCT = new DonHangCT();
            BeanUtils.copyProperties(i, donCT);
            var sp = new SanPham();
            sp.setId(i.getSanPham().getId());
            sp.setTenSP(i.getSanPham().getTenSP());
            donCT.setSanPham(sp);
            donCT.setDonHang(donHang);
            donCT.setSoLuong(i.getSoLuong());
            donCT.setDonGia(i.getDonGia());
            donCT.setGiaGoc(i.getGiaGoc());
            donCT.setTrangThai(TrangThai.CHO_NHAN_DON);
            ctDao.save(donCT);
            return donCT;
        }).toList();

        var listCV = listDonCT.stream().map(i->{
            var cv = new CongViecCT();
            var kpi = (i.getDonGia()
                    .subtract(i.getGiaGoc())
                    .multiply(BigDecimal.valueOf(i.getSoLuong()))
                    .multiply(BigDecimal.valueOf(kpiThietKe)));
            cv.setDonHangCT(i);
            cv.setKpi(kpi);
            cv.setTrangThai(TrangThai.CHO_NHAN_DON);
            cv.setTacVu(TacVu.THIET_KE);
            cvDao.save(cv);
            return cv;
        }).toList();

        return listDonCT;
    }

    public void delete(DonHang entity) {
        dao.delete(entity);
    }

    public List<DonHangCTDto> findByDonHang_MaDonHang(String maDonHang) {
        var listEntity = ctDao.findByDonHang_MaDonHang(maDonHang);
        var listDto = listEntity.stream().map(i->{
            var dto = MapperInterface.MAPPER.toDto(i);
            return dto;
        }).toList();
        return listDto;
    }

    public List<DonHang> findByNhanVien_IdAndTrangThai(String id, TrangThai trangThai) {
        return dao.findByNhanVien_IdAndTrangThai(id, trangThai);
    }

    public List<DonHang> findDonHoanThanh(String id){
        var listLS = lichDao.findByNhanVien_Id(id);
        var list = listLS.stream().map(i->i.getDonHang()).toList();
        return list;
    }
    @Transactional(rollbackFor = Exception.class)
    public void huyDon(DonHuyDto dto){
        var found = dao.findById(dto.getId()).orElseThrow(()-> new BadReqException("Không tìm thấy đơn hàng"));
        found.setTrangThai(TrangThai.HUY);
        dao.save(found);

        var dh = new DonHuy();
        dh.setLydo(dto.getLyDo());
        dh.setDonHang(found);
        dhDao.save(dh);

        var foundLS = lichDao.findByDonHang_Id(found.getId());
        if(foundLS != null){
            lichDao.delete(foundLS);
        }

        var listDonCT = ctDao.findByDonHang_Id(found.getId());
        listDonCT.forEach(i->{
            i.setTrangThai(TrangThai.HUY);
            ctDao.save(i);
        });
        var listCV = cvDao.findByDonHangCT_DonHang_Id(found.getId());
        listCV.forEach(i->{

            i.setTrangThai(TrangThai.HUY);
            cvDao.save(i);
        });
    }
    @Transactional(rollbackFor = Exception.class)
    public void chotDon(String maDonHang) {
        var found = dao.findByMaDonHang(maDonHang);
        if(found == null){
            throw new BadReqException("Không tìm thấy đơn hàng");
        }
        found.setNgayChotDon(new Date());
        found.setTrangThai(TrangThai.DA_GIAO);
        dao.save(found);

        var ls = new LichSuDonHang();
        ls.setDonHang(found);
        ls.setNhanVien(found.getNhanVien());
        ls.setTrangThai(TrangThai.DA_GIAO);
        lichDao.save(ls);

        var lsCV = new LichSuCV();
        var listDon = ctDao.findByDonHang_MaDonHang(maDonHang);
        var tongLoiNhuan = listDon.stream().map(i->i.getDonGia()
                .subtract(i.getGiaGoc()).multiply(BigDecimal.valueOf(i.getSoLuong())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        var kpi = tongLoiNhuan.multiply(kpiKinhDoanh);
        lsCV.setKpi(kpi);
        lsCV.setNgayHoanThanh(new Date());
        lsCV.setNhanVien(found.getNhanVien());
        lsCV.setTrangThai(TrangThai.DA_GIAO);
        lichCvDao.save(lsCV);
    }

    public void setImage(Long id,ImagesDto dto){
        var found = cvDao.findById(id).orElseThrow(()-> new BadReqException("không tìm thấy"));
        DonHangCT ct = found.getDonHangCT();
        var image = new Images();
        image.setId(dto.getId());
        ct.setImages(image);
        ctDao.save(ct);
    }
    public void deleteImg(String name){
        var found = ctDao.findByImages_TenTep(name);
        found.setImages(null);
        ctDao.save(found);
    }

    public String getLyDoHuy(Long id){
        return dhDao.findByDonHang_Id(id).getLydo();
    }

    public List<DonHang> findByTrangThai(TrangThai trangThai) {
        return dao.findByTrangThai(trangThai);
    }
}
