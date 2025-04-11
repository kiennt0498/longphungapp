package com.example.longphungapp.service;

import com.example.longphungapp.entity.CongViecCT;
import com.example.longphungapp.entity.LichSuCV;
import com.example.longphungapp.entity.NhanVien;
import com.example.longphungapp.fileEnum.TrangThai;
import com.example.longphungapp.repository.CongViecCTRepository;
import com.example.longphungapp.repository.DonHangCTRepository;
import com.example.longphungapp.repository.DonHangRepository;
import com.example.longphungapp.repository.LichSuCVRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CongViecService {
    @Autowired
    private  CongViecCTRepository dao;
    @Autowired
    private DonHangRepository donDao;
    @Autowired
    private DonHangCTRepository ctDao;
    @Autowired
    private LichSuCVRepository lichSuCVDao;

    public List<CongViecCT> findAll() {
        return dao.findAll();
    }

    public List<CongViecCT> findByTrangThai(TrangThai trangThai) {
        var list = dao.findByTrangThai(trangThai);
        var newList = list.stream().map(i->{
            i.getDonHangCT().getSanPham().getQuyTrinh().setCongDoans(null);
            i.getDonHangCT().getSanPham().setNguyenVatLieus(null);

            return i;
        }).toList();
        return newList;
    }

    public List<CongViecCT> findByNhanVien_IdAndTrangThai(String id, TrangThai trangThai) {
        var list = dao.findByNhanVien_IdLikeAndTrangThai(id, trangThai);
        var newList = list.stream().map(i->{
            i.getDonHangCT().getSanPham().getQuyTrinh().setCongDoans(null);
            i.getDonHangCT().getSanPham().setNguyenVatLieus(null);

            return i;
        }).toList();
        return newList;
    }

    public List<CongViecCT> findCongViecHoanThanh(String id) {
        var listLS = lichSuCVDao.findByNhanVien_Id(id);
        var list = listLS.stream().map(i->i.getCongViecCT()).toList();
        var newList = list.stream().map(i->{
            i.getDonHangCT().getSanPham().getQuyTrinh().setCongDoans(null);
            i.getDonHangCT().getSanPham().setNguyenVatLieus(null);

            return i;
        }).toList();
        return newList;
    }

    public String getNhanVienTK(Long id){
        var entity = dao.findById(id).get();
        return entity.getNhanVien().getId();
    }
    @Transactional(rollbackFor = Exception.class)
    public void  setViec(Long id, TrangThai trangThai) {
        var entity = dao.findById(id).get();
        entity.setTrangThai(trangThai);
        NhanVien nnv = new NhanVien();
        nnv.setId("NV00001");
        entity.setNhanVien(nnv);
        dao.save(entity);
        if(trangThai == TrangThai.DA_GIAO){
            var ls = new LichSuCV();
            ls.setCongViecCT(entity);
            ls.setNhanVien(nnv);
            ls.setTrangThai(trangThai);
            lichSuCVDao.save(ls);

        }
    }
    @Transactional(rollbackFor = Exception.class)
    public void setDonHangCT(Long id){
        int count = 0;
        var donHangCT = dao.findById(id).get().getDonHangCT();
        donHangCT.setTrangThai(TrangThai.DA_GIAO);
        ctDao.save(donHangCT);
        var listDonCT = ctDao.findByDonHang_MaDonHang(donHangCT.getDonHang().getMaDonHang());
        var listTest =listDonCT.stream().filter(i-> i.getTrangThai() != TrangThai.DA_GIAO).toList();
        if(listTest.size() ==0){
            var found =  donDao.findByMaDonHang(donHangCT.getDonHang().getMaDonHang());
            found.setTrangThai(TrangThai.CHO_DUYET);
            donDao.save(found);
        }
    }
}
