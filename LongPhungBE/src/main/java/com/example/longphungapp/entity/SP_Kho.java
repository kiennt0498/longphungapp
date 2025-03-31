package com.example.longphungapp.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "sp_kho")
public class SP_Kho {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @OneToOne(orphanRemoval = true)
    @JoinColumn(name = "san_pham_ma_sp")
    private SanPham sanPham;

    @OneToOne(orphanRemoval = true)
    @JoinColumn(name = "kho_ma_kho")
    private Kho kho;

    @Column(name = "so_luong")
    private Long soLuong;

}