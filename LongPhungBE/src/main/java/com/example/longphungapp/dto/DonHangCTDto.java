package com.example.longphungapp.dto;

import com.example.longphungapp.fileEnum.TrangThai;
import lombok.Data;
import lombok.Value;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * DTO for {@link com.example.longphungapp.entity.DonHangCT}
 */
@Data
public class DonHangCTDto implements Serializable {
    Long id;
    SanPhamDto sanPham;
    Integer soLuong;
    private Double chieuDai;
    private Double chieuRong;
    private String ghiChu;
    TrangThai trangThai;
    DonHangDto donHang;
    private ImagesDto images;
    private BigDecimal donGia;
    private BigDecimal giaGoc;
    private QuyTrinhDto quyTrinh;
    private String tenSanPham;
    private String yeuCauDacBiet;
    private String noiDungThietKe;


}