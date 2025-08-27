package com.example.longphungapp.entity;


import com.example.longphungapp.fileEnum.TrangThai;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "don_hang")
public class DonHang {

    @ManyToOne
    @JoinColumn(name = "khach_hang_id")
    private KhachHang khachHang;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "ma_don_hang")
    private String maDonHang;

    @Column(name = "gia")
    private BigDecimal gia;

    @Enumerated(EnumType.STRING)
    @Column(name = "trang_thai")
    private TrangThai trangThai;

    @ManyToOne
    @JoinColumn(name = "nhan_vien_id")
    private NhanVien nhanVien;

    @Column(name = "dia_chi")
    private String diaChi;

    @Column(name = "thue")
    private Double thue;

    @Column(name = "khoa")
    private Boolean khoa;

    @Column(name = "ngay_chot_don")
    private LocalDateTime ngayChotDon;

    @Column(name = "ngay_giao_hang")
    private LocalDateTime ngayGiaoHang;

    @PrePersist
    public void prePersist() {
        khoa = false;
        ngayChotDon = LocalDateTime.now();
    }
}