package com.example.longphungapp.dto;

import com.example.longphungapp.entity.CongDoan;
import com.example.longphungapp.fileEnum.BoPhan;
import lombok.Data;

import java.io.Serializable;

/**
 * DTO for {@link CongDoan}
 */
@Data
public class CongDoanDto implements Serializable {
    Integer id;
    String tenCongDoan;


}