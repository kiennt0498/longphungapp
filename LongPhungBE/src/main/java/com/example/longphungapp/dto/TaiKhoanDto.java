package com.example.longphungapp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link com.example.longphungapp.entity.TaiKhoan}
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaiKhoanDto implements Serializable {
    String sdt;
    String matKhau;
}