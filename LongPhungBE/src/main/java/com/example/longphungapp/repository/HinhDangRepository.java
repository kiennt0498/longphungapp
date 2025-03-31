package com.example.longphungapp.repository;

import com.example.longphungapp.entity.HinhDang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HinhDangRepository extends JpaRepository<HinhDang, Integer> {
}