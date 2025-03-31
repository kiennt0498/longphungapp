package com.example.longphungapp.repository;

import com.example.longphungapp.entity.Kho;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KhoRepository extends JpaRepository<Kho, Long> {
}