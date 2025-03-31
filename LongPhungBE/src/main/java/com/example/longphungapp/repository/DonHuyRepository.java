package com.example.longphungapp.repository;

import com.example.longphungapp.entity.DonHuy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DonHuyRepository extends JpaRepository<DonHuy, Integer> {
}