package com.example.longphungapp.dto;


import com.example.longphungapp.fileEnum.TrangThai;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Value;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

/**
 * DTO for {@link com.example.longphungapp.entity.DonHang}
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DonHangDto implements Serializable {
    Long id;
    String maDonHang;
    Date ngayChotDon;
    Date ngayGiaoHang;
    KhachHangDto khachHang;
    private NhanVienDto nhanVien;
    BigDecimal gia;
    String diaChi;
    Double thue;
    TrangThai trangThai;


}