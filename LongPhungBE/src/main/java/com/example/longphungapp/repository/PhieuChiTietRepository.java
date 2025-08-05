package com.example.longphungapp.repository;

import com.example.longphungapp.entity.PhieuChiTiet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PhieuChiTietRepository extends JpaRepository<PhieuChiTiet, Long> {
    @Query("select ct.vatTu.ten, sum(ct.soLuong), sum(ct.thanhTien), avg(ct.donGia) " +
            "from PhieuChiTiet ct join Phieu p on ct.phieu = p " +
            "where p.ngayNhap is null " +
            "group by ct.vatTu.ten")
    List<Object[]> thongKeXuat();

    @Query("select ct.vatTu.ten, sum(ct.soLuong), sum(ct.thanhTien), avg(ct.donGia) " +
            "from PhieuChiTiet ct join Phieu p on ct.phieu = p " +
            "where p.ngayXuat is null " +
            "group by ct.vatTu.ten")
    List<Object[]> thongKeNhap();
}