package com.example.longphungapp.dto;

import lombok.Data;
import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link com.example.longphungapp.entity.LoaiSp}
 */
@Data
public class LoaiSpDto implements Serializable {
    Integer id;
    String ten;

}