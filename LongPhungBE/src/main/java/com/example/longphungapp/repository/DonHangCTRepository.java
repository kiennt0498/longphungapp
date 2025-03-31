package com.example.longphungapp.repository;

import com.example.longphungapp.entity.DonHangCT;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface DonHangCTRepository extends JpaRepository<DonHangCT, Long> {

    List<DonHangCT> findByDonHang_Id(Long id);

    List<DonHangCT> findByDonHang_MaDonHang(String maDonHang);
}