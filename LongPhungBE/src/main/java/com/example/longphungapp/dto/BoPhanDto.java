package com.example.longphungapp.dto;

import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link com.example.longphungapp.entity.BoPhan}
 */
@Value
public class BoPhanDto implements Serializable {
    Integer id;
    String ten;
}