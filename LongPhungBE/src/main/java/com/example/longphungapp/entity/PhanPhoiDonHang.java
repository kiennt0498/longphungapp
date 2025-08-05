package com.example.longphungapp.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "phan_phoi_don_hang")
public class PhanPhoiDonHang {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "don_hang_id")
    private DonHang donHang;

    @ManyToOne
    @JoinColumn(name = "xuong_id")
    private Xuong xuong;

    @ManyToOne
    @JoinColumn(name = "khu_id")
    private Khu khu;

    @ManyToOne
    @JoinColumn(name = "nhan_vien_id")
    private NhanVien nguoiNhan;

    private LocalDateTime ngayNhan;

    @Column(name = "hoan_thanh")
    private Boolean hoanThanh;

    @PrePersist
    public void prePersist() {
        ngayNhan = LocalDateTime.now();
    }
}