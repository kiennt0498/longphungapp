package com.example.longphungapp.dto;

import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link com.example.longphungapp.entity.Xuong}
 */
@Value
public class XuongDto implements Serializable {
    Integer id;
    String tenXuong;
}