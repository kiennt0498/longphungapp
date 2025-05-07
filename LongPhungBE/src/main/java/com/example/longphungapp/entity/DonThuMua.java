package com.example.longphungapp.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "don_thu_mua")
public class DonThuMua {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "ten_nguyen_lieu", length = 120)
    private String tenNguyenLieu;

    @ManyToOne
    @JoinColumn(name = "do_vi_tinh_id")
    private DoViTinh doViTinh;

    @Column(name = "so_luong")
    private Long soLuong;

    @Column(name = "kich_thuoc")
    private String kichThuoc;

    @Column(name = "mau_sac", length = 100)
    private String mauSac;

    @ManyToOne
    @JoinColumn(name = "chat_lieu_id")
    private ChatLieu chatLieu;

    @Column(name = "tieu_chuan", length = 75)
    private String tieuChuan;

    @Temporal(TemporalType.DATE)
    @Column(name = "han_thu_mua")
    private Date hanThuMua;

    @Column(name = "gia_du_tinh", precision = 19, scale = 2)
    private BigDecimal giaDuTinh;

    @Column(name = "gia_thu_mua", precision = 19, scale = 2)
    private BigDecimal giaThuMua;

    @Column(name = "phi_van_chuyen", precision = 19, scale = 2)
    private BigDecimal phiVanChuyen;

    @Column(name = "ghi_chu")
    private String ghiChu;

    @Column(name = "done")
    private Boolean done;

    @Column(name = "loai", length = 50)
    private String loai;

    @ManyToOne
    @JoinColumn(name = "nguoi_len_don_id")
    private NhanVien nguoiLenDon;

    @JsonIgnore
    @OneToMany(mappedBy = "donThuMua", orphanRemoval = true, cascade = CascadeType.REMOVE)
    private List<ListGiaThuMua> listGiaThuMuas = new ArrayList<>();

    @PrePersist
    public void prePersist() {
        done = false;
    }
}