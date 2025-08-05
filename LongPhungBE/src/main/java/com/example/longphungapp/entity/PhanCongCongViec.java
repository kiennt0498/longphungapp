package com.example.longphungapp.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "phan_cong_cong_viec")
public class PhanCongCongViec {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "cong_viec_ct_id")
    private CongViecCT congViecCT;

    @ManyToOne
    @JoinColumn(name = "nguoi_giao_id")
    private NhanVien nguoiGiao;

    @ManyToOne
    @JoinColumn(name = "nguoi_nhan_id")
    private NhanVien nguoiNhan;

    private LocalDateTime thoiGian;



    @PrePersist
    public void prePersist() {
        if (thoiGian == null) {
            thoiGian = LocalDateTime.now();
        }
    }

}