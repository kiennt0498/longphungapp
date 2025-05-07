package com.example.longphungapp.repository;

import com.example.longphungapp.entity.ThongBao;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface ThongBaoRepository extends JpaRepository<ThongBao, Long> {
    List<ThongBao> findByTimeBetween(LocalDate timeStart, LocalDate timeEnd);
}