package com.example.longphungapp.dto;

import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link com.example.longphungapp.entity.DoViTinh}
 */
@Value
public class DoViTinhDto implements Serializable {
    Integer id;
    String ten;
}