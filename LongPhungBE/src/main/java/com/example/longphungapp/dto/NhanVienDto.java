package com.example.longphungapp.dto;

import com.example.longphungapp.entity.NhanVien;
import lombok.Data;
import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link NhanVien}
 */
@Data
public class NhanVienDto implements Serializable {
    String id;
    String hoTen;
    ChucVuDto chucVu;
    BoPhanDto boPhan;
    KhuDto khu;
    XuongDto xuong;
    TaiKhoanDto taiKhoan;
}