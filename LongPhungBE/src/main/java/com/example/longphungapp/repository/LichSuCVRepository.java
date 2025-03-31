package com.example.longphungapp.repository;

import com.example.longphungapp.entity.LichSuCV;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface LichSuCVRepository extends JpaRepository<LichSuCV, Long> {
    List<LichSuCV> findByNhanVien_Id(String id);
}