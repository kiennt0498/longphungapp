package com.example.longphungapp.dto;

import lombok.Value;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * DTO for {@link com.example.longphungapp.entity.PhanPhoiDonHang}
 */
@Value
public class PhanPhoiDonHangDto implements Serializable {
    Long id;
    DonHangDto donHang;
    XuongDto xuong;
    KhuDto khu;
    NhanVienDto nguoiNhan;
    LocalDateTime ngayNhan;
    Boolean hoanThanh;

}