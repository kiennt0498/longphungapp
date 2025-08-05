package com.example.longphungapp.service;

import com.example.longphungapp.Exception.BadReqException;
import com.example.longphungapp.Interface.MapperInterface;
import com.example.longphungapp.dto.*;
import com.example.longphungapp.entity.*;
import com.example.longphungapp.fileEnum.LoaiVatTu;
import com.example.longphungapp.fileEnum.TacVu;
import com.example.longphungapp.fileEnum.TrangThai;
import com.example.longphungapp.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@RequiredArgsConstructor
@Service
public class VatTuService {

    private final VatTuRepository vatTuRepo;
    private final TonKhoRepository tonKhoRepo;
    private final DonThuMuaRepository donThuMuaRepo;
    private final ListGiaThuMuaRepository giaThuMuaRepo;
    private final NhanVienRepository nhanVienRepo;
    private final CongViecCTRepository congViecRepo;
    private final LichSuCVRepository lichSuRepo;
    private final ChatLieuRepository chatLieuRepo;
    private final ThongBaoDonHangService thongBaoDonHangService;

    private Double tam = 2880000.0;

    public List<DonThuMua> findAllTM(Boolean done) {
        return donThuMuaRepo.findByDone(done);
    }

    public List<VatTu> findAll() {
        return vatTuRepo.findAll();
    }

    @Transactional(rollbackFor = Exception.class)
    public VatTu updateVT(VatTuDto dto) {
        var existing = vatTuRepo.findById(dto.getId())
                .orElseThrow(() -> new BadReqException("Không tìm thấy vật tư"));
        var updated = MapperInterface.MAPPER.toEntity(dto);
        updated.setLoaiVatTu(existing.getLoaiVatTu());
        updated.setDoViTinh(existing.getDoViTinh());
        return vatTuRepo.save(updated);
    }

    public VatTu findById(Long id) {
        return vatTuRepo.findById(id)
                .orElseThrow(() -> new BadReqException("Không tìm thấy nguyên liệu"));
    }

    public void delete(Long id) {
        var vatTu = vatTuRepo.findById(id)
                .orElseThrow(() -> new BadReqException("Không tìm thấy nguyên liệu"));
        vatTuRepo.delete(vatTu);
    }

    public List<ListGiaThuMua> findByDonThuMua_Id(Long id) {
        return giaThuMuaRepo.findByDonThuMua_Id(id);
    }

    public DonThuMua findDonThuMuaById(Long id) {
        return donThuMuaRepo.findById(id)
                .orElseThrow(() -> new BadReqException("Không tìm thấy đơn thu mua"));
    }

    @Transactional(rollbackFor = Exception.class)
    public void saveAndUpdateDonThuMua(DonThuMuaDto dto) {
        if (dto.getId() != null) {
            updateExistingDonThuMua(dto);
        } else {
            createNewDonThuMua(dto);
        }
    }

    private void updateExistingDonThuMua(DonThuMuaDto dto) {
        var found = donThuMuaRepo.findById(dto.getId())
                .orElseThrow(() -> new BadReqException("Không tìm thấy đơn thu mua"));

        BeanUtils.copyProperties(dto, found);
        var cl = new ChatLieu(); cl.setId(dto.getChatLieu().getId());
        var dv = new DoViTinh(); dv.setId(dto.getDoViTinh().getId());
        var nv = new NhanVien(); nv.setId(dto.getNhanVienThuMua().getId());

        found.setChatLieu(cl);
        found.setDoViTinh(dv);
        found.setNhanVienThuMua(nv);

        // Giao công việc
        var kpi = dto.getSoLuong() > 100 ? dto.getSoLuong() : dto.getSoLuong() > 50 ? 100 : 50;
        var cv = new CongViecCT();
        cv.setTacVu(TacVu.THU_MUA);
        cv.setTrangThai(TrangThai.DA_GIAO);
        cv.setKpi(BigDecimal.valueOf(kpi));
        congViecRepo.save(cv);

        var lichSu = new LichSuCV();
        lichSu.setCongViecCT(cv);
        lichSu.setKpi(BigDecimal.valueOf(kpi));
        lichSu.setTrangThai(TrangThai.DA_GIAO);
        lichSu.setNhanVien(nv);
        lichSu.setNgayHoanThanh(new Date());
        lichSuRepo.save(lichSu);

        // Lưu vật tư
        var vatTu = new VatTu();
        vatTu.setChatLieu(cl);
        vatTu.setDoViTinh(dv);
        vatTu.setGiaNhap(dto.getGiaThuMua());
        vatTu.setTen(dto.getTenNguyenLieu());
        vatTu.setLoaiVatTu(LoaiVatTu.valueOf(dto.getLoai()));
        vatTu.setHeSoBu(0D);
        var vtSaved = vatTuRepo.save(vatTu);
        found.setVatTu(vtSaved);

        // Lưu tồn kho
        var tonKho = new TonKho();
        var kho = new Kho(); kho.setMaKho(1L);
        tonKho.setVatTu(vtSaved);
        tonKho.setSoLuong(dto.getSoLuong());
        tonKho.setGiaTriTonKho(BigDecimal.valueOf(dto.getSoLuong()).multiply(dto.getGiaThuMua()));
        tonKho.setKho(kho);

        Double kichThuoc = (double) 0;
        if(vatTu.getDoViTinh().getId() == 4){
            kichThuoc = dto.getSoLuong() * tam;
        }
        if(vatTu.getDoViTinh().getId() == 5){
            var donVi = dto.getKichThuoc().replaceAll("[^\\d]", "");
            kichThuoc = dto.getSoLuong() * Double.parseDouble(donVi);
        }
        tonKho.setKichThuoc(kichThuoc);
        tonKhoRepo.save(tonKho);

        donThuMuaRepo.save(found);
    }

    private void createNewDonThuMua(DonThuMuaDto dto) {
        var entity = new DonThuMua();
        BeanUtils.copyProperties(dto, entity);
        var cl = new ChatLieu(); cl.setId(dto.getChatLieu().getId());
        var dv = new DoViTinh(); dv.setId(dto.getDoViTinh().getId());
        var nv = new NhanVien(); nv.setId(dto.getNguoiLenDon().getId());

        entity.setChatLieu(cl);
        entity.setDoViTinh(dv);
        entity.setNguoiLenDon(nv);

        donThuMuaRepo.save(entity);
    }

    @Transactional(rollbackFor = Exception.class)
    public void huyDon(Long id) {
        var entity = donThuMuaRepo.findById(id)
                .orElseThrow(() -> new BadReqException("Không tìm thấy đơn thu mua"));
        donThuMuaRepo.delete(entity);
    }

    public void setGiaThuMua(GiaThuMuaDto dto) {
        if (dto.getId() != null) {
            var gia = giaThuMuaRepo.findById(dto.getId())
                    .orElseThrow(() -> new BadReqException("Không tìm thấy giá thu mua"));
            BeanUtils.copyProperties(dto, gia);
            giaThuMuaRepo.save(gia);
            return;
        }

        var don = donThuMuaRepo.findById(dto.getDonThuMua())
                .orElseThrow(() -> new BadReqException("Không tìm thấy đơn thu mua"));
        var nv = nhanVienRepo.findById(dto.getMaNV())
                .orElseThrow(() -> new BadReqException("Không tìm thấy nhân viên"));

        var gia = new ListGiaThuMua();
        gia.setDonGia(dto.getDonGia());
        gia.setPhiVC(dto.getPhiVC());
        gia.setDonThuMua(don);
        gia.setNhanVien(nv);
        gia.setTong(dto.getDonGia().multiply(BigDecimal.valueOf(don.getSoLuong())).add(dto.getPhiVC()));

        giaThuMuaRepo.save(gia);
    }

    @Transactional(rollbackFor = Exception.class)
    public void AutoChotGia() {
        var danhSach = donThuMuaRepo.findDonThuMuaHetHanChuaChot();

        for (DonThuMua don : danhSach) {
            var giaMin = giaThuMuaRepo.findGiaThapNhat(don.getId());
            if (giaMin == null) {
                throw new BadReqException("Không có người báo giá");
            }
            don.setGiaThuMua(giaMin.getDonGia());
            don.setPhiVanChuyen(giaMin.getPhiVC());
            don.setDone(true);
            donThuMuaRepo.save(don);
        }

        thongBaoDonHangService.guiThongBaoCapNhatDonHang(false, findAllTM(false));
        thongBaoDonHangService.guiThongBaoCapNhatDonHang(true, findAllTM(true));
    }

    public List<EnumDto> getListLoai() {
        return LoaiVatTu.cache;
    }

    public List<ChatLieu> getChatLieus() {
        return chatLieuRepo.findAll();
    }

    public DonThuMua getDon(Long id) {
        return donThuMuaRepo.findById(id)
                .orElseThrow(() -> new BadReqException("Không tìm thấy đơn thu mua"));
    }

    public DonThuMua getDonByIdVT(Long id) {
        var list = donThuMuaRepo.findByVatTu_Id(id);
        if (list.isEmpty()) {
            throw new BadReqException("Không tìm thấy đơn thu mua");
        }
        return list.get(0);
    }
}
