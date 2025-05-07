package com.example.longphungapp.service;

import com.example.longphungapp.Exception.BadReqException;
import com.example.longphungapp.Interface.MapperInterface;
import com.example.longphungapp.dto.ThongBaoDto;
import com.example.longphungapp.entity.ThongBao;
import com.example.longphungapp.repository.ThongBaoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@RequiredArgsConstructor
@Service
public class ThongBaoService {
    private final ThongBaoRepository thongBaoRepository;

    public List<ThongBao> getAll(){

        LocalDate today = LocalDate.now();
        LocalDate startOfDay = today.atStartOfDay().toLocalDate();
        LocalDate endOfDay = today.plusDays(1).atStartOfDay().toLocalDate();
        return thongBaoRepository.findByTimeBetween(startOfDay,endOfDay);
    }

    public ThongBaoDto createThongBao(ThongBaoDto thongBaoDto){
        var entity = MapperInterface.MAPPER.toEntity(thongBaoDto);
        var savedEntity = thongBaoRepository.save(entity);
        return MapperInterface.MAPPER.toDto(savedEntity);
    }

    public void deleteThongBao(Long id){
        var found = thongBaoRepository.findById(id).orElseThrow(()->new BadReqException("Thông báo không tồn tại"));
        thongBaoRepository.delete(found);
    }


}
