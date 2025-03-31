package com.example.longphungapp.repository;

import com.example.longphungapp.entity.LichSuDonHang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface LichSuDonHangRepository extends JpaRepository<LichSuDonHang, Long> {
    List<LichSuDonHang> findByNhanVien_Id(String id);

    LichSuDonHang findByDonHang_Id(Long id);
}