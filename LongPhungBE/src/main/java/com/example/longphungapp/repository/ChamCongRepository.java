package com.example.longphungapp.repository;

import com.example.longphungapp.entity.ChamCong;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Repository
public interface ChamCongRepository extends JpaRepository<ChamCong, Long> {
    @Query("select cv.nhanVien.id, cv.nhanVien.hoTen, sum(cv.kpi) as tongKPI" +
            " from LichSuCV cv where cv.trangThai = 'DA_GIAO'" +
            " and cv.ngayHoanThanh between ?1 and ?2" +
            " group by cv.nhanVien")
    List<Object[]> findKpiRawByThang(LocalDate startDate, LocalDate endDate);

    @Query("select dh.nhanVien," +
            " sum((ct.donGia - ct.giaGoc)* ct.soLuong) as loiNhuan, " +
            " sum(ct.donGia * ct.soLuong) as doanhThu" +
            " from DonHang dh join DonHangCT ct" +
            " on dh.id = ct.donHang.id" +
            " where dh.trangThai = 'CHO_VAN_CHUYEN'" +
            " and dh.ngayGiaoHang between ?1 and ?2" +
            " group by dh.nhanVien")
    List<Object[]> getLoiNhuanDoanhThu(LocalDate startDate, LocalDate endDate);
}