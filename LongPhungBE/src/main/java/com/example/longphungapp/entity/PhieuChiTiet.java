package com.example.longphungapp.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(name = "phieu_chi_tiet")
public class PhieuChiTiet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;


    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "phieu_nhap_id")
    private Phieu phieu;

    @ManyToOne
    @JoinColumn(name = "vat_tu_id")
    private VatTu vatTu;

    @Column(name = "so_luong")
    private Long soLuong;

    @Column(name = "don_gia", precision = 19, scale = 2)
    private BigDecimal donGia;

    @Column(name = "thanh_tien", precision = 19, scale = 2)
    private BigDecimal thanhTien;

}