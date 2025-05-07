package com.example.longphungapp.dto;

import com.example.longphungapp.fileEnum.TrangThai;
import lombok.Data;
import lombok.Value;

import java.io.Serializable;
import java.util.Date;

@Data
public class LichSuCVDto implements Serializable {
    Long id;
    NhanVienDto nhanVien;
    CongViecCTDto congViecCT;
    Date ngayHoanThanh;
    TrangThai trangThai;
}