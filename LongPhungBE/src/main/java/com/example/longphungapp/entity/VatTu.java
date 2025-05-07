package com.example.longphungapp.entity;

import com.example.longphungapp.fileEnum.LoaiVatTu;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(name = "vat_tu")
public class VatTu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "ten", length = 70)
    private String ten;

    @Column(name = "gia_nhap", precision = 19, scale = 2)
    private BigDecimal giaNhap;

    @ManyToOne
    @JoinColumn(name = "chat_lieu_id")
    private ChatLieu chatLieu;

    @Column(name = "he_so_bu")
    private Double heSoBu;

    @Column(name = "he_so_thu_mua")
    private Double heSoThuMua;

    @Enumerated(EnumType.STRING)
    @Column(name = "loai_vat_tu")
    private LoaiVatTu loaiVatTu;

    @ManyToOne
    @JoinColumn(name = "do_vi_tinh_id")
    private DoViTinh doViTinh;

}