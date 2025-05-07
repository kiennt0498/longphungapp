package com.example.longphungapp.dto;

import com.example.longphungapp.entity.PhieuChiTiet;
import lombok.Value;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * DTO for {@link PhieuChiTiet}
 */
@Value
public class PhieuChiTietDto implements Serializable {
    Long id;
    VatTuDto vatTu;
    Long soLuong;
    BigDecimal donGia;
    BigDecimal thanhTien;
    PhieuDto phieu;

}