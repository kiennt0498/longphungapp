package com.example.longphungapp.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class BaoCaoSP {
    private String tenSP;
    private Long soLuong;
    private BigDecimal doanhThu;
    private BigDecimal giaGoc;
    private BigDecimal loiNhuan;
}
