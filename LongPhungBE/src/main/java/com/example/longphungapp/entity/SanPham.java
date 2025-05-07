package com.example.longphungapp.entity;



import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "san_pham")
public class  SanPham {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "ten_sp", length = 50)
    private String tenSP;

    @Column(name = "gia")
    private BigDecimal gia;

    @Column(name = "ma_vach")
    private String maVach;

    @ManyToOne
    @JoinColumn(name = "loai_sp_id")
    private LoaiSp loaiSp;

    @ManyToOne
    @JoinColumn(name = "hinh_dang_id")
    private HinhDang hinhDang;

    @ManyToOne
    @JoinColumn(name = "do_vi_tinh_id")
    private DoViTinh doViTinh;

    @ManyToOne
    @JoinColumn(name = "quy_trinh_id")
    private QuyTrinh quyTrinh;

    @ElementCollection
    @CollectionTable(
            name = "san_pham_loi_nhuan",
            joinColumns = @JoinColumn(name = "san_pham_id")
    )
    @JsonIgnore
    private List<LoiNhuan> loiNhuan;



    @ManyToMany
    @JoinTable(name = "san_pham_vat_tus",
            joinColumns = @JoinColumn(name = "sanPham_id"),
            inverseJoinColumns = @JoinColumn(name = "vatTu_id"))
    private List<VatTu> nguyenVatLieus = new ArrayList<>();



}