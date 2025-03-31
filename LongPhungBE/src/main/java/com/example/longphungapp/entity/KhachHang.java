package com.example.longphungapp.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "khach_hang")
public class KhachHang {
    @Id
    @Column(nullable = false)
    private String id;

    @Column(name = "ten_khach_hang")
    private String tenKhachHang;

    @Column(name = "sdt", unique = true, length = 11)
    private String sdt;

    @ManyToOne
    @JoinColumn(name = "nhan_vien_id")
    private NhanVien nhanVien;

    @Column(name = "dia_chi")
    private String diaChi;

}