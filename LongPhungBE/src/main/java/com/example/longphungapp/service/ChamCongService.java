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
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ChamCongService {
    private final LichSuCVRepository lichSuCVRepository;

    public BigDecimal tinhKPI(String maNV, Integer thang, Integer nam) {
        // Nếu thang hoặc nam null → dùng thời gian hiện tại
        LocalDate now = LocalDate.now();
        int month = (thang != null) ? thang : now.getMonthValue();
        int year = (nam != null) ? nam : now.getYear();

        var list = lichSuCVRepository.findByMonthAndYear(maNV, month, year);
        var listHoanThanh = list.stream()
                .filter(i -> i.getTrangThai() == TrangThai.DA_GIAO);

        BigDecimal tongKPI = listHoanThanh
                .map(i -> i.getCongViecCT().getKpi())
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return tongKPI;
    }
}
