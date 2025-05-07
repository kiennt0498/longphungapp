package com.example.longphungapp.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "list_gia_thu_mua")
public class ListGiaThuMua {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "don_thu_mua_id")
    private DonThuMua donThuMua;

    @ManyToOne
    @JoinColumn(name = "nhan_vien_id")
    private NhanVien nhanVien;

    @Column(name = "don_gia", precision = 19, scale = 2)
    private BigDecimal donGia;

    @Column(name = "phi_vc", precision = 19, scale = 2)
    private BigDecimal phiVC;

    @Column(precision = 19, scale = 2)
    private BigDecimal tong;


}