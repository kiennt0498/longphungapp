package com.example.longphungapp.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class GiaThuMuaDto {
    BigDecimal donGia;
    BigDecimal phiVC;
    String maNV;
    Long donThuMua;
    Long id;
}
