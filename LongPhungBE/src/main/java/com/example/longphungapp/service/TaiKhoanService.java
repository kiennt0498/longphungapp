package com.example.longphungapp.service;

import com.example.longphungapp.Interface.MapperInterface;
import com.example.longphungapp.dto.TaiKhoanDto;
import com.example.longphungapp.entity.TaiKhoan;
import com.example.longphungapp.repository.TaiKhoanRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class TaiKhoanService {

    @Autowired
    TaiKhoanRepository dao;

    public List<TaiKhoan> findAll() {
        return dao.findAll();
    }
    @Transactional(rollbackFor = Exception.class)
    public TaiKhoanDto save(TaiKhoanDto dto) {


        ModelMapper mapper = new ModelMapper();

        TaiKhoan entity = mapper.map(dto, TaiKhoan.class);

        var newEntity = dao.save(entity);

        var newDto = MapperInterface.MAPPER.toDto(newEntity);
        return newDto;
    }

    public TaiKhoanDto findById(String s) {
        var found = dao.findById(s).orElseThrow(()-> new RuntimeException("Không tìm thấy"));

        var dto = MapperInterface.MAPPER.toDto(found);

        return dto;
    }

    @Transactional(rollbackFor = Exception.class)
    public TaiKhoanDto update(TaiKhoanDto dto){
        var found = dao.findById(dto.getSdt()).orElseThrow(()-> new RuntimeException("khong tim thay"));
        BeanUtils.copyProperties(dto,found);
        dao.save(found);
        return dto;
    }
}
