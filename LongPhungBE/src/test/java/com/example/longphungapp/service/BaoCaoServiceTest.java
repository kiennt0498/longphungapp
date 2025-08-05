package com.example.longphungapp.service;

import com.example.longphungapp.dto.BaoCaoSP;
import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
class BaoCaoServiceTest {
    @Autowired
    private BaoCaoService baoCaoService;

    @Test
    public void testGetBaoCaoSP() {
        var results = baoCaoService.getBaoCaoSP();

        for(BaoCaoSP row: results){
            System.out.println(row.getTenSP());
            System.out.println(row.getSoLuong());
            System.out.println(row.getDoanhThu());
            System.out.println(row.getGiaGoc());
            System.out.println(row.getLoiNhuan());
        }
    }
}