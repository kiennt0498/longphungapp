package com.example.longphungapp.dto;

import com.example.longphungapp.fileEnum.TrangThai;
import lombok.Value;

import java.io.Serializable;
import java.util.Date;

/**
 * DTO for {@link com.example.longphungapp.entity.LichSuCV}
 */
@Value
public class LichSuCVDto implements Serializable {
    Long id;
    NhanVienDto nhanVien;
    CongViecCTDto congViecCT;
    Date ngayHoanThanh;
    TrangThai trangThai;
}