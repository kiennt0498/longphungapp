package com.example.longphungapp.service;

import com.example.longphungapp.entity.NguyenVatLieu;
import com.example.longphungapp.repository.NguyenVatLieuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NguyenLieuService {
    @Autowired
    NguyenVatLieuRepository dao;

    public void deleteAllInBatch() {
        dao.deleteAllInBatch();
    }

    public List<NguyenVatLieu> findAll() {
        return dao.findAll();
    }

    public <S extends NguyenVatLieu> S save(S entity) {
        return dao.save(entity);
    }

    public Optional<NguyenVatLieu> findById(Long aLong) {
        return dao.findById(aLong);
    }

    public void delete(NguyenVatLieu entity) {
        dao.delete(entity);
    }
}
