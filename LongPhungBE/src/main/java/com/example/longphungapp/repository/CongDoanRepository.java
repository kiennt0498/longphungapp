package com.example.longphungapp.repository;

import com.example.longphungapp.entity.CongDoan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CongDoanRepository extends JpaRepository<CongDoan, Integer> {
}