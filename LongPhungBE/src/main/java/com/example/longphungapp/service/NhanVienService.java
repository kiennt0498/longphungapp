package com.example.longphungapp.service;

import com.example.longphungapp.Exception.BadReqException;
import com.example.longphungapp.Interface.MapperInterface;
import com.example.longphungapp.dto.NhanVienDto;
import com.example.longphungapp.dto.ResLichSuDto;
import com.example.longphungapp.entity.*;
import com.example.longphungapp.repository.*;
import lombok.RequiredArgsConstructor;
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
@RequiredArgsConstructor
public class NhanVienService {


    @Autowired
    NhanVienRepository dao;
    @Autowired
    TaiKhoanRepository TKDao;
    private final BoPhanRepository boPhanRepository;
    private final KhuRepository khuRepository;
    private final XuongRepository xuongRepository;
    private final ChucVuRepository chucVuRepository;

    private final LichSuCVRepository lichSuCVRepository;


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

    public NhanVien findByTaiKhoan_Sdt(String sdt) {
        var found = dao.findByTaiKhoan_Sdt(sdt);
        if(found == null){
            throw new BadReqException("Không tìm thấy nhân viên");
        }
        return found;
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

        entity.setId(generateNextId(entity.getChucVu().getId()));



        TaiKhoan tk = new TaiKhoan(dto.getTaiKhoan().getSdt(),dto.getTaiKhoan().getSdt());

        TKDao.save(tk);

        entity.setTaiKhoan(tk);

        System.out.println(entity.getTaiKhoan().getSdt());

        var newEntity = dao.save(entity);

        var newDto = MapperInterface.MAPPER.toDto(newEntity);
        var tkDto = MapperInterface.MAPPER.toDto(entity.getTaiKhoan());
        newDto.setTaiKhoan(tkDto);

        return newDto;

    }

    private String generateNextId(Integer id) {
        // Lấy ID lớn nhất hiện tại dựa trên chức vụ
        String maNV = "";

        if(id == 5 ){
            maNV = "NV";
        }

        if(id == 2){
            maNV = "QLX";
        }
        if(id == 3){
            maNV = "QLK";
        }
        if(id == 4){
            maNV = "QLBP";
        }
        if(id ==1){
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

        return maNV + String.format("%03d", nextNumber);
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

    public List<NhanVien> findByBoPhan(Integer id) {
        return dao.findByBoPhan_Id(id);
    }

    public List<LichSuCV> getLichSu(ResLichSuDto dto){
        var list =lichSuCVRepository.findByNhanVien_IdAndNgayHoanThanhBetween(dto.getMaNV(),dto.getStart(),dto.getEnd());
        var newList = list.reversed();
        System.out.println(newList.size());
        return newList;
    }

    public List<BoPhan> getBoPhanAll(){
        return boPhanRepository.findAll();
    }

    public List<ChucVu> getChucVuAll(){
        return chucVuRepository.findAll();
    }

    public List<Xuong> getXuongAll(){
        return xuongRepository.findAll();
    }

    public List<Khu> getKhuAll(){
        return khuRepository.findAll();
    }

    public List<NhanVien> getNhanVienInPhieu(){
        var listBP = getBoPhanAll();
        var id = listBP.stream()
                .filter(i -> i.getTen().equalsIgnoreCase("In phiếu"))
                .findFirst()
                .map(BoPhan::getId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy bộ phận 'In phiếu'"));
        return dao.findByBoPhan_Id(id);
    }
}
