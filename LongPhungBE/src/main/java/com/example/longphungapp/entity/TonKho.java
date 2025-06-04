package com.example.longphungapp.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(name = "ton_kho")
public class TonKho {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "kho_ma_kho")
    private Kho kho;

    @ManyToOne
    @JoinColumn(name = "vat_tu_id")
    private VatTu vatTu;


    @Column(name = "so_luong")
    private Long soLuong;


    @Column(name = "gia_tri_ton_kho", precision = 19, scale = 2)
    private BigDecimal giaTriTonKho;


}