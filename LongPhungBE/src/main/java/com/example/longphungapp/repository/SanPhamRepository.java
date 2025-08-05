package com.example.longphungapp.repository;

import com.example.longphungapp.entity.SanPham;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SanPhamRepository extends JpaRepository<SanPham, Long> {

    List<SanPham> findByLoaiSp_Id(Integer id);
}