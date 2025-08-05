package com.example.longphungapp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Value;

import java.io.Serializable;
import java.util.List;
import java.util.Set;

/**
 * DTO for {@link com.example.longphungapp.entity.KhachHang}
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class KhachHangDto implements Serializable {
    String id;
    String tenKhachHang;
    String sdt;
    private String diaChi;
}