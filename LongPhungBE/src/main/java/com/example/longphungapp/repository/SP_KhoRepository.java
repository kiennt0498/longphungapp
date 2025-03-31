package com.example.longphungapp.repository;

import com.example.longphungapp.entity.SP_Kho;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SP_KhoRepository extends JpaRepository<SP_Kho, Long> {
}