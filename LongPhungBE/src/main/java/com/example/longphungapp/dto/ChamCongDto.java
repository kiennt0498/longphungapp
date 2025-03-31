package com.example.longphungapp.dto;

import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link com.example.longphungapp.entity.ChamCong}
 */
@Value
public class ChamCongDto implements Serializable {
    Long id;
    NhanVienDto nhanVien;
    CongViecCTDto congViecCT;
}