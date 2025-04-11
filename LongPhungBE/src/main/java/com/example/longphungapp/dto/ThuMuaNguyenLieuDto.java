package com.example.longphungapp.dto;

import com.example.longphungapp.entity.ThuMuaNguyenLieu;
import com.example.longphungapp.fileEnum.TrangThai;
import lombok.Data;
import lombok.Value;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalTime;

/**
 * DTO for {@link ThuMuaNguyenLieu}
 */
@Data
public class ThuMuaNguyenLieuDto implements Serializable {
    Long id;
    NguyenVatLieuDto nguyenVatLieu;
    NhanVienDto nhanVien;
    BigDecimal giaDeXuat;
    LocalTime thoiGian;
    TrangThai trangThai;
}