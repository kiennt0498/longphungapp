package com.example.longphungapp.repository;

import com.example.longphungapp.entity.PhieuIn;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PhieuInRepository extends JpaRepository<PhieuIn, Long> {

    List<PhieuIn> findByNguoiNhan_Id(String id);

    List<PhieuIn> findByDaGuiAndNguoiNhan_Id(Boolean daGui, String id);

}