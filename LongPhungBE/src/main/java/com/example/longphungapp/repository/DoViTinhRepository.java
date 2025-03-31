package com.example.longphungapp.repository;

import com.example.longphungapp.entity.DoViTinh;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DoViTinhRepository extends JpaRepository<DoViTinh, Integer> {
}