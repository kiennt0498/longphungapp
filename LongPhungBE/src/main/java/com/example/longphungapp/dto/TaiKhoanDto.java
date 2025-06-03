package com.example.longphungapp.dto;

import com.example.longphungapp.fileEnum.ChucVu;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Value;

import java.io.Serializable;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaiKhoanDto implements Serializable {
    String sdt;
    String matKhau;


}