package com.example.longphungapp.service;

import com.example.longphungapp.Exception.BadReqException;
import com.example.longphungapp.Interface.MapperInterface;
import com.example.longphungapp.dto.PhieuDto;
import com.example.longphungapp.entity.NhanVien;
import com.example.longphungapp.entity.Phieu;
import com.example.longphungapp.entity.PhieuChiTiet;
import com.example.longphungapp.entity.TonKho;
import com.example.longphungapp.repository.PhieuChiTietRepository;
import com.example.longphungapp.repository.PhieuRepository;
import com.example.longphungapp.repository.TonKhoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class KhoService {
    private final TonKhoRepository tonKhoRepository;
    private final PhieuRepository phieuRepository;
    private final PhieuChiTietRepository phieuChiTietRepository;

    public List<TonKho> getAllKho() {
        return tonKhoRepository.findAll();
    }

    public List<Phieu> getAllPhieu(){
        return phieuRepository.findAll();

    }

    public void updateSL(long id, Long sl){
        var tonKho = tonKhoRepository.findById(id).orElseThrow(()-> new BadReqException("Không tìm thấy vật tư"));
        Long oldSL = tonKho.getSoLuong();
        if(oldSL == null){
            oldSL = 0L;
        }
        Long newSL = oldSL + sl;
        if(newSL < 0){
            throw new BadReqException("Số lượng xuất không hợp lệ");
        }
        tonKho.setSoLuong(newSL);
        tonKhoRepository.save(tonKho);
    }
    @Transactional(rollbackFor = Exception.class)
    public Phieu createPhieu(PhieuDto dto){
        var entity = MapperInterface.MAPPER.toEntity(dto);
        var nv= new NhanVien();
        nv.setId(dto.getNguoiTao().getId());
        entity.setNguoiTao(nv);
        var phieuBase = phieuRepository.save(entity);
        List<PhieuChiTiet> listPhieuCT = dto.getPhieuChiTiets()
                .stream()
                .map(i -> {
                    var phieuCT = MapperInterface.MAPPER.toEntity(i);
                    phieuCT.setPhieu(phieuBase);
                    return phieuChiTietRepository.save(phieuCT);
                }).collect(Collectors.toList());
        phieuBase.setPhieuChiTiets(listPhieuCT);
        listPhieuCT.forEach(i->{
            var tonKho = tonKhoRepository.findByVatTu_Id(i.getVatTu().getId());
            if(dto.getNgayNhap() == null){
                updateSL(tonKho.getId(), -i.getSoLuong());

            }else{
                updateSL(tonKho.getId(), i.getSoLuong());
            }
        });
        return phieuRepository.save(phieuBase);
    }

    public void deletePhieu(Long id){
        var phieu = phieuRepository.findById(id).orElseThrow(()-> new BadReqException("Không tìm thấy phiếu"));
        phieuChiTietRepository.deleteAll(phieu.getPhieuChiTiets());
        phieuRepository.delete(phieu);
    }

    public Map getTonKho(List<Long> list) {
        Map<Long, Double> listTK = new HashMap<>();
        System.out.println("list size: "+ list.size());
        list.forEach(i -> {
            var tonKho = tonKhoRepository.findByVatTu_Id(i);
            if(tonKho == null){
                return;
            }
            if(tonKho.getVatTu().getDoViTinh().getId() == 4 || tonKho.getVatTu().getDoViTinh().getId() == 5){
                listTK.put(tonKho.getVatTu().getId(), tonKho.getKichThuoc());
            }else{
                listTK.put(tonKho.getVatTu().getId(), tonKho.getSoLuong().doubleValue());
            }
        });
        return listTK;
    }
}
