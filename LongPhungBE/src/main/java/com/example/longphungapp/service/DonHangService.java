package com.example.longphungapp.service;

import com.example.longphungapp.Exception.BadReqException;
import com.example.longphungapp.Interface.MapperInterface;
import com.example.longphungapp.dto.*;
import com.example.longphungapp.entity.*;
import com.example.longphungapp.fileEnum.TacVu;
import com.example.longphungapp.fileEnum.TrangThai;
import com.example.longphungapp.repository.*;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
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
            System.out.println("dung");
        }else{
            System.out.println("sai");
            var found = khDao.findByIdLike(dto.getDon().getKhachHang().getId());
            if(found.isEmpty()){
                throw new BadReqException("Không tìm thấy khách hàng");
            }
            BeanUtils.copyProperties(found.get(0), kh);
        }
        var nv = nvDao.findById(dto.getDon().getNhanVien().getId()).get();
        var donHang = new DonHang();
        var countD = dao.count();
        String maDH = String.valueOf(countD)+"."+kh.getId()+"."+"NV00001"+"."+kh.getSdt();

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
            donCT.setTrangThai(TrangThai.CHO_NHAN_DON);
            ctDao.save(donCT);
            return donCT;
        }).toList();

        var listCV = listDonCT.stream().map(i->{
            var cv = new CongViecCT();
            cv.setDonHangCT(i);
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
        found.setTrangThai(TrangThai.DANG_SAN_XUAT);
        dao.save(found);
        var ls = new LichSuDonHang();
        ls.setDonHang(found);
        ls.setNhanVien(found.getNhanVien());
        ls.setTrangThai(TrangThai.DA_GIAO);
        lichDao.save(ls);

        var listDonCT = ctDao.findByDonHang_Id(found.getId());
        listDonCT.forEach(i->{
            i.setTrangThai(TrangThai.DANG_SAN_XUAT);
            ctDao.save(i);
        });

        listDonCT.forEach(i->{
            var cdOpt = i.getSanPham()
                    .getQuyTrinh()
                    .getQuyTrinhCongDoans()
                    .stream()
                    .filter(j -> j.getThuTu() != null && j.getThuTu() == 1)
                    .findFirst();

            if (cdOpt.isEmpty()) {
                System.out.println("❌ Không tìm thấy công đoạn thứ tự 1 cho sản phẩm: " + i.getSanPham().getTenSP());
                i.getSanPham().getQuyTrinh().getQuyTrinhCongDoans().forEach(cd ->
                        System.out.println("----> ThuTu: " + cd.getThuTu())
                );
                throw new BadReqException("Không có công đoạn bắt đầu cho sản phẩm");
            }
            var cv = new CongViecCT();
            cv.setDonHangCT(i);
            cv.setCongDoan(cdOpt.get().getCongDoan());
            cv.setTrangThai(TrangThai.CHO_NHAN_DON);
            cv.setTacVu(cdOpt.get().getCongDoan().getTacVu());
            cvDao.save(cv);
        });
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
}
