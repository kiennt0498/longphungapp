package com.example.longphungapp.entity;

import com.example.longphungapp.fileEnum.TrangThai;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Entity
@Table(name = "lich_su_don_hang")
public class LichSuDonHang {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;





    @Enumerated(EnumType.STRING)
    @Column(name = "trang_thai")
    private TrangThai trangThai;

    @Temporal(TemporalType.DATE)
    @Column(name = "ngay_chot")
    private Date ngayChot;

    @ManyToOne
    @JoinColumn(name = "don_hang_id")
    private DonHang donHang;

    @ManyToOne
    @JoinColumn(name = "nhan_vien_id")
    private NhanVien nhanVien;

    @PrePersist
    public void prePersist() {
        ngayChot = new Date();
    }
}