package com.example.longphungapp.dto;

import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link com.example.longphungapp.entity.Khu}
 */
@Value
public class KhuDto implements Serializable {
    Integer id;
    String ten;
}