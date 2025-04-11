package com.example.longphungapp.dto;

import com.example.longphungapp.entity.NguyenVatLieu;
import lombok.Data;
import lombok.Value;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

/**
 * DTO for {@link NguyenVatLieu}
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
