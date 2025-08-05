package com.example.longphungapp.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Setter
@Entity
@Table(name = "cham_cong")
public class ChamCong {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "nhan_vien_id")
    private NhanVien nhanVien;

    @ManyToOne
    @JoinColumn(name = "lich_su_cv_id")
    private LichSuCV lichSuCV;

    @Column(name = "kpi", precision = 19, scale = 2)
    private BigDecimal kpi;

    @Column(name = "ngay_nhan")
    private LocalDateTime ngayNhan;

    @PrePersist
    public void prePersist() {
        ngayNhan = LocalDateTime.now();
    }
}