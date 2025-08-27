package com.example.longphungapp.service;

import com.example.longphungapp.Exception.BadReqException;
import com.example.longphungapp.dto.DonHangCTDto;
import com.example.longphungapp.dto.SanPhamDto;
import com.example.longphungapp.entity.DonHang;
import com.example.longphungapp.entity.DonHangCT;
import com.example.longphungapp.entity.Images;
import com.example.longphungapp.entity.SanPham;
import com.example.longphungapp.fileEnum.TrangThai;
import com.example.longphungapp.repository.CongViecCTRepository;
import com.example.longphungapp.repository.DonHangCTRepository;
import com.example.longphungapp.repository.ImagesRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
class DonHangCTService {
    private final DonHangCTRepository ctDao;
    private final ImagesRepository imagesRepository;
    private final ImageService imageService;
    private final CongViecCTRepository cvDao;
    private final CongViecService cvService;

    public void createDonHangCTsFromDto(List<DonHangCTDto> items, DonHang donHang) {
        if (items == null || items.isEmpty()) return;
        for (var i : items) {
            var donCT = new DonHangCT();
            BeanUtils.copyProperties(i, donCT);
            if (i.getImages() != null) {
                var image = new Images();
                BeanUtils.copyProperties(i.getImages(), image);
                donCT.setImages(image);
            }
            var sp = new SanPham();
            sp.setId(i.getSanPham().getId());
            donCT.setSanPham(sp);
            donCT.setDonHang(donHang);
            donCT.setSoLuong(i.getSoLuong());
            donCT.setNoiDungThietKe(i.getNoiDungThietKe());
            donCT.setChieuDai(i.getChieuDai());
            donCT.setChieuRong(i.getChieuRong());
            donCT.setYeuCauDacBiet(i.getYeuCauDacBiet());
            donCT.setTenSanPham(i.getTenSanPham());
            donCT.setTrangThai(TrangThai.CHO_NHAN_DON);
            ctDao.save(donCT);
        }
    }

    public List<DonHangCTDto> getCTByDonId(Long id) {
        var list = ctDao.findByDonHang_Id(id);
        if (list.isEmpty()) throw new BadReqException("Chưa có chi tiết đơn hàng");
        return list.stream().map(i -> {
            var dto = new DonHangCTDto();
            BeanUtils.copyProperties(i, dto);
            var sp = new SanPhamDto();
            BeanUtils.copyProperties(i.getSanPham(), sp);
            dto.setSanPham(sp);
            return dto;
        }).toList();
    }

    public List<DonHangCT> createDonHangCTs(List<DonHangCTDto> dtos, DonHang donHang) {
        var res = dtos.stream().map(i -> {
            var donCT = new DonHangCT();
            BeanUtils.copyProperties(i, donCT);
            var sp = new SanPham();
            sp.setId(i.getSanPham().getId());
            sp.setTenSP(i.getSanPham().getTenSP());
            donCT.setSanPham(sp);
            donCT.setDonHang(donHang);
            donCT.setTrangThai(TrangThai.CHO_NHAN_DON);
            ctDao.save(donCT);
            return donCT;
        }).toList();
        return res;
    }

    @Transactional
    public void setImageForCv(Long id, Long imageId) {
        Images oldImage = null;
        var found = cvDao.findById(id).orElseThrow(() -> new BadReqException("không tìm thấy công việc"));
        var ct = found.getDonHangCT();

        if (ct.getImages() != null && !ct.getImages().getId().equals(imageId)) {
            oldImage = ct.getImages();
        }

        Images image = imagesRepository.findById(imageId).orElseThrow(() -> new BadReqException("không tìm thấy ảnh"));
        ct.setImages(image);
        ctDao.save(ct);

        // flush to persist before deleting file
        // Note: caller should manage EntityManager if needed
        try {
            if (oldImage != null) {
                imageService.deleteImageFile(oldImage.getTenTep());
                imagesRepository.delete(oldImage);
            }
        } catch (Exception ex) {
            log.error("Failed to delete old image file", ex);
        }
    }

    @Transactional
    public void chiaDon(Long id, Integer soPhan) {
        if (soPhan == null || soPhan <= 1) throw new BadReqException("Số phần chia phải lớn hơn 1");

        DonHangCT goc = ctDao.findById(id).orElseThrow(() -> new BadReqException("Không tìm thấy chi tiết đơn hàng"));
        int tong = goc.getSoLuong();
        int moi = tong / soPhan;
        int du = tong % soPhan;

        for (int i = 0; i < soPhan - 1; i++) {
            DonHangCT clone = new DonHangCT();
            BeanUtils.copyProperties(goc, clone, "id"); // copy all but id
            clone.setSoLuong(moi);
            clone.setTrangThai(TrangThai.CHO_SAN_XUAT);
            ctDao.save(clone);
            cvService.createFistJobs(clone.getId());
        }

        int soLuongConLai = moi + du;
        goc.setSoLuong(soLuongConLai);
        goc.setTrangThai(TrangThai.CHO_SAN_XUAT);
        ctDao.save(goc);
        cvService.createFistJobs(goc.getId());
    }
}