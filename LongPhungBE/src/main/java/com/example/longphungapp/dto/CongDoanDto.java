package com.example.longphungapp.dto;

import com.example.longphungapp.entity.CongDoan;
import com.example.longphungapp.fileEnum.BoPhan;
import com.example.longphungapp.fileEnum.TacVu;
import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * DTO for {@link CongDoan}
 */
@Data
public class CongDoanDto implements Serializable {
    Integer id;
    String tenCongDoan;
    private Integer thuTu;
    private BigDecimal giaMuaNguyenLieu;
    private BigDecimal khauHaoMay;
    private BigDecimal congNV;
    private Double heSoThuMua;
    private Double heSoTienCong;
    private BoPhan boPhan;
    private TacVu tacVu;


}