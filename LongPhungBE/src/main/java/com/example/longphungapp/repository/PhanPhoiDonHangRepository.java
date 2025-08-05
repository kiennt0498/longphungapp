package com.example.longphungapp.repository;

import com.example.longphungapp.entity.PhanPhoiDonHang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.lang.NonNull;

import java.util.List;

public interface PhanPhoiDonHangRepository extends JpaRepository<PhanPhoiDonHang, Long> {
    PhanPhoiDonHang findByDonHang_Id(Long id);

    @Query("select p from PhanPhoiDonHang p where p.xuong.id = ?1 and p.khu.id is not null")
    List<PhanPhoiDonHang> findByXuong_IdAndKhu_IdNotNull(Integer id);




}