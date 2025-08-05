package com.example.longphungapp.dto;

import lombok.Value;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * DTO for {@link com.example.longphungapp.entity.PhanCongCongViec}
 */
@Value
public class PhanCongCongViecDto implements Serializable {
    Long id;
    CongViecCTDto congViecCT;
    NhanVienDto nguoiGiao;
    NhanVienDto nguoiNhan;
    LocalDateTime thoiGian;
}