package com.example.longphungapp.service;

import com.example.longphungapp.dto.BaoCaoSP;
import com.example.longphungapp.dto.VatTuXuatNhapDto;
import com.example.longphungapp.entity.DonHangCT;
import com.example.longphungapp.repository.DonHangCTRepository;
import com.example.longphungapp.repository.PhieuChiTietRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BaoCaoService {
    private final DonHangCTRepository donHangCTRepository;
    private final PhieuChiTietRepository phieuChiTietRepository;

    public List<BaoCaoSP> getBaoCaoSP(){
        List<Object[]> result = donHangCTRepository.getBaoCaoSP();
        var list = result.stream().map(row->{
                BaoCaoSP bc = new BaoCaoSP();
                bc.setTenSP ((String) row[0]);
                bc.setSoLuong ((Long) row[1]);
                bc.setDoanhThu ((BigDecimal) row[2]);
                bc.setGiaGoc ((BigDecimal) row[3]);
                bc.setLoiNhuan ((BigDecimal) row[4]);
                return bc;
        }).toList();
        return list;
    }

    public List<VatTuXuatNhapDto> getVatTuXuat(){
        List<Object[]> result = phieuChiTietRepository.thongKeXuat();
        var list = result.stream().map(row->{
            VatTuXuatNhapDto vatTu = new VatTuXuatNhapDto();
            vatTu.setTenVatTu((String) row[0]);
            vatTu.setSoLuong((Long) row[1]);
            vatTu.setThanhTien((BigDecimal) row[2]);
            vatTu.setDonGia((BigDecimal) row[3]);
            return vatTu;
        }).toList();
        return  list;
    }

    public List<VatTuXuatNhapDto> getVatTuNhap(){
        List<Object[]> result = phieuChiTietRepository.thongKeNhap();
        var list = result.stream().map(row->{
            VatTuXuatNhapDto vatTu = new VatTuXuatNhapDto();
            vatTu.setTenVatTu((String) row[0]);
            vatTu.setSoLuong((Long) row[1]);
            vatTu.setThanhTien((BigDecimal) row[2]);
            vatTu.setDonGia((BigDecimal) row[3]);
            return vatTu;
        }).toList();
        return  list;
    }
}
