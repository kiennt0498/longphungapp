package com.example.longphungapp.entity;

import com.example.longphungapp.fileEnum.BoPhan;
import com.example.longphungapp.fileEnum.ChucVu;
import com.example.longphungapp.fileEnum.TacVu;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "nhan_vien")
public class NhanVien {
    @Id
    @Column(name = "id", nullable = false, length = 7)
    private String id;

    @Column(name = "ho_ten", length = 75)
    private String hoTen;

    @Column(name = "dia_chi")
    private String diaChi;

    @Enumerated(EnumType.STRING)
    @Column(name = "bo_phan")
    private BoPhan boPhan;

    @Enumerated(EnumType.STRING)
    @Column(name = "chuc_vu")
    private ChucVu chucVu;

    @Enumerated(EnumType.STRING)
    @Column(name = "tac_vu")
    private TacVu tacVu;

    @OneToOne(orphanRemoval = true)
    @JoinColumn(name = "tai_khoan_sdt")
    private TaiKhoan taiKhoan;

}