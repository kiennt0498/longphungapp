package com.example.longphungapp.dto;

import lombok.Data;
import lombok.Value;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

/**
 * DTO for {@link com.example.longphungapp.entity.ThongBao}
 */
@Data
public class ThongBaoDto implements Serializable {
    Long id;
    NhanVienDto nguoiGui;
    String noiDung;
    LocalDateTime time;
}