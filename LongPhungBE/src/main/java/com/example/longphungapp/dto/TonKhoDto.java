package com.example.longphungapp.dto;

import com.example.longphungapp.entity.TonKho;
import lombok.Value;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * DTO for {@link TonKho}
 */
@Value
public class TonKhoDto implements Serializable {
    Long id;
    KhoDto kho;
    VatTuDto vatTu;
    Long soLuong;
    BigDecimal donGia;
    BigDecimal giaTriTonKho;
}