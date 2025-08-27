package com.example.longphungapp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaoDonDTO {
    DonHangDto don;
   List<DonHangCTDto> donCT;
}
