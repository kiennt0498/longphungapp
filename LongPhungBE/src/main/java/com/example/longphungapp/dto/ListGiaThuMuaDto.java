package com.example.longphungapp.dto;

import com.example.longphungapp.entity.ListGiaThuMua;
import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * DTO for {@link ListGiaThuMua}
 */
@Data
public class ListGiaThuMuaDto implements Serializable {
    Long id;
    DonThuMuaDto donThuMua;
    NhanVienDto nhanVien;
    BigDecimal donGia;
    BigDecimal phiVC;
    BigDecimal tong;
}