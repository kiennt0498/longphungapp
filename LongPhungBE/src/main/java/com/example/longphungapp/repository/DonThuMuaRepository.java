package com.example.longphungapp.repository;

import com.example.longphungapp.entity.DonThuMua;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;

public interface DonThuMuaRepository extends JpaRepository<DonThuMua, Long> {
    List<DonThuMua> findByDone(Boolean done);

    @Query("select d from DonThuMua d where d.done = false and d.hanThuMua = current_date ")
    List<DonThuMua> findDonThuMuaHetHanChuaChot();
}