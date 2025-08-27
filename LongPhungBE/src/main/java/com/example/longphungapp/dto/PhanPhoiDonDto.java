package com.example.longphungapp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PhanPhoiDonDto {
    private String maDonHang;
    private Integer xuong;
    private Integer khu;
}
