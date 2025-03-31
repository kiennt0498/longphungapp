package com.example.longphungapp.dto;

import lombok.Data;

import java.io.Serializable;

/**
 * DTO for {@link com.example.longphungapp.entity.Images}
 */
@Data
public class ImagesDto implements Serializable {
    Long id;
    String tenAnh;
    String tenTep;
    String status;

}