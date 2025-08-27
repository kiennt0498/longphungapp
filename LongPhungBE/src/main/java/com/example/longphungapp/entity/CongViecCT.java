package com.example.longphungapp.entity;

import com.example.longphungapp.fileEnum.TacVu;
import com.example.longphungapp.fileEnum.TrangThai;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Setter
@Entity
@Table(name = "cong_viec_ct")
public class CongViecCT {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;



    @Column(name = "kpi")
    private BigDecimal kpi;

    @Temporal(TemporalType.DATE)
    @Column(name = "ngay_nhan")
    private Date ngayNhan;

    @Temporal(TemporalType.DATE)
    @Column(name = "ngay_giao")
    private Date ngayGiao;

    @ManyToOne
    @JoinColumn(name = "don_hang_ct_id")
    private DonHangCT donHangCT;

    @ManyToOne
    @JoinColumn(name = "cong_doan_id")
    private CongDoan congDoan;

    @ManyToOne
    @JoinColumn(name = "nhan_vien_id")
    private NhanVien nhanVien;

    @Enumerated(EnumType.STRING)
    @Column(name = "trang_thai")
    private TrangThai trangThai;

    @Enumerated(EnumType.STRING)
    @Column(name = "tac_vu")
    private TacVu tacVu;

    @Column(name = "ngay_tao")
    private LocalDateTime ngayTao;

    @PrePersist
    public void prePersist() {
       LocalDateTime now = LocalDateTime.now();
       ngayTao = now;

    }
}