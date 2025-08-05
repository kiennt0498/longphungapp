package com.example.longphungapp.repository;

import com.example.longphungapp.entity.NhanVien;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface NhanVienRepository extends JpaRepository<NhanVien, String> {

    NhanVien findByTaiKhoan_Sdt(String sdt);

    @Query("SELECT MAX(n.id) FROM NhanVien n WHERE n.id LIKE :prefix%")
    String findMaxIdByChucVu(@Param("prefix") String prefix);

    @Query("select n.taiKhoan.sdt from NhanVien n ")
    List<String> findAllSdt();

    List<NhanVien> findByIdContains(String id);

    List<NhanVien> findByHoTenContains(String hoTen);

    List<NhanVien> findByTaiKhoan_SdtContains(String sdt);

    List<NhanVien> findByBoPhan_Id(Integer id);

    @Query("select n from NhanVien n where n.chucVu.id = ?1 and n.xuong.id = ?2 and n.khu.id = ?3")
    NhanVien findByChucVu_IdAndXuong_IdAndKhu_Id(Integer id, Integer id1, Integer id2);

    @Query("select n from NhanVien n where n.chucVu.id = ?1 and n.xuong.id = ?2")
    NhanVien findByChucVu_IdAndXuong_Id(Integer id, Integer id1);

    NhanVien findByXuong_IdAndKhu_IdAndBoPhan_Id(Integer id, Integer id1, Integer id2);


}