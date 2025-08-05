package com.example.longphungapp.service;

import com.example.longphungapp.Exception.BadReqException;
import com.example.longphungapp.Interface.MapperInterface;
import com.example.longphungapp.dto.KhachHangDto;
import com.example.longphungapp.dto.NhanVienDto;
import com.example.longphungapp.entity.KhachHang;
import com.example.longphungapp.entity.NhanVien;
import com.example.longphungapp.repository.KhachHangRepository;
import com.example.longphungapp.repository.NhanVienRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;


@Service
public class KhachHangService {


    @Autowired
    KhachHangRepository dao;
    @Autowired
    NhanVienRepository nvDao;

    public List<KhachHang> findAll() {
        return dao.findAll();
    }

    @Transactional(rollbackFor = Exception.class)
    public KhachHangDto create(KhachHangDto dto) {
        System.out.println(dto.getTenKhachHang());
        System.out.println(dto.getSdt());
        var found  = dao.findBySdt(dto.getSdt());
        if(found != null){
            throw new BadReqException("Khách hàng đã tồn tại");
        }
        KhachHang entity = new KhachHang();
        BeanUtils.copyProperties(dto, entity);


        String ma = "KH";
        Long stt = dao.countByIdLike(ma+"%");
        String maKH = ma+stt;

        entity.setId(maKH);

        var newEntity = dao.save(entity);

        dto.setId(newEntity.getId());


        return dto;
    }
    @Transactional(rollbackFor = Exception.class)
    public KhachHangDto update(KhachHangDto dto) {
        var found  = dao.findById(dto.getId()).orElseThrow(()-> new BadReqException("Không tìm thấy khách hàng"));


        BeanUtils.copyProperties(dto, found,"nhanViens");


        var newEntity = dao.save(found);



        return dto;
    }


    @Transactional(rollbackFor = Exception.class)
    public void delete(String id) {
        var found = dao.findById(id).orElseThrow(()-> new BadReqException("Không tìm thấy khách hàng"));
        dao.delete(found);
    }

    public List<KhachHang> findByTenKhachHangContains(String tenKhachHang) {
        return dao.findByTenKhachHangContains(tenKhachHang);
    }

    public List<KhachHang> findBySdtContains(String sdt) {
        return dao.findBySdtContains(sdt);
    }

    @Query("SELECT k FROM KhachHang k WHERE CAST(k.id AS string) LIKE %:id%")
    public List<KhachHang> findByIdLike(String id) {
        return dao.findByIdLike(id);
    }

    @Transactional(rollbackFor = Exception.class)
    public List<KhachHangDto> saveAll(List<KhachHangDto> list) {

        Set<String> existingPhones = new HashSet<>(dao.findAllSdt());

        List<KhachHangDto> newList = list.stream().filter(
                (i)->!existingPhones.contains(i.getSdt())).toList();

        return newList.stream().map(this::create).collect(Collectors.toList());
    }

    public KhachHang findBySdt(String sdt) {
        return dao.findBySdt(sdt);
    }
}
