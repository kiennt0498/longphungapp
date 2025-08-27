package com.example.longphungapp.service;

import com.example.longphungapp.Exception.BadReqException;
import com.example.longphungapp.Interface.MapperInterface;
import com.example.longphungapp.entity.PhieuIn;
import com.example.longphungapp.dto.PhieuInDto;
import com.example.longphungapp.repository.DonHangCTRepository;
import com.example.longphungapp.repository.PhieuInRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PhieuInService {
    private final PhieuInRepository phieuInRepository;
    private final DonHangCTRepository donHangCTRepository;

    public List<PhieuIn> findAll() {
        return phieuInRepository.findAll();
    }

    @Transactional
    public PhieuIn savePhieu(PhieuInDto dto) {
        var entity = MapperInterface.MAPPER.toEntity(dto);
        var donct = entity.getDonHangCT();
        var phieu = entity.getPhieu();
        donct.setImages(phieu);
        donHangCTRepository.save(donct);
        return phieuInRepository.save(entity);
    }

    public void deletePhieu(Long id) {
        var found = phieuInRepository.findById(id).orElseThrow(()-> new BadReqException("Phieu not found"));
        phieuInRepository.delete(found);
    }

    public Optional<PhieuIn> findById(Long aLong) {
        return phieuInRepository.findById(aLong);
    }

    public List<PhieuIn> findByMaNhanVien(String maNV){
        return phieuInRepository.findByNguoiNhan_Id(maNV);
    }

    public List<PhieuIn> getListPhieuHT(String maNV){
        return phieuInRepository.findByDaGuiAndNguoiNhan_Id(true,maNV);
    }
}
