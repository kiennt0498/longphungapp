package com.example.longphungapp.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "quy_trinh")
public class QuyTrinh {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;

    @Column(name = "ten_quy_trinh")
    private String tenQuyTrinh;



    @ManyToOne
    @JoinColumn(name = "nhan_vien_ql_id")
    private NhanVien nhanVienQL;

    @OneToMany(mappedBy = "quyTrinh", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<QuyTrinhCongDoan> quyTrinhCongDoans = new ArrayList<>();

}