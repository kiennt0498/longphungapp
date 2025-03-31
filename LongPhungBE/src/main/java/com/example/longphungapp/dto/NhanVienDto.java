package com.example.longphungapp.dto;

import com.example.longphungapp.fileEnum.BoPhan;
import com.example.longphungapp.fileEnum.ChucVu;
import com.example.longphungapp.fileEnum.TacVu;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link com.example.longphungapp.entity.NhanVien}
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class NhanVienDto implements Serializable {
    String id;
    String hoTen;
    String diaChi;
    BoPhan boPhan;
    ChucVu chucVu;
    TacVu tacVu;
    TaiKhoanDto taiKhoan;
}