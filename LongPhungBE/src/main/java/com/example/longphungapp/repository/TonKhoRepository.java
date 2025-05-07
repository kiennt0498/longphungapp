package com.example.longphungapp.repository;

import com.example.longphungapp.entity.TonKho;
import lombok.Data;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface TonKhoRepository extends JpaRepository<TonKho, Long> {

    TonKho findByVatTu_Id(Long id);
}