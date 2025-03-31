package com.example.longphungapp.repository;

import com.example.longphungapp.entity.QuyTrinh;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuyTrinhRepository extends JpaRepository<QuyTrinh, Long> {
}