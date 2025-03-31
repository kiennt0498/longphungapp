package com.example.longphungapp.repository;

import com.example.longphungapp.entity.Images;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImagesRepository extends JpaRepository<Images, Long> {
    Images findByTenTep(String tenTep);
}