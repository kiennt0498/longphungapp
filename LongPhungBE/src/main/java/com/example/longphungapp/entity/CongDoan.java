package com.example.longphungapp.entity;

import com.example.longphungapp.fileEnum.BoPhan;
import com.example.longphungapp.fileEnum.TacVu;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.proxy.HibernateProxy;

import java.math.BigDecimal;
import java.util.Objects;

@Getter
@Setter
@Entity
@Table(name = "cong_doan")
public class CongDoan {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(nullable = false)
  private Integer id;

  private String tenCongDoan;

  @Column(name = "gia_mua_nguyen_lieu", precision = 19, scale = 2)
  private BigDecimal giaMuaNguyenLieu;

  @Column(precision = 19, scale = 2)
  private BigDecimal khauHaoMay;

  @Column(name = "cong_nv", precision = 19, scale = 2)
  private BigDecimal congNV;

  @Column(name = "he_so_thu_mua")
  private Double heSoThuMua;

  @Column(name = "he_so_tien_cong")
  private Double heSoTienCong;

  @Enumerated(EnumType.STRING)
  @Column(name = "tac_vu")
  private TacVu tacVu;

  @Override
  public final boolean equals(Object o) {
    if (this == o) return true;
    if (o == null) return false;
    Class<?> oEffectiveClass = o instanceof HibernateProxy ? ((HibernateProxy) o).getHibernateLazyInitializer().getPersistentClass() : o.getClass();
    Class<?> thisEffectiveClass = this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass() : this.getClass();
    if (thisEffectiveClass != oEffectiveClass) return false;
    CongDoan congDoan = (CongDoan) o;
    return getId() != null && Objects.equals(getId(), congDoan.getId());
  }

  @Override
  public final int hashCode() {
    return this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass().hashCode() : getClass().hashCode();
  }
}