package com.example.longphungapp.dto;

import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link com.example.longphungapp.entity.ChucVu}
 */
@Value
public class ChucVuDto implements Serializable {
    Integer id;
    String ten;
}