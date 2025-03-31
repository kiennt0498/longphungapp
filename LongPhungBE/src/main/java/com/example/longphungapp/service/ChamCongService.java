package com.example.longphungapp.service;

import com.example.longphungapp.entity.ChamCong;
import com.example.longphungapp.repository.ChamCongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ChamCongService {
    @Autowired
    ChamCongRepository dao;

    public List<ChamCong> findAll() {
        return dao.findAll();
    }
    @Transactional(rollbackFor = Exception.class)
    public <S extends ChamCong> S save(S entity) {
        return dao.save(entity);
    }

    public Optional<ChamCong> findById(Long aLong) {
        return dao.findById(aLong);
    }

    public void delete(ChamCong entity) {
        dao.delete(entity);
    }
}
