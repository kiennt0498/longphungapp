package com.example.longphungapp.repository;

import com.example.longphungapp.entity.DonHang;
import com.example.longphungapp.fileEnum.TrangThai;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface DonHangRepository extends JpaRepository<DonHang, Long> {
    DonHang findByMaDonHang(String maDonHang);

    List<DonHang> findByNhanVien_IdAndTrangThai(String id, TrangThai trangThai);

    List<DonHang> findByTrangThai(TrangThai trangThai);
}