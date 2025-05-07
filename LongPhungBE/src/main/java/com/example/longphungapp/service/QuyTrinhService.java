package com.example.longphungapp.service;

import com.example.longphungapp.Exception.BadReqException;
import com.example.longphungapp.Interface.MapperInterface;
import com.example.longphungapp.dto.CongDoanDto;
import com.example.longphungapp.dto.NhanVienDto;
import com.example.longphungapp.dto.QuyTrinhDto;
import com.example.longphungapp.entity.CongDoan;
import com.example.longphungapp.entity.NhanVien;
import com.example.longphungapp.entity.QuyTrinh;
import com.example.longphungapp.entity.QuyTrinhCongDoan;
import com.example.longphungapp.repository.CongDoanRepository;
import com.example.longphungapp.repository.QuyTrinhRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class QuyTrinhService {

    @Autowired
    QuyTrinhRepository dao;
    @Autowired
    CongDoanRepository CDDao;

    public List<QuyTrinh> findAll() {
        return dao.findAll();
    }
    @Transactional(rollbackFor = Exception.class)
    public QuyTrinhDto saveOrUpdateQuyTrinh(QuyTrinhDto dto) {
        QuyTrinh entity;

        if (dto.getId() != null) {
            entity = dao.findById(dto.getId())
                    .orElseThrow(() -> new BadReqException("Không tìm thấy quy trình!"));

            // Xóa toàn bộ công đoạn cũ trước khi thêm mới
            entity.getQuyTrinhCongDoans().clear(); // Quan trọng!
        } else {
            entity = new QuyTrinh();
        }

        entity.setTenQuyTrinh(dto.getTenQuyTrinh());

        if (dto.getNhanVienQL() != null && dto.getNhanVienQL().getId() != null) {
            var nv = new NhanVien();
            nv.setId(dto.getNhanVienQL().getId());
            entity.setNhanVienQL(nv);
        }

        if (dto.getCongDoans() != null) {
            // Thêm từng công đoạn mới vào collection hiện có
            dto.getCongDoans().forEach(cdDto -> {
                var qtcd = new QuyTrinhCongDoan();
                qtcd.setThuTu(cdDto.getThuTu());

                var congDoan = new CongDoan();
                congDoan.setId(cdDto.getCongDoan().getId());
                qtcd.setCongDoan(congDoan);

                qtcd.setQuyTrinh(entity);
                entity.getQuyTrinhCongDoans().add(qtcd); // Thêm vào collection hiện có
            });
        }

        var saved = dao.save(entity);
        dto.setId(saved.getId());
        return dto;
    }



    public void delete(Long id) {
        var found = dao.findById(id).orElseThrow(()->new BadReqException("Khong tim thay"));
        dao.delete(found);
    }


}
