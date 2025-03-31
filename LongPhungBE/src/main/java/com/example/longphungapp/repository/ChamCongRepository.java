package com.example.longphungapp.repository;

import com.example.longphungapp.entity.ChamCong;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChamCongRepository extends JpaRepository<ChamCong, Long> {
}