package com.example.longphungapp.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "phieu")
public class Phieu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "kho_ma_kho")
    private Kho kho;

    @Temporal(TemporalType.DATE)
    @Column(name = "ngay_nhap")
    private Date ngayNhap;

    @Temporal(TemporalType.DATE)
    @Column(name = "ngay_xuat")
    private Date ngayXuat;

    @Column(name = "tong_gia_tri", precision = 19, scale = 2)
    private BigDecimal tongGiaTri;

    @ManyToOne
    @JoinColumn(name = "nhan_vien_id")
    private NhanVien nguoiTao;

    @OneToMany(mappedBy = "phieu", orphanRemoval = true, cascade = CascadeType.ALL)
    private List<PhieuChiTiet> phieuChiTiets = new ArrayList<>();

}