package com.example.longphungapp.repository;

import com.example.longphungapp.entity.DonHang;
import com.example.longphungapp.entity.Khu;
import com.example.longphungapp.entity.Xuong;
import com.example.longphungapp.fileEnum.TrangThai;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface DonHangRepository extends JpaRepository<DonHang, Long> {
    DonHang findByMaDonHang(String maDonHang);

    List<DonHang> findByNhanVien_IdAndTrangThai(String id, TrangThai trangThai);

    List<DonHang> findByTrangThai(TrangThai trangThai);

    @Query("select ct.donHang from DonHangCT ct where ct.id = ?1")
    DonHang findByDonHangCT_Id(Long id);

    @Query("select pp.donHang from PhanPhoiDonHang pp where pp.xuong.id = ?1 and pp.khu.id is null and pp.donHang.trangThai = 'CHO_SAN_XUAT'")
    List<DonHang> findBy_Xuong(Integer xuong);

    @Query("select pp.donHang from PhanPhoiDonHang pp where pp.xuong.id = ?1 and pp.khu.id = ?2 ")
    List<DonHang> findBy_XuongAndKhu(Integer xuong, Integer khu);

    @Query("select pp.donHang from PhanPhoiDonHang pp where pp.xuong.id = ?1 and pp.donHang.trangThai = 'CHO_VAN_CHUYEN'")
    List<DonHang> findDonHTByXuong_Id(Integer xuongId);
}