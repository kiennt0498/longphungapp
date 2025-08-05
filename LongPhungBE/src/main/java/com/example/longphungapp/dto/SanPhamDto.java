package com.example.longphungapp.dto;

import com.example.longphungapp.fileEnum.KieuMau;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Value;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

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
    HinhDangDto hinhDang;
    BigDecimal gia;
    String maVach;
    private Double heSoThuMua;
    private List<NguyenVatLieuDto> nguyenVatLieus ;
    private QuyTrinhDto quyTrinh;
    private List<LoiNhuanDto> loiNhuan ;


}