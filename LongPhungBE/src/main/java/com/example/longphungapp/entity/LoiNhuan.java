package com.example.longphungapp.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;

import java.math.BigDecimal;

@Embeddable
@Data
public class LoiNhuan {

    @Column(name = "so_luong")
    private Long soLuong;

    @Column(name = "loi_nhuan")
    private Double loiNhuan;
}

