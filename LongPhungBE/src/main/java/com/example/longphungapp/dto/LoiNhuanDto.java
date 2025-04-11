package com.example.longphungapp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * DTO for {@link com.example.longphungapp.entity.LoiNhuan}
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoiNhuanDto implements Serializable {
    private Long soLuong;
    private Double loiNhuan;
}