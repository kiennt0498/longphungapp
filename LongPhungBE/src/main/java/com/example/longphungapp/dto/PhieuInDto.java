package com.example.longphungapp.dto;

import com.example.longphungapp.entity.PhieuIn;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * DTO for {@link PhieuIn}
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PhieuInDto implements Serializable {
    Long id;
    NhanVienDto nguoiNhan;
    DonHangCTDto donHangCT;
    ImagesDto phieu;
}