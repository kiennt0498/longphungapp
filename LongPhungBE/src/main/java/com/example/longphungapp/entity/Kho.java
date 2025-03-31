package com.example.longphungapp.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "kho")
public class Kho {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ma_kho", nullable = false)
    private Long maKho;

    @Column(name = "ten_kho", length = 120)
    private String tenKho;

    @Column(name = "sdt", length = 13)
    private String sdt;

    @Column(name = "dia_chi", length = 200)
    private String diaChi;

    @ManyToOne
    @JoinColumn(name = "d_vvc_id")
    private DVVC dVVC;

}