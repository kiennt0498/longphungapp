package com.example.longphungapp.dto;

import lombok.Value;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * DTO for {@link com.example.longphungapp.entity.PhanCongDonHang}
 */
@Value
public class PhanCongDonHangDto implements Serializable {
    Long id;
    DonHangDto donHang;
    NhanVienDto nguoiGiao;
    NhanVienDto nguoiNhan;
    LocalDateTime thoiGian;
}