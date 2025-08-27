package com.example.longphungapp.entity;

import com.example.longphungapp.dto.donAoDto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "phieu_in")
public class PhieuIn {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "nhan_vien_id")
    private NhanVien nguoiNhan;

    @ManyToOne
    @JoinColumn(name = "don_hang_ct_id")
    private DonHangCT donHangCT;

    @ManyToOne
    @JoinColumn(name = "images_id")
    private Images phieu;

    @JsonIgnore
    @Column(name = "da_gui")
    private Boolean daGui;

    @Column(name = "ngay_gui")
    private LocalDateTime ngayGui;

}