package com.example.longphungapp.repository;

import com.example.longphungapp.entity.LoaiSp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoaiSpRepository extends JpaRepository<LoaiSp, Integer> {
}