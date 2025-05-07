package com.example.longphungapp.dto;


import lombok.Data;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;


@Data
public class QuyTrinhDto implements Serializable {
    Long id;
    String tenQuyTrinh;
    NhanVienDto nhanVienQL;
    List<ListCongDoanReq> congDoans;


}