package com.example.longphungapp.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Data
@Getter
@Setter
public class VatTuXuatNhapDto {
    private String tenVatTu;
    private Long soLuong;
    private BigDecimal donGia;
    private BigDecimal thanhTien;
}
