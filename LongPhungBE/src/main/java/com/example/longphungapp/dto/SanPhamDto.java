package com.example.longphungapp.dto;

import com.example.longphungapp.fileEnum.KieuMau;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Value;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * DTO for {@link com.example.longphungapp.entity.SanPham}
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SanPhamDto implements Serializable {
    Long id;
    String tenSP;
    DoViTinhDto doViTinh;
    LoaiSpDto loaiSp;
    private KieuMau kieuMau;
    private String mauVien;
    private String mauSP;
    ChatLieuDto chatLieu;
    HinhDangDto hinhDang;
    BigDecimal gia;
    String maVach;


}