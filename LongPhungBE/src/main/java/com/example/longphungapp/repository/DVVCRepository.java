package com.example.longphungapp.repository;

import com.example.longphungapp.entity.DVVC;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DVVCRepository extends JpaRepository<DVVC, Integer> {
}