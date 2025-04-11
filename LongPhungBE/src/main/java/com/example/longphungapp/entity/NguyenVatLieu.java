package com.example.longphungapp.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
@Entity
@Table(name = "nguyen_vat_lieu")
public class NguyenVatLieu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "ten", length = 70)
    private String ten;

    @Column(name = "gia_nhap", precision = 19, scale = 2)
    private BigDecimal giaNhap;

    @ManyToOne
    @JoinColumn(name = "chat_lieu_id")
    private ChatLieu chatLieu;

    @Column(name = "he_so_bu")
    private Double heSoBu;

    @Column(name = "he_so_thu_mua")
    private Double heSoThuMua;

}