package com.example.longphungapp.service;

import com.example.longphungapp.Exception.BadReqException;
import com.example.longphungapp.Interface.MapperInterface;
import com.example.longphungapp.dto.*;
import com.example.longphungapp.entity.*;
import com.example.longphungapp.fileEnum.TacVu;
import com.example.longphungapp.fileEnum.TrangThai;
import com.example.longphungapp.repository.*;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DonHangService {
    private final DonHangRepository dao;
    private final DonHangCTRepository ctDao;
    private final CongViecCTRepository cvDao;
    private final KhachHangService khDao;
    private final LichSuDonHangRepository lichDao;
    private final DonHuyRepository dhDao;
    private final NhanVienRepository nvDao;
    private final LichSuCVRepository lichCvDao;
    private final CongViecService CVService;
    private final ImagesRepository imagesRepository;
    private final ImageService imageService;
    private final EntityManager entityManager;
    private final PhanPhoiDonHangRepository phanPhoiDao;
    private final CongViecService cvService;

    private Double kpiThietKe = 0.06;
    private BigDecimal kpiKinhDoanh = BigDecimal.valueOf(0.2);


    public List<DonHangDto> findAll() {
        var list = dao.findAll();
        if(list.isEmpty()){
             List<DonHangDto> listDto = new ArrayList<>();
             return listDto;
        }
        var listDto = list.stream().map(i->{
            var dto = new DonHangDto();
            BeanUtils.copyProperties(i, dto);
            var kh = new KhachHangDto();
            BeanUtils.copyProperties(i.getKhachHang(), kh);
            dto.setKhachHang(kh);
            return dto;
        }).toList();
        return listDto;
    }

    public void createDonAo(donAoDto dto) {

        var kh = new KhachHang();
        System.out.println("dto sdt" + dto.getSdt());
        var khFound = khDao.findBySdt(dto.getSdt());
        if(khFound == null){
            var khDto = new KhachHangDto();
            var nv = new NhanVien();
            nv.setId(dto.getMaNhanVien());
            khDto.setSdt(dto.getSdt());
            khDto.setTenKhachHang(dto.getTenKhachHang());
            var newKH = khDao.create(khDto);
            BeanUtils.copyProperties(newKH, kh);
        }else{
            BeanUtils.copyProperties(khFound, kh);
        }

        System.out.println(dto.getMaNhanVien());

        var nv = nvDao.findById(dto.getMaNhanVien())
                .orElseThrow(() -> new BadReqException("Không tìm thấy nhân viên với ID: " + dto.getMaNhanVien()));

        var donHang = new DonHang();
        var countD = dao.count();


        String maDH = String.valueOf(countD)+"."+kh.getId()+"."+dto.getMaNhanVien()+"."+kh.getSdt();

        donHang.setNhanVien(nv);
        donHang.setKhachHang(kh);
        donHang.setGia(dto.getGia());
        donHang.setMaDonHang(maDH);
        donHang.setTrangThai(TrangThai.CHO_THIET_KE);
        dao.save(donHang);

        var listDonCT = dto.getSanPhams().stream()
                .map(i->{
                    var donCT = new DonHangCT();
                    BeanUtils.copyProperties(i, donCT);
                    if(i.getImages() != null){
                        var image = new Images();
                        image.setId(i.getImages().getId());
                        donCT.setImages(image);
                    }
                    if(i.getHinhDang() != null){
                        var hd = new HinhDang();
                        hd.setId(i.getHinhDang().getId());
                        donCT.setHinhDang(hd);
                    }
                    var loai = new LoaiSp();
                    loai.setId(i.getLoaiSp().getId());
                    donCT.setLoaiSp(loai);
                    donCT.setDonHang(donHang);
                    donCT.setSoLuong(i.getSoLuong());
                    donCT.setNoiDungThietKe(i.getNoiDungThietKe());
                    donCT.setChieuDai(i.getChieuDai());
                    donCT.setChieuRong(i.getChieuRong());
                    donCT.setYeuCauDacBiet(i.getYeuCauDacBiet());
                    donCT.setTenSanPham(i.getTenSanPham());
                    donCT.setTrangThai(TrangThai.CHO_NHAN_DON);

                    ctDao.save(donCT);
                    return donCT;
                }).toList();

         listDonCT.stream().forEach(i->{
            var cv = new CongViecCT();
            cv.setDonHangCT(i);
            cv.setTrangThai(TrangThai.CHO_NHAN_DON);
            cv.setTacVu(TacVu.THIET_KE);
            if(dto.getThietKe()){
                cv.setNhanVien(nv);
            }
            cvDao.save(cv);
        });

    }

    public List<DonHangCTDto> getCT(Long id){
        var list = ctDao.findByDonHang_Id(id);
        if(list.isEmpty()){
            throw new BadReqException("Chưa có chi tiết đơn hàng");
        }
        var listDto = list.stream().map(i->{
            var dto = new DonHangCTDto();
            BeanUtils.copyProperties(i, dto);
            var sp = new SanPhamDto();
            BeanUtils.copyProperties(i.getSanPham(), sp);
            dto.setSanPham(sp);
            return dto;
        }).toList();
        return listDto;
    }
    @Transactional(rollbackFor = Exception.class)
    public List<DonHangCT> saveListDon(TaoDonDTO dto) {
        var kh = new KhachHang();
        if(dto.getDon().getKhachHang().getId() == null){
           var newDTO = khDao.create(dto.getDon().getKhachHang());
           BeanUtils.copyProperties(newDTO, kh);
        }else{
            var found = khDao.findByIdLike(dto.getDon().getKhachHang().getId());
            if(found.isEmpty()){
                throw new BadReqException("Không tìm thấy khách hàng");
            }
            BeanUtils.copyProperties(found.get(0), kh);
        }
        var nv = nvDao.findById(dto.getDon().getNhanVien().getId()).get();
        var donHang = new DonHang();
        var countD = dao.count();

        String maNV = dto.getDon().getNhanVien().getId();
        String maDH = String.valueOf(countD)+"."+kh.getId()+"."+maNV+"."+kh.getSdt();

        donHang.setNhanVien(nv);
        donHang.setKhachHang(kh);
        donHang.setGia(dto.getDon().getGia());
        donHang.setMaDonHang(maDH);
        donHang.setTrangThai(TrangThai.CHO_THIET_KE);
        dao.save(donHang);



        var listDonCT = dto.getDonCT().stream().map(i->{
            var donCT = new DonHangCT();
            BeanUtils.copyProperties(i, donCT);
            var sp = new SanPham();
            sp.setId(i.getSanPham().getId());
            sp.setTenSP(i.getSanPham().getTenSP());
            donCT.setSanPham(sp);
            donCT.setDonHang(donHang);
            donCT.setSoLuong(i.getSoLuong());
            donCT.setDonGia(i.getDonGia());
            donCT.setGiaGoc(i.getGiaGoc());
            donCT.setTrangThai(TrangThai.CHO_NHAN_DON);
            ctDao.save(donCT);
            return donCT;
        }).toList();

        listDonCT.stream().forEach(i->{
            var cv = new CongViecCT();
            var kpi = (i.getDonGia()
                    .subtract(i.getGiaGoc())
                    .multiply(BigDecimal.valueOf(i.getSoLuong()))
                    .multiply(BigDecimal.valueOf(kpiThietKe)));
            cv.setDonHangCT(i);
            cv.setKpi(kpi);
            cv.setTrangThai(TrangThai.CHO_NHAN_DON);
            cv.setTacVu(TacVu.THIET_KE);
            cvDao.save(cv);
        });

        return listDonCT;
    }

    public void deleteDonHang(DonHang entity) {
        dao.delete(entity);
    }

    public List<DonHangCTDto> findByDonHang_MaDonHang(String maDonHang) {
        var listEntity = ctDao.findByDonHang_MaDonHang(maDonHang);
        var listDto = listEntity.stream().map(i->{
            var dto = MapperInterface.MAPPER.toDto(i);
            return dto;
        }).toList();
        return listDto;
    }

    public List<DonHang> findByNhanVien_IdAndTrangThai(String id, TrangThai trangThai) {
        return dao.findByNhanVien_IdAndTrangThai(id, trangThai);
    }

    public List<DonHangCT> findByDonHang_NhanVien_IdAndTrangThai(String id, TrangThai trangThai) {
        return ctDao.findByDonHang_NhanVien_IdAndTrangThai(id, trangThai);
    }

    public List<DonHang> findDonHoanThanh(String id){
        var listLS = lichDao.findByNhanVien_Id(id);
        var list = listLS.stream().map(i->i.getDonHang()).toList();
        return list;
    }
    @Transactional(rollbackFor = Exception.class)
    public void huyDon(DonHuyDto dto){
        var found = dao.findById(dto.getId()).orElseThrow(()-> new BadReqException("Không tìm thấy đơn hàng"));
        found.setTrangThai(TrangThai.HUY);
        dao.save(found);

        var dh = new DonHuy();
        dh.setLydo(dto.getLyDo());
        dh.setDonHang(found);
        dhDao.save(dh);

        var foundLS = lichDao.findByDonHang_Id(found.getId());
        if(foundLS != null){
            lichDao.delete(foundLS);
        }

        var listDonCT = ctDao.findByDonHang_Id(found.getId());
        listDonCT.forEach(i->{
            i.setTrangThai(TrangThai.HUY);
            ctDao.save(i);
        });
        var listCV = cvDao.findByDonHangCT_DonHang_Id(found.getId());
        listCV.forEach(i->{

            i.setTrangThai(TrangThai.HUY);
            cvDao.save(i);
        });
        var lichSuCV = lichCvDao.findByCongViecCT_DonHangCT_DonHang(found);
        lichSuCV.forEach(i->{
            i.setTrangThai(TrangThai.HUY);
            lichCvDao.save(i);
        });

        findCongViec(found.getId());

    }

    public void findCongViec(Long donHangId){

        var listCVCanHoanTon = cvDao.findByDonHangCT_DonHang_IdAndTrangThaiIn(
                donHangId,
                List.of(TrangThai.CHO_NHAN_DON, TrangThai.DANG_SAN_XUAT)
        );

        boolean haiMat = false;
        if (!listCVCanHoanTon.isEmpty()) {
            var sp = listCVCanHoanTon.get(0).getDonHangCT().getSanPham();
            haiMat = sp.getQuyTrinh().getQuyTrinhCongDoans().stream()
                    .filter(cd -> cd.getCongDoan().getTenCongDoan().equalsIgnoreCase("ĐỔ KEO"))
                    .count() >= 2;
        }

        for (var cv : listCVCanHoanTon) {
            var currentCD = cv.getCongDoan();
            var thuTu = cv.getDonHangCT().getSanPham().getQuyTrinh()
                    .getQuyTrinhCongDoans().stream()
                    .filter(q -> q.getCongDoan().getId().equals(currentCD.getId()))
                    .findFirst().map(q -> q.getThuTu()).orElse(0);
            if (thuTu >= 2) {
                CVService.capNhatTonKho(cv, haiMat, true);
            }
        }
    }

    @Transactional(rollbackFor = Exception.class)
    public void chotDon(String maDonHang) {
        var found = dao.findByMaDonHang(maDonHang);
        if(found == null){
            throw new BadReqException("Không tìm thấy đơn hàng");
        }
        found.setNgayChotDon(new Date());
        found.setTrangThai(TrangThai.DA_GIAO);
        dao.save(found);

        var ls = new LichSuDonHang();
        ls.setDonHang(found);
        ls.setNhanVien(found.getNhanVien());
        ls.setTrangThai(TrangThai.DA_GIAO);
        lichDao.save(ls);

        var lsCV = new LichSuCV();
        var listDon = ctDao.findByDonHang_MaDonHang(maDonHang);
        var tongLoiNhuan = listDon.stream().map(i->i.getDonGia()
                .subtract(i.getGiaGoc()).multiply(BigDecimal.valueOf(i.getSoLuong())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        var kpi = tongLoiNhuan.multiply(kpiKinhDoanh);
        lsCV.setKpi(kpi);
        lsCV.setNgayHoanThanh(new Date());
        lsCV.setNhanVien(found.getNhanVien());
        lsCV.setTrangThai(TrangThai.DA_GIAO);
        lichCvDao.save(lsCV);
    }
    @Transactional
    public void setImage(Long id, Long imageId) {
        Images oldImage = null;
        try {
            var found = cvDao.findById(id)
                    .orElseThrow(() -> new BadReqException("không tìm thấy công việc"));

            DonHangCT ct = found.getDonHangCT();
            System.out.println("dhct: " + ct.getId());

            // Lưu lại ảnh cũ nếu có
            if (ct.getImages() != null && !ct.getImages().getId().equals(imageId)) {
                oldImage = ct.getImages();
            }

            // Gán ảnh mới
            Images image = imagesRepository.findById(imageId)
                    .orElseThrow(() -> new BadReqException("không tìm thấy ảnh"));

            ct.setImages(image);
            ctDao.save(ct);

            // BẮT BUỘC flush để đảm bảo update vào DB xong
            entityManager.flush();

            // Sau khi flush xong, mới xóa ảnh cũ

            if (oldImage != null) {
                imageService.deleteImageFile(oldImage.getTenTep());
                imagesRepository.delete(oldImage);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

    }
    @Transactional
    public void setDonHang(Long id, TrangThai trangThai, Boolean isCT) {
        DonHang found;

        if (isCT) {
            found = dao.findByDonHangCT_Id(id);
            if (found == null) {
                throw new BadReqException("Không tìm thấy đơn hàng");
            }

            var listChuaGiao = ctDao.findByDonHang_Id(found.getId()).stream()
                    .filter(i -> i.getTrangThai() != TrangThai.DA_GIAO)
                    .toList();

            // Nếu còn chi tiết chưa giao => không cập nhật trạng thái
            if (!listChuaGiao.isEmpty()) return;

        } else {
            found = dao.findById(id)
                    .orElseThrow(() -> new BadReqException("Không tìm thấy đơn hàng"));
        }

        found.setTrangThai(trangThai);
        dao.save(found);
    }


    @Transactional
    public void nhanDon(Long donHangId, String maNV) {
        var nhanVien = nvDao.findById(maNV)
                .orElseThrow(() -> new BadReqException("Không tìm thấy nhân viên"));
        var don = dao.findById(donHangId)
                .orElseThrow(() -> new BadReqException("Không tìm thấy đơn hàng"));

        var xuongNV = nhanVien.getXuong();
        var khuNV = nhanVien.getKhu();

        var phanPhoi = phanPhoiDao.findByDonHang_Id(donHangId);

        // Nếu chưa có phân phối ⇒ QL Xưởng nhận đơn
        if (phanPhoi == null) {
            if (xuongNV == null) {
                throw new BadReqException("Bạn không thuộc xưởng nào để nhận đơn");
            }

            phanPhoi = new PhanPhoiDonHang();
            phanPhoi.setDonHang(don);
            phanPhoi.setXuong(xuongNV);
            phanPhoi.setNguoiNhan(nhanVien); // người nhận đầu tiên
            phanPhoiDao.save(phanPhoi);
            setDonHang(don.getId(), TrangThai.CHO_SAN_XUAT,false);
            return;
        }

        if(phanPhoi.getXuong() == null){
            phanPhoi.setXuong(xuongNV);
            setDonHang(don.getId(), TrangThai.CHO_SAN_XUAT,false);
            phanPhoiDao.save(phanPhoi);
            return;
        }

        // Nếu đã có xưởng ⇒ QL Khu nhận
        if (phanPhoi.getKhu() != null) {
            throw new BadReqException("Đơn này đã được nhận bởi khu khác");
        }

        if (khuNV == null || xuongNV == null) {
            throw new BadReqException("Bạn không đủ thông tin khu/xưởng để nhận đơn");
        }

        // Ràng buộc đúng xưởng
        if (!phanPhoi.getXuong().getId().equals(xuongNV.getId())) {
            throw new BadReqException("Bạn không thuộc xưởng được phân phối đơn này");
        }

        // Nhận đơn khu
        phanPhoi.setKhu(khuNV);
        phanPhoi.setNguoiNhan(nhanVien);
        phanPhoiDao.save(phanPhoi);
        setDonHang(donHangId, TrangThai.DANG_SAN_XUAT,false);

        // Tạo công việc đầu tiên cho đơn chi tiết
        var listDCT = ctDao.findByDonHang_Id(donHangId);
        listDCT.forEach(dct -> {
            if (dct.getSoLuong() > 500) {
                dct.setTrangThai(TrangThai.CHO_XAC_NHAN_CHIA);
                ctDao.save(dct);

            } else {
                cvService.createFistJobs(dct.getId());
            }
        });
    }

    public List<DonHang> getDonXuongNhan(String maNV){
        var nhanVien = nvDao.findById(maNV).orElseThrow(()->new BadReqException("Không tìm thấy nhân viên"));
        var xuong = nhanVien.getXuong();
        return dao.findBy_Xuong(xuong);

    }

    public List<DonHang> getDonKhuNhan(String maNV){
        var nhanVien = nvDao.findById(maNV).orElseThrow(()->new BadReqException("Không tìm thấy nhân viên"));
        var xuong = nhanVien.getXuong();
        var khu = nhanVien.getKhu();
        if(khu == null) return List.of();
        return dao.findBy_XuongAndKhu(xuong,khu);

    }

    public Integer getXuong(String maNV){
        var nhanVien =  nvDao.findById(maNV).orElseThrow(()->new BadReqException("Không tìm thấy nhân viên"));
        var xuong = nhanVien.getXuong().getId();
        return xuong;
    }

    public String getKhu(String maNV){
        var nhanVien = nvDao.findById(maNV).orElseThrow(()->new BadReqException("Không tìm thấy nhân viên"));
        var xuong = nhanVien.getXuong().getId();
        var khuNV = nhanVien.getKhu();
        if(khuNV == null) return null;
        var khu = khuNV.getId();
        return xuong+"-"+khu;
    }

    public List<DonHangCT> getListDonChia(String maNV){
        var nhanVien = nvDao.findById(maNV).get();
        var xuong = nhanVien.getXuong().getId();
        var khu = nhanVien.getKhu();
        if(khu == null) return List.of();
        var khuVuc = khu.getId();
        return ctDao.findDonHangCTCanChiaByKhuXuong(khuVuc, xuong);
    }

    public List<DonHang> getDonXuongHT(Integer xuongId){
        return dao.findByXuong_Id(xuongId);
    }


    public String getLyDoHuy(Long id){
        return dhDao.findByDonHang_Id(id).getLydo();
    }

    public List<DonHang> findByTrangThai(TrangThai trangThai) {
        return dao.findByTrangThai(trangThai);
    }

    @Transactional
    public void chiaDon(Long id, Integer soPhan) {
        if (soPhan == null || soPhan <= 1) {
            throw new BadReqException("Số phần chia phải lớn hơn 1");
        }

        DonHangCT goc = ctDao.findById(id)
                .orElseThrow(() -> new BadReqException("Không tìm thấy chi tiết đơn hàng"));

        int tong = goc.getSoLuong();
        int moi = tong / soPhan;
        int du = tong % soPhan;

        for (int i = 0; i < soPhan - 1; i++) {
            DonHangCT clone = new DonHangCT();
            clone.setDonHang(goc.getDonHang());
            clone.setSoLuong(moi); // mỗi phần bằng nhau
            clone.setTrangThai(TrangThai.CHO_SAN_XUAT);
            clone.setSanPham(goc.getSanPham());
            clone.setDonGia(goc.getDonGia());
            clone.setGiaGoc(goc.getGiaGoc());
            clone.setChieuDai(goc.getChieuDai());
            clone.setChieuRong(goc.getChieuRong());
            clone.setNoiDungThietKe(goc.getNoiDungThietKe());
            clone.setTenSanPham(goc.getTenSanPham());
            clone.setYeuCauDacBiet(goc.getYeuCauDacBiet());

            clone.setImages(goc.getImages());

            ctDao.save(clone);
            cvService.createFistJobs(clone.getId());
        }

        // Cập nhật lại đơn gốc
        int soLuongConLai = moi + du; // phần cuối giữ lại
        goc.setSoLuong(soLuongConLai);
        goc.setTrangThai(TrangThai.CHO_SAN_XUAT);
        ctDao.save(goc);

        // Tạo công việc cho đơn gốc
        cvService.createFistJobs(goc.getId());
    }

    public List<PhanPhoiDonHang> getDonDaPP(Integer xuongId) {
        var list = phanPhoiDao.findByXuong_IdAndKhu_IdNotNull(xuongId);
        System.out.println("List PP side: "+ list.size());
        return list;
    }

    public void HoanDonKhu(Long id) {
        var found = phanPhoiDao.findByDonHang_Id(id);
        if(found == null) return;
        found.setKhu(null);
        var donHang = found.getDonHang();
        donHang.setTrangThai(TrangThai.CHO_SAN_XUAT);
        dao.save(donHang);
        phanPhoiDao.save(found);
    }

    public void HoanDonXuong(Long id) {
        var found = phanPhoiDao.findByDonHang_Id(id);
        if(found == null) return;
        found.setXuong(null);
        var donHang = found.getDonHang();
        donHang.setTrangThai(TrangThai.CHO_NHAN_DON);
        dao.save(donHang);
        phanPhoiDao.save(found);
    }
}
