package com.example.longphungapp.dto;

import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class NhanViecReq {
    private Long id;
    private String maNV;
    private List<ListChia> list;
    private Long file;
}
