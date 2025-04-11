package com.example.longphungapp.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Entity
@Table(name = "sp_kho")
public class SP_Kho {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;



    @OneToOne(orphanRemoval = true)
    @JoinColumn(name = "san_pham_ma_sp")
    private SanPham sanPham;

    @OneToOne(orphanRemoval = true)
    @JoinColumn(name = "kho_ma_kho")
    private Kho kho;

    @Column(name = "so_luong")
    private Long soLuong;

    @Column(name = "noi_nhap", length = 150)
    private String noiNhap;

    @ManyToOne
    @JoinColumn(name = "do_vi_tinh_id")
    private DoViTinh doViTinh;

    @Temporal(TemporalType.DATE)
    @Column(name = "ngay_nhap")
    private Date ngayNhap;

    @ManyToOne
    @JoinColumn(name = "nguyen_vat_lieu_id")
    private NguyenVatLieu nguyenVatLieu;

    @Temporal(TemporalType.DATE)
    @Column(name = "ngay_cap_nhat")
    private Date ngayCapNhat;

}