package com.example.longphungapp.dto;

import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link com.example.longphungapp.entity.DVVC}
 */
@Value
public class DVVCDto implements Serializable {
    Integer id;
    String tenDV;
    String sdt;
}