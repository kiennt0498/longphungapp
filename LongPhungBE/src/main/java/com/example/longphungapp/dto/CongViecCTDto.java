package com.example.longphungapp.dto;

import com.example.longphungapp.fileEnum.TrangThai;
import lombok.Data;
import lombok.Value;

import java.io.Serializable;
import java.util.Date;

/**
 * DTO for {@link com.example.longphungapp.entity.CongViecCT}
 */
@Data
public class CongViecCTDto implements Serializable {
    Long id;
    CongDoanDto congDoan;
    Boolean kpi;
    Date ngayNhan;
    Date ngayGiao;
    DonHangCTDto donHangCT;
    NhanVienDto nhanVien;

    private TrangThai trangThai;

}