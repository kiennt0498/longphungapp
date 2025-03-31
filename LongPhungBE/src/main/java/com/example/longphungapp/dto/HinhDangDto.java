package com.example.longphungapp.dto;

import lombok.Data;
import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link com.example.longphungapp.entity.HinhDang}
 */
@Data
public class HinhDangDto implements Serializable {
    Integer id;
    String ten;
}