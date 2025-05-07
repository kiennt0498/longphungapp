package com.example.longphungapp.dto;

import com.example.longphungapp.entity.VatTu;
import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * DTO for {@link VatTu}
 */
@Data
public class NguyenVatLieuDto implements Serializable {
    Long id;
    String ten;
    BigDecimal giaNhap;
    DoViTinhDto doViTinh;
    private ChatLieuDto chatLieu;
    private Double heSoBu;
    private Double heSoS;
    private BigDecimal heSoGiaS;
    private Double heSoThuMua;
}
