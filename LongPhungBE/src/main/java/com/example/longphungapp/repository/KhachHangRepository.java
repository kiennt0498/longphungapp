package com.example.longphungapp.repository;

import com.example.longphungapp.entity.KhachHang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface KhachHangRepository extends JpaRepository<KhachHang, String> {
    KhachHang findBySdt(String sdt);

    List<KhachHang> findByTenKhachHangContains(String tenKhachHang);

    List<KhachHang> findBySdtContains(String sdt);

    @Query("SELECT k FROM KhachHang k WHERE CAST(k.id AS string) LIKE %:id%")
    List<KhachHang> findByIdLike(@Param("id") String id);

    long countByIdLike(String id);

    @Query("select k.sdt from KhachHang k")
    Set<String> findAllSdt();


}