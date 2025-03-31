package com.example.longphungapp.dto;

import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link com.example.longphungapp.entity.Kho}
 */
@Value
public class KhoDto implements Serializable {
    Long maKho;
    String tenKho;
    String sdt;
    String diaChi;
    DVVCDto dVVC;
}