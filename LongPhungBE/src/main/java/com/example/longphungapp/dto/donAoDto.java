package com.example.longphungapp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.relational.core.sql.In;

import java.math.BigDecimal;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class donAoDto {
    private String tenKhachHang;
    private String sdt;
    private String email;
    private String maNhanVien;
    private Integer hinhDang;
    private BigDecimal gia;
    private List<DonHangCTDto> sanPhams;
    private Boolean thietKe;
}
