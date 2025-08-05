package com.example.longphungapp.service;

import com.example.longphungapp.Exception.BadReqException;
import com.example.longphungapp.Interface.MapperInterface;
import com.example.longphungapp.dto.CongDoanDto;
import com.example.longphungapp.dto.NhanVienDto;
import com.example.longphungapp.entity.CongDoan;
import com.example.longphungapp.repository.CongDoanRepository;
import com.example.longphungapp.repository.NhanVienRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class CongDoanService {



    @Autowired
    CongDoanRepository dao;
    @Autowired
    NhanVienRepository nhanVienRepository;

    public List<CongDoan> findAll() {
        return dao.findAll();
    }

    @Transactional(rollbackFor = Exception.class)
    public CongDoanDto saveCongDoan(CongDoanDto dto) {

        var entity = MapperInterface.MAPPER.toEntity(dto);
        entity.setCongNV(entity.getKpiGoc().multiply(BigDecimal.valueOf(entity.getDieuChinh()/100)));
        var giaThuMua = entity.getCongNV().add(entity.getKhauHaoMay());
        entity.setGiaMuaNguyenLieu(giaThuMua);
        dao.save(entity);
        dto.setId(entity.getId());

        return dto;
    }
    @Transactional(rollbackFor = Exception.class)
    public CongDoanDto update(CongDoanDto dto) {
        var found = dao.findById(dto.getId()).orElseThrow(()-> new BadReqException("Không tìm thấy id"));
        var giaThuMua = found.getCongNV().add(found.getKhauHaoMay());
        BeanUtils.copyProperties(dto, found);
        found.setGiaMuaNguyenLieu(giaThuMua);
         dao.save(found);

         return dto;
    }

    public void delete(Integer id) {
        var entity = dao.findById(id).orElseThrow(()-> new BadReqException("Không tìm thấy id"));
        dao.delete(entity);
    }

    @Transactional(rollbackFor = Exception.class)
    public void updateCong(Double cong) {
        var list = dao.findAll();
        if(!list.isEmpty()){
           var newList =  list.stream().map(i -> {
                i.setDieuChinh(cong);
                var congNV = i.getKpiGoc().multiply(BigDecimal.valueOf(cong/100));
                i.setCongNV(congNV);
                var giaNL = congNV.add(i.getKhauHaoMay());
                i.setGiaMuaNguyenLieu(giaNL);
                return i;
            }).toList();
            dao.saveAll(newList);
        }
    }
}
