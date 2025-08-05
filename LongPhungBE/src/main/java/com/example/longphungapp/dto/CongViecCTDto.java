package com.example.longphungapp.dto;

import com.example.longphungapp.fileEnum.TacVu;
import com.example.longphungapp.fileEnum.TrangThai;
import lombok.Data;
import lombok.Value;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

/**
 * DTO for {@link com.example.longphungapp.entity.CongViecCT}
 */
@Data
public class CongViecCTDto implements Serializable {
    Long id;
    CongDoanDto congDoan;
    BigDecimal kpi;
    Date ngayNhan;
    Date ngayGiao;
    DonHangCTDto donHangCT;
    NhanVienDto nhanVien;
    TacVu tacVu;
    private TrangThai trangThai;


}