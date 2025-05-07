package com.example.longphungapp.dto;

import com.example.longphungapp.entity.QuyTrinhCongDoan;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * DTO for {@link QuyTrinhCongDoan}
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class QuyTrinhCongDoanDto implements Serializable {
    private Long id;
    private QuyTrinhDto quyTrinh;
    private CongDoanDto congDoan;
    private Integer thuTu;
}