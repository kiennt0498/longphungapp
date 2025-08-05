package com.example.longphungapp.dto;

import com.example.longphungapp.fileEnum.LoaiVatTu;
import lombok.Data;
import lombok.Value;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * DTO for {@link com.example.longphungapp.entity.VatTu}
 */
@Data
public class VatTuDto implements Serializable {
    Long id;
    String ten;
    BigDecimal giaNhap;
    ChatLieuDto chatLieu;
    Double heSoBu;
    LoaiVatTu loaiVatTu;
    DoViTinhDto doViTinh;
}