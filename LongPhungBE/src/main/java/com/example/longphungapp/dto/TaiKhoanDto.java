package com.example.longphungapp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaiKhoanDto implements Serializable {
    String sdt;
    String matKhau;


}