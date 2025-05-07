package com.example.longphungapp.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "quy_trinh_cong_doan")
public class QuyTrinhCongDoan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)

    private Long id;

    @ManyToOne
    @JoinColumn(name = "quy_trinh_id")
    @JsonIgnore
    private QuyTrinh quyTrinh;

    @ManyToOne
    @JoinColumn(name = "cong_doan_id")
    private CongDoan congDoan;

    @Column(name = "thu_tu")
    private Integer thuTu;

}