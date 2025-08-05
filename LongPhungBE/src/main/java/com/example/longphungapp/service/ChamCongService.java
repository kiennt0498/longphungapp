package com.example.longphungapp.service;

import com.example.longphungapp.entity.ChamCong;
import com.example.longphungapp.fileEnum.TrangThai;
import com.example.longphungapp.repository.ChamCongRepository;
import com.example.longphungapp.repository.LichSuCVRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ChamCongService {
    private final LichSuCVRepository lichSuCVRepository;
    private final ChamCongRepository chamCongRepository;


    public List<Object[]> getKpiTheoThang(String thang) {
        System.out.println("pt thang: " + thang);
        YearMonth ym = YearMonth.parse(thang); // yyyy-MM
        LocalDate startDate = ym.atDay(1);
        LocalDate endDate = ym.atEndOfMonth();

        return chamCongRepository.findKpiRawByThang(startDate, endDate);
    }

    public List<Object[]> getLoiNhuanDoanhThu(String thang){
        YearMonth ym = YearMonth.parse(thang);
        LocalDate startDate = ym.atDay(1);
        LocalDate endDate = ym.atEndOfMonth();
        return chamCongRepository.getLoiNhuanDoanhThu(startDate, endDate);
    }

}
