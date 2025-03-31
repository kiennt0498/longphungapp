package com.example.longphungapp.entity;


import com.example.longphungapp.fileEnum.KieuMau;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(name = "san_pham")
public class SanPham {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "ten_sp", length = 50)
    private String tenSP;





    @ManyToOne
    @JoinColumn(name = "do_vi_tinh_id")
    private DoViTinh doViTinh;

    @Column(name = "gia")
    private BigDecimal gia;

    @Column(name = "ma_vach")
    private String maVach;

    @ManyToOne
    @JoinColumn(name = "loai_sp_id")
    private LoaiSp loaiSp;



    @ManyToOne
    @JoinColumn(name = "chat_lieu_id")
    private ChatLieu chatLieu;

    @ManyToOne
    @JoinColumn(name = "hinh_dang_id")
    private HinhDang hinhDang;

    @Column(name = "mau_sp", length = 75)
    private String mauSP;

    @Column(name = "mau_vien", length = 75)
    private String mauVien;

    @Enumerated(EnumType.STRING)
    @Column(name = "kieu_mau")
    private KieuMau kieuMau;

}