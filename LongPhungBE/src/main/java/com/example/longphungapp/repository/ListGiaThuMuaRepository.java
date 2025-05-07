package com.example.longphungapp.repository;

import com.example.longphungapp.entity.ListGiaThuMua;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.util.List;

public interface ListGiaThuMuaRepository extends JpaRepository<ListGiaThuMua, Long> {
    List<ListGiaThuMua> findByDonThuMua_Id(Long id);
    @Query("select l from ListGiaThuMua l where l.donThuMua.id = ?1 order by l.tong asc limit 1")
    ListGiaThuMua findGiaThapNhat(Long id);
}