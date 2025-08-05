package com.example.longphungapp.repository;

import com.example.longphungapp.entity.DonHangCT;
import com.example.longphungapp.fileEnum.TrangThai;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface DonHangCTRepository extends JpaRepository<DonHangCT, Long> {

    List<DonHangCT> findByDonHang_Id(Long id);

    List<DonHangCT> findByDonHang_MaDonHang(String maDonHang);

    DonHangCT findByImages_TenTep(String tenTep);

    List<DonHangCT> findByDonHang_NhanVien_IdAndTrangThai(String id, TrangThai trangThai);

    @Query("select dh.sanPham.tenSP, sum(dh.soLuong), sum(dh.donGia * dh.soLuong)," +
            "sum(dh.giaGoc * dh.soLuong), sum((dh.donGia - dh.giaGoc) * dh.soLuong) " +
            "from DonHangCT dh group by dh.sanPham")
    List<Object[]> getBaoCaoSP();

    @Modifying
    @Query("UPDATE DonHangCT d SET d.images.id = :imageId WHERE d.id = :id")
    void updateImageId(@Param("id") Long id, @Param("imageId") Long imageId);

    @Query("""
    SELECT dct
    FROM DonHangCT dct
    JOIN PhanPhoiDonHang pp ON dct.donHang = pp.donHang
    WHERE dct.trangThai = 'CHO_XAC_NHAN_CHIA'
      AND pp.khu.id = :khuId
      AND pp.xuong.id = :xuongId
    """)
    List<DonHangCT> findDonHangCTCanChiaByKhuXuong(Integer khuId, Integer xuongId);

}