package com.example.longphungapp.dto;

import com.example.longphungapp.entity.Phieu;
import lombok.Value;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

/**
 * DTO for {@link Phieu}
 */
@Value
public class PhieuDto implements Serializable {
    Long id;
    KhoDto kho;
    Date ngayNhap;
    Date ngayXuat;
    NhanVienDto nguoiTao;
    BigDecimal tongGiaTri;
    List<PhieuChiTietDto> phieuChiTiets;
}