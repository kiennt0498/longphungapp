package com.example.longphungapp.dto;

import lombok.Data;
import lombok.Value;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * DTO for {@link com.example.longphungapp.entity.ChamCong}
 */
@Data
public class ChamCongDto implements Serializable {
    Long id;
    NhanVienDto nhanVien;
    LichSuCVDto lichSuCV;
    BigDecimal kpi;
    LocalDateTime ngayNhan;

}