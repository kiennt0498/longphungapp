package com.example.longphungapp.entity;

import com.example.longphungapp.fileEnum.TrangThai;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
@Entity
@Table(name = "lich_su_cv")
public class LichSuCV {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "nhan_vien_id")
    private NhanVien nhanVien;

    @ManyToOne
    @JoinColumn(name = "cong_viec_ct_id")
    private CongViecCT congViecCT;

    @Temporal(TemporalType.DATE)
    private Date ngayHoanThanh;

    @Enumerated(EnumType.STRING)
    @Column(name = "trang_thai")
    private TrangThai trangThai;

    @Column(name = "kpi", precision = 19, scale = 2)
    private BigDecimal kpi;

    @PrePersist
    public void prePersist() {
        ngayHoanThanh = new Date();
    }


}