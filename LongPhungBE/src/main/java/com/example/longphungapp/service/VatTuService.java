package com.example.longphungapp.service;

import com.example.longphungapp.Exception.BadReqException;
import com.example.longphungapp.dto.DonThuMuaDto;
import com.example.longphungapp.dto.EnumDto;
import com.example.longphungapp.dto.GiaThuMuaDto;
import com.example.longphungapp.entity.*;
import com.example.longphungapp.fileEnum.LoaiVatTu;
import com.example.longphungapp.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
@RequiredArgsConstructor
@Service
public class VatTuService {

    private final VatTuRepository dao;

    private final TonKhoRepository tkDao;

    private final DonThuMuaRepository tmDao;

    private final ListGiaThuMuaRepository lgtmDao;

    private final NhanVienRepository nvDao;

    private ThongBaoDonHangService thongBaoDonHangService;


    public List<DonThuMua> findAllTM(Boolean done) {
        return tmDao.findByDone(done);
    }

    public List<VatTu> findAll() {
        return dao.findAll();
    }

    public VatTu save(VatTu entity) {
        return  dao.save(entity);
    }

    public VatTu findById(Long aLong) {
        return dao.findById(aLong).orElseThrow(() -> new BadReqException("Không tìm thấy nguyên liệu"));
    }

    public void delete(VatTu entity) {
        dao.delete(entity);
    }

    public List<ListGiaThuMua> findByDonThuMua_Id(Long id) {
        return lgtmDao.findByDonThuMua_Id(id);
    }

    public DonThuMua findDonThuMuaById(Long id) {
        var entity = tmDao.findById(id).orElseThrow(() -> new BadReqException("Không tìm thấy đơn thu mua"));
        return entity;
    }

    @Transactional(rollbackFor = Exception.class)
    public void saveAndUpdateDonThuMua(DonThuMuaDto dto) {
        if (dto.getId() != null) {
            var found = tmDao.findById(dto.getId()).orElseThrow(() -> new BadReqException("Không tìm thấy đơn thu mua"));
            BeanUtils.copyProperties(dto, found);
            var cl = new ChatLieu();
            cl.setId(dto.getChatLieu().getId());
            var dv = new DoViTinh();
            dv.setId(dto.getDoViTinh().getId());
            found.setChatLieu(cl);
            found.setDoViTinh(dv);
            tmDao.save(found);
            var vatTu = new VatTu();
            vatTu.setDoViTinh(dv);
            vatTu.setChatLieu(cl);
            vatTu.setGiaNhap(dto.getGiaThuMua());
            vatTu.setTen(dto.getTenNguyenLieu());
            vatTu.setHeSoThuMua(0D);
            vatTu.setHeSoBu(0D);
            vatTu.setLoaiVatTu(LoaiVatTu.valueOf(dto.getLoai()));
            save(vatTu);
            var tonKho = new TonKho();
            var kho = new Kho();
            kho.setMaKho(1L);
            BigDecimal total = BigDecimal.valueOf(dto.getSoLuong()).multiply(dto.getGiaThuMua());
            tonKho.setVatTu(vatTu);
            tonKho.setSoLuong(dto.getSoLuong());
            tonKho.setGiaTriTonKho(total);
            tonKho.setKho(kho);
            tkDao.save(tonKho);
            return;
        }
        var entity = new DonThuMua();
        BeanUtils.copyProperties(dto, entity);
        var cl = new ChatLieu();
        cl.setId(dto.getChatLieu().getId());
        var dv = new DoViTinh();
        dv.setId(dto.getDoViTinh().getId());
        entity.setChatLieu(cl);
        entity.setDoViTinh(dv);
        NhanVien nv =  new NhanVien();
        nv.setId(dto.getNguoiLenDon().getId());
        entity.setNguoiLenDon(nv);
        tmDao.save(entity);
    }

    public void huyDon(Long id) {
        var entity = tmDao.findById(id).orElseThrow(() -> new BadReqException("Không tìm thấy đơn thu mua"));
        tmDao.delete(entity);
    }

    public void setGiaThuMua(GiaThuMuaDto dto){
        if(dto.getId() != null){
            var found = lgtmDao.findById(dto.getId()).orElseThrow(() -> new BadReqException("Không tìm thấy giá thu mua"));
            BeanUtils.copyProperties(dto, found);
            lgtmDao.save(found);
            return;
        }

        var found = tmDao.findById(dto.getDonThuMua()).orElseThrow(() -> new BadReqException("Không tìm thấy đơn thu mua"));
        var gia = new ListGiaThuMua();
        gia.setDonGia(dto.getDonGia());
        gia.setPhiVC(dto.getPhiVC());
        gia.setDonThuMua(found);
        var nv = nvDao.findById(dto.getMaNV()).orElseThrow(() -> new BadReqException("Không tìm thấy nhân viên"));
        gia.setNhanVien(nv);
        BigDecimal tong = gia.getDonGia().multiply(BigDecimal.valueOf(found.getSoLuong())).add(gia.getPhiVC());
        gia.setTong(tong);
        lgtmDao.save(gia);
    }



    public void AutoChotGia(){
        var now = new Date();
        var listCanChot = tmDao.findDonThuMuaHetHanChuaChot();

        for(DonThuMua don : listCanChot){
           var giaThapNhat = lgtmDao.findGiaThapNhat(don.getId());
           if(giaThapNhat == null){
               throw new BadReqException("Không có người báo giá");
           }
           don.setGiaThuMua(giaThapNhat.getDonGia());
           don.setPhiVanChuyen(giaThapNhat.getPhiVC());
           don.setDone(true);
           tmDao.save(don);
        }

//        var tonKho = tkDao.findByVatTu_Id();

        thongBaoDonHangService.guiThongBaoCapNhatDonHang(false, findAllTM(false));
        thongBaoDonHangService.guiThongBaoCapNhatDonHang(true, findAllTM(true));
    }

    public List<EnumDto> getListLoai(){
        return LoaiVatTu.cache;
    }
}
