package com.example.longphungapp.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "don_huy")
public class DonHuy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;



    @Column(name = "lydo")
    private String lydo;

    @ManyToOne
    @JoinColumn(name = "cong_doan_id")
    private CongDoan congDoan;

    @Temporal(TemporalType.DATE)
    @Column(name = "ngay_huy")
    private Date ngayHuy;

    @ManyToOne
    @JoinColumn(name = "don_hang_id")
    private DonHang donHang;

    @PrePersist
    public void prePersist() {
        ngayHuy = new Date();
    }
}