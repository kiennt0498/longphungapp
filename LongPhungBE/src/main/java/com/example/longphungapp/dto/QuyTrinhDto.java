package com.example.longphungapp.dto;


import com.example.longphungapp.entity.QuyTrinh;
import lombok.Data;
import lombok.Value;

import java.io.Serializable;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;


@Data
public class QuyTrinhDto implements Serializable {
    Long id;
    String tenQuyTrinh;
    NhanVienDto nhanVienQL;
    Set<CongDoanDto> congDoans;


}