package com.example.longphungapp.service;

import com.example.longphungapp.Exception.BadReqException;
import com.example.longphungapp.dto.CongDoanDto;
import com.example.longphungapp.dto.NhanVienDto;
import com.example.longphungapp.entity.CongDoan;
import com.example.longphungapp.repository.CongDoanRepository;
import com.example.longphungapp.repository.NhanVienRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class CongDoanService {
    @Autowired
    CongDoanRepository dao;
    @Autowired
    NhanVienRepository nhanVienRepository;

    public List<CongDoanDto> findAll() {
        var listEntity = dao.findAll();
        List<CongDoanDto> listDto = new ArrayList<>();
        for (CongDoan entity : listEntity) {
            var dto = new CongDoanDto();
            var nv = new NhanVienDto();
            dto.setId(entity.getId());
            dto.setTenCongDoan(entity.getTenCongDoan());
            listDto.add(dto);
        }
        return listDto;
    }
    @Transactional(rollbackFor = Exception.class)
    public CongDoanDto save(CongDoanDto dto) {
        var entity = new CongDoan();
        entity.setTenCongDoan(dto.getTenCongDoan());


        var newEntity = dao.save(entity);
        dto.setId(newEntity.getId());

        return dto;
    }
    @Transactional(rollbackFor = Exception.class)
    public CongDoanDto update(CongDoanDto dto) {
        var found = dao.findById(dto.getId()).orElseThrow(()-> new BadReqException("Không tìm thấy id"));
        found.setTenCongDoan(dto.getTenCongDoan());

         dao.save(found);

         return dto;
    }

    public void delete(Integer id) {
        var entity = dao.findById(id).orElseThrow(()-> new BadReqException("Không tìm thấy id"));
        dao.delete(entity);
    }
}
