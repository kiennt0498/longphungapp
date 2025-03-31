package com.example.longphungapp.service;

import com.example.longphungapp.Exception.BadReqException;
import com.example.longphungapp.dto.NhanVienDto;
import com.example.longphungapp.dto.QuyTrinhDto;
import com.example.longphungapp.entity.CongDoan;
import com.example.longphungapp.entity.NhanVien;
import com.example.longphungapp.entity.QuyTrinh;
import com.example.longphungapp.repository.CongDoanRepository;
import com.example.longphungapp.repository.QuyTrinhRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class QuyTrinhService {
    @Autowired
    QuyTrinhRepository dao;
    @Autowired
    CongDoanRepository CDDao;

    public List<QuyTrinhDto> findAll() {
        var list = dao.findAll();
        var listDto = list.stream().map(i->{
            var dto = new QuyTrinhDto();
            dto.setId(i.getId());
            dto.setTenQuyTrinh(i.getTenQuyTrinh());
            var nv = new NhanVienDto();
            nv.setId(i.getNhanVienQL().getId());
            nv.setHoTen(i.getNhanVienQL().getHoTen());
            dto.setNhanVienQL(nv);
            List<Integer> listId = i.getCongDoans().stream().map(CongDoan::getId).collect(Collectors.toList());
            dto.setCongDoans(listId);
            return dto;
        }).toList();

        return listDto;
    }
    @Transactional(rollbackFor = Exception.class)
    public QuyTrinhDto save(QuyTrinhDto dto){
        var entity = new QuyTrinh();
        entity.setId(dto.getId());
        entity.setTenQuyTrinh(dto.getTenQuyTrinh());
        var nv = new NhanVien();
        nv.setId(dto.getNhanVienQL().getId());
        entity.setNhanVienQL(nv);

        var listId = dto.getCongDoans();
        var listCD = listId.stream().map(i->{
            var cd = new CongDoan();
            cd.setId(i);
            return cd;
        }).collect(Collectors.toSet());
        entity.setCongDoans(listCD);

        var newEntity = dao.save(entity);
        dto.setId(newEntity.getId());
        return dto;
    }
    @Transactional(rollbackFor = Exception.class)
    public QuyTrinhDto update(QuyTrinhDto dto){

        var found = dao.findById(dto.getId()).orElseThrow(()->new BadReqException("Khong tim thay"));



        found.setTenQuyTrinh(dto.getTenQuyTrinh());
        var nv = new NhanVien();
        nv.setId(dto.getNhanVienQL().getId());
        found.setNhanVienQL(nv);

        var listId = dto.getCongDoans();
        var listCD = listId.stream().map(i->{
            var cd = new CongDoan();
            cd.setId(i);
            return cd;
        }).collect(Collectors.toSet());
        found.setCongDoans(listCD);

        var newEntity = dao.save(found);
        return dto;
    }



    public void delete(Long id) {
        var found = dao.findById(id).orElseThrow(()->new BadReqException("Khong tim thay"));
        dao.delete(found);
    }


}
