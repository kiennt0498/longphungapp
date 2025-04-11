package com.example.longphungapp.service;

import com.example.longphungapp.Exception.BadReqException;
import com.example.longphungapp.Interface.MapperInterface;
import com.example.longphungapp.dto.NhanVienDto;
import com.example.longphungapp.entity.NhanVien;
import com.example.longphungapp.entity.TaiKhoan;
import com.example.longphungapp.fileEnum.BoPhan;
import com.example.longphungapp.fileEnum.ChucVu;
import com.example.longphungapp.repository.NhanVienRepository;
import com.example.longphungapp.repository.TaiKhoanRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;


@Service
public class NhanVienService {


    @Autowired
    NhanVienRepository dao;
    @Autowired
    TaiKhoanRepository TKDao;


    public List<NhanVien> findAll() {
        return dao.findAll();
    }

    public NhanVienDto findById(String aLong) {
        var found = dao.findById(aLong).orElseThrow(()-> new BadReqException("Không tìm thấy nhân viên"));
        var dto = MapperInterface.MAPPER.toDto(found);
        var tkDto = MapperInterface.MAPPER.toDto(found.getTaiKhoan());
        dto.setTaiKhoan(tkDto);

        return dto;
    }
    @Transactional(rollbackFor = Exception.class)
    public void delete(String id) {
        var entity = dao.findById(id).orElseThrow(()->new BadReqException("Không tìm thấy nhân viên"));
        TKDao.delete(entity.getTaiKhoan());
        dao.delete(entity);
    }
    @Transactional(rollbackFor = Exception.class)
    public NhanVienDto save(NhanVienDto dto) {
        var found = dao.findByTaiKhoan_Sdt(dto.getTaiKhoan().getSdt());
        if(found != null ){
            throw new BadReqException("Nhân viên đã tồn tại");
        }

        var entity = MapperInterface.MAPPER.toEntity(dto);

        entity.setId(generateNextId(entity.getChucVu()));

        TaiKhoan tk = new TaiKhoan(dto.getTaiKhoan().getSdt(),"a123");

        TKDao.save(tk);

        entity.setTaiKhoan(tk);

        System.out.println(entity.getTaiKhoan().getSdt());

        var newEntity = dao.save(entity);

        var newDto = MapperInterface.MAPPER.toDto(newEntity);
        var tkDto = MapperInterface.MAPPER.toDto(entity.getTaiKhoan());
        newDto.setTaiKhoan(tkDto);

        return newDto;

    }

    private String generateNextId(ChucVu chucVu) {
        // Lấy ID lớn nhất hiện tại dựa trên chức vụ
        String prefix = chucVu.name();
        String maNV = "";

        if(prefix.matches("NHAN_VIEN")){
            maNV = "NV";
        }
        if(prefix.matches("TRUONG_PHONG")){
            maNV = "TP";
        }
        if(prefix.matches("QUAN_LY")){
            maNV = "QL";
        }
        if(prefix.matches("ADMIN")){
            maNV = "AD";
        }


        String lastId = dao.findMaxIdByChucVu(maNV); // Tìm ID lớn nhất hiện tại trong DB

        int nextNumber = 1; // Mặc định nếu không có nhân viên nào
        if (lastId != null && lastId.startsWith(maNV)) {
            String numberPart = lastId.replace(maNV, ""); // Tách số từ ID
            try {
                nextNumber = Integer.parseInt(numberPart) + 1; // Tăng số lên
            } catch (NumberFormatException e) {
                throw new RuntimeException("Lỗi phân tích ID: " + lastId);
            }
        }

        return maNV + String.format("%05d", nextNumber);
    }

    @Transactional(rollbackFor = Exception.class)
    public NhanVienDto update(NhanVienDto dto){
        var found = dao.findById(dto.getId()).orElseThrow(()-> new BadReqException("Không tìm thấy nhân viên"));

        BeanUtils.copyProperties(dto,found);
       dao.save(found);

        return dto;
    }

    @Transactional(rollbackFor = Exception.class)
    public List<NhanVienDto> saveAll(List<NhanVienDto> list) {

        Set<String> existingPhones = new HashSet<>(dao.findAllSdt());

        List<NhanVienDto> newList = list.stream()
                .filter(i -> i.getTaiKhoan() != null)
                .filter(i -> !existingPhones.contains(i.getTaiKhoan().getSdt()))
                .collect(Collectors.toList());

        return newList.stream().map(this::save).collect(Collectors.toList());
    }

    public void delete(NhanVien entity) {
        dao.delete(entity);
    }

    public List<NhanVien> findByIdContains(String id) {
        return dao.findByIdContains(id);
    }

    public List<NhanVien> findByHoTenContains(String hoTen) {
        return dao.findByHoTenContains(hoTen);
    }

    public List<NhanVien> findByTaiKhoan_SdtContains(String sdt) {
        return dao.findByTaiKhoan_SdtContains(sdt);
    }

    public List<NhanVien> findByBoPhan(BoPhan bp) {
        return dao.findByBoPhan(bp);
    }
}
