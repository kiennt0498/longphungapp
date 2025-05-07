package com.example.longphungapp.fileEnum;

import com.example.longphungapp.dto.EnumDto;

import java.util.List;
import java.util.stream.Stream;

public enum LoaiVatTu {
    NGUYEN_LIEU("Nguyên liệu")
    ,BAN_THANH_PHAM("Bán thành phẩm")
    , THANH_PHAM("Thành phẩm")
    , PHU_LIEU("Phụ liệu")
    , PHU_KIEN("Phụ kiện");

    private final String description;

    LoaiVatTu(String description) {
        this.description = description;
    }

    public static final List<EnumDto> cache = Stream.of(values())
            .map(i-> new EnumDto(i.name(), i.description))
            .toList();
}
