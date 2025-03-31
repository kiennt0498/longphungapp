package com.example.longphungapp.repository;

import com.example.longphungapp.entity.CongViecCT;
import com.example.longphungapp.fileEnum.TrangThai;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface CongViecCTRepository extends JpaRepository<CongViecCT, Long> {
    List<CongViecCT> findByTrangThai(TrangThai trangThai);

    List<CongViecCT> findByNhanVien_IdLikeAndTrangThai(String id, TrangThai trangThai);

    List<CongViecCT> findByDonHangCT_DonHang_Id(Long id);
}