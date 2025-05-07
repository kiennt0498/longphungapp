package com.example.longphungapp.service;

import com.example.longphungapp.Exception.BadReqException;
import com.example.longphungapp.Interface.MapperInterface;
import com.example.longphungapp.dto.EnumDto;

import com.example.longphungapp.dto.LoiNhuanDto;
import com.example.longphungapp.dto.SanPhamDto;
import com.example.longphungapp.entity.*;
import com.example.longphungapp.fileEnum.KieuMau;
import com.example.longphungapp.repository.*;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class SanPhamService {

    @Autowired
    SanPhamRepository dao;

    @Autowired
    DoViTinhRepository DVDao;
    @Autowired
    LoaiSpRepository loaiDao;

    @Autowired
    ChatLieuRepository chatLieuDao;
    @Autowired
    HinhDangRepository hinhDangDao;
    @Autowired
    QuyTrinhRepository qtDao;
    @Autowired
    QuyTrinhService quyTrinhService;


    public List<SanPham> findAll() {
        return dao.findAll();
    }

    public void delete(Long id) {
        var entity = dao.findById(id).orElseThrow(() -> new BadReqException("Không tìm thấy"));
        dao.delete(entity);
    }

    public Map<String, Object> getTruong() {

        var listLoai = loaiDao.findAll();
        var listVL = chatLieuDao.findAll();
        var listHinh = hinhDangDao.findAll();
        var listKieu = Arrays.stream(KieuMau.values()).map(i -> {
            var dto = new EnumDto();
            dto.setName(i.name());
            dto.setDescription(i.getDescription());
            return dto;
        }).toList();


        Map<String, Object> list = new HashMap<>();
        list.put("theLoaiSP", listLoai);
        list.put("chatLieuSP", listVL);
        list.put("hinhDangSP", listHinh);
        list.put("kieuMau", listKieu);


        return list;
    }

    ;


    public List<DoViTinh> getAllDV() {
        return DVDao.findAll();
    }

    @Transactional(rollbackFor = Exception.class)
    public SanPhamDto save(SanPhamDto dto) {
        var entity = MapperInterface.MAPPER.toEntity(dto);

        var listNL = dto.getNguyenVatLieus().stream().map(i -> {
            var nl = new VatTu();
            nl.setId(i.getId());
            return nl;
        }).toList();

        entity.setNguyenVatLieus(listNL);

        System.out.println("list dto");
        listNL.stream().forEach(i -> System.out.println(i.getId()));

        var qtDto = quyTrinhService.saveOrUpdateQuyTrinh(dto.getQuyTrinh());
        var qt = new QuyTrinh();
        qt.setId(qtDto.getId());

        entity.setQuyTrinh(qt);
        var loai = loaiDao.findById(dto.getLoaiSp().getId()).get();
        entity.setLoaiSp(loai);
        var newEntity = dao.save(entity);

        newEntity.getNguyenVatLieus().stream().forEach(i -> System.out.println(i.getId()));
        dto.setId(newEntity.getId());
        return dto;
    }

    @Transactional(rollbackFor = Exception.class)
    public SanPhamDto update(SanPhamDto dto) {
        System.out.println(dto.getLoaiSp().getId());
        var found = dao.findById(dto.getId()).orElseThrow(() -> new BadReqException("Không tìm thấy"));
        var entity = MapperInterface.MAPPER.toEntity(dto);

        var listNL = dto.getNguyenVatLieus().stream().map(i -> {
            var nl = new VatTu();
            BeanUtils.copyProperties(i, nl);
            return nl;
        }).toList();
        entity.setNguyenVatLieus(listNL);

        var qtDto = quyTrinhService.saveOrUpdateQuyTrinh(dto.getQuyTrinh());
        var qt = new QuyTrinh();
        qt.setId(qtDto.getId());


        entity.setQuyTrinh(qt);
        var loai = loaiDao.findById(dto.getLoaiSp().getId()).get();
        entity.setLoaiSp(loai);
        var newEntity = dao.save(entity);
        return dto;
    }

    public List<LoiNhuanDto> getLoiNhuan(Long id) {
        var found = dao.findById(id).orElseThrow(() -> new BadReqException("Không tìm thấy"));
        var list = found.getLoiNhuan().stream().map(i -> {
            var dto = new LoiNhuanDto();
            BeanUtils.copyProperties(i, dto);
            return dto;
        }).toList();
        return list;
    }

}
