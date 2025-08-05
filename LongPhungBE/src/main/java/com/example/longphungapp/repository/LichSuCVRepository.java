package com.example.longphungapp.repository;

import com.example.longphungapp.entity.DonHang;
import com.example.longphungapp.entity.LichSuCV;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
@Repository
public interface LichSuCVRepository extends JpaRepository<LichSuCV, Long> {
    List<LichSuCV> findByNhanVien_Id(String id);

    List<LichSuCV> findByNhanVien_IdAndNgayHoanThanhBetween(String id, Date ngayHoanThanhStart, Date ngayHoanThanhEnd);

    List<LichSuCV> findByNhanVien_IdAndNgayHoanThanh(String id, Date ngayHoanThanh);

    @Query("SELECT l FROM LichSuCV l WHERE l.nhanVien.id = ?1 AND FUNCTION('MONTH', l.ngayHoanThanh) = ?1 AND FUNCTION('YEAR', l.ngayHoanThanh) = ?2")
    List<LichSuCV> findByMonthAndYear(String maNV, int month, int year);

    List<LichSuCV> findByCongViecCT_DonHangCT_DonHang(DonHang donHang);

}