package com.example.longphungapp.entity;

import com.example.longphungapp.fileEnum.TrangThai;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.proxy.HibernateProxy;

import java.math.BigDecimal;
import java.util.Objects;

@Getter
@Setter
@Entity
@Table(name = "don_hang_ct")
public class DonHangCT {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;



    @ManyToOne
    @JoinColumn(name = "san_pham_ma_sp")
    private SanPham sanPham;

    @Column(name = "so_luong")
    private Integer soLuong;

    @Enumerated(EnumType.STRING)
    @Column(name = "trang_thai")
    private TrangThai trangThai;




    @ManyToOne
    @JoinColumn(name = "don_hang_id")
    private DonHang donHang;



    @Column(name = "chieu_dai")
    private Double chieuDai;

    @Column(name = "chieu_rong")
    private Double chieuRong;

    @Column(name = "ghi_chu")
    private String ghiChu;

    @ManyToOne
    @JoinColumn(name = "quy_trinh_id")
    private QuyTrinh quyTrinh;

    @ManyToOne
    @JoinColumn(name = "images_id")
    private Images images;

    @Column(name = "don_gia", precision = 19, scale = 2)
    private BigDecimal donGia;

    @Column(name = "gia_goc", precision = 19, scale = 2)
    private BigDecimal giaGoc;

    @Override
    public final boolean equals(Object o) {
        if (this == o) return true;
        if (o == null) return false;
        Class<?> oEffectiveClass = o instanceof HibernateProxy ? ((HibernateProxy) o).getHibernateLazyInitializer().getPersistentClass() : o.getClass();
        Class<?> thisEffectiveClass = this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass() : this.getClass();
        if (thisEffectiveClass != oEffectiveClass) return false;
        DonHangCT donHangCT = (DonHangCT) o;
        return getId() != null && Objects.equals(getId(), donHangCT.getId());
    }

    @Override
    public final int hashCode() {
        return this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass().hashCode() : getClass().hashCode();
    }
}