package com.example.longphungapp.entity;

import com.example.longphungapp.fileEnum.TrangThai;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalTime;

@Getter
@Setter
@Entity
@Table(name = "thu_mua_vat_tu")
public class ThuMuaNguyenLieu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;



    @ManyToOne
    @JoinColumn(name = "nhan_vien_id")
    private NhanVien nhanVien;

    @Column(name = "gia_de_xuat", precision = 19, scale = 2)
    private BigDecimal giaDeXuat;

    @Column(name = "thoi_gian")
    private LocalTime thoiGian;

    @Enumerated(EnumType.STRING)
    @Column(name = "trang_thai")
    private TrangThai trangThai;

    @ManyToOne
    @JoinColumn(name = "vat_tu_id")
    private VatTu vatTu;

}