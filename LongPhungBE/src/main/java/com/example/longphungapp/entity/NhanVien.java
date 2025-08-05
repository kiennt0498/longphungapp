package com.example.longphungapp.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "nhan_vien")
public class NhanVien {
    @Id
    @Column(name = "id", nullable = false, length = 7)
    private String id;

    @Column(name = "ho_ten", length = 75)
    private String hoTen;

    @Column(name = "dia_chi")
    private String diaChi;

    @ManyToOne
    @JoinColumn(name = "chuc_vu_id")
    private ChucVu chucVu;

    @ManyToOne
    @JoinColumn(name = "bo_phan_id")
    private BoPhan boPhan;

    @ManyToOne
    @JoinColumn(name = "khu_id")
    private Khu khu;

    @ManyToOne
    @JoinColumn(name = "xuong_id")
    private Xuong xuong;

    @OneToOne(orphanRemoval = true)
    @JoinColumn(name = "tai_khoan_sdt")
    private TaiKhoan taiKhoan;

}