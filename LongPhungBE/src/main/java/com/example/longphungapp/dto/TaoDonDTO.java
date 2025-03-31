package com.example.longphungapp.dto;

import lombok.Data;

import java.util.List;

@Data
public class TaoDonDTO {
    DonHangDto don;
   List<DonHangCTDto> donCT;
}
