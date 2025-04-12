package com.example.longphungapp.Interface;

import com.example.longphungapp.dto.ChatLieuDto;
import com.example.longphungapp.dto.CongDoanDto;
import com.example.longphungapp.dto.DoViTinhDto;
import com.example.longphungapp.dto.DonHangCTDto;
import com.example.longphungapp.dto.DonHangDto;
import com.example.longphungapp.dto.HinhDangDto;
import com.example.longphungapp.dto.ImagesDto;
import com.example.longphungapp.dto.KhachHangDto;
import com.example.longphungapp.dto.LoaiSpDto;
import com.example.longphungapp.dto.LoiNhuanDto;
import com.example.longphungapp.dto.NhanVienDto;
import com.example.longphungapp.dto.QuyTrinhDto;
import com.example.longphungapp.dto.SanPhamDto;
import com.example.longphungapp.dto.TaiKhoanDto;
import com.example.longphungapp.entity.ChatLieu;
import com.example.longphungapp.entity.CongDoan;
import com.example.longphungapp.entity.DoViTinh;
import com.example.longphungapp.entity.DonHang;
import com.example.longphungapp.entity.DonHangCT;
import com.example.longphungapp.entity.HinhDang;
import com.example.longphungapp.entity.Images;
import com.example.longphungapp.entity.KhachHang;
import com.example.longphungapp.entity.LoaiSp;
import com.example.longphungapp.entity.LoiNhuan;
import com.example.longphungapp.entity.NhanVien;
import com.example.longphungapp.entity.QuyTrinh;
import com.example.longphungapp.entity.SanPham;
import com.example.longphungapp.entity.TaiKhoan;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import javax.annotation.processing.Generated;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-04-12T16:25:54+0700",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.2 (Oracle Corporation)"
)
public class MapperInterfaceImpl implements MapperInterface {

    @Override
    public TaiKhoan toEntity(TaiKhoanDto dto) {
        if ( dto == null ) {
            return null;
        }

        TaiKhoan taiKhoan = new TaiKhoan();

        taiKhoan.setSdt( dto.getSdt() );
        taiKhoan.setMatKhau( dto.getMatKhau() );

        return taiKhoan;
    }

    @Override
    public TaiKhoanDto toDto(TaiKhoan entity) {
        if ( entity == null ) {
            return null;
        }

        TaiKhoanDto taiKhoanDto = new TaiKhoanDto();

        taiKhoanDto.setSdt( entity.getSdt() );
        taiKhoanDto.setMatKhau( entity.getMatKhau() );

        return taiKhoanDto;
    }

    @Override
    public NhanVien toEntity(NhanVienDto dto) {
        if ( dto == null ) {
            return null;
        }

        NhanVien nhanVien = new NhanVien();

        nhanVien.setId( dto.getId() );
        nhanVien.setHoTen( dto.getHoTen() );
        nhanVien.setDiaChi( dto.getDiaChi() );
        nhanVien.setBoPhan( dto.getBoPhan() );
        nhanVien.setChucVu( dto.getChucVu() );
        nhanVien.setTacVu( dto.getTacVu() );

        return nhanVien;
    }

    @Override
    public NhanVienDto toDto(NhanVien entity) {
        if ( entity == null ) {
            return null;
        }

        NhanVienDto nhanVienDto = new NhanVienDto();

        nhanVienDto.setId( entity.getId() );
        nhanVienDto.setHoTen( entity.getHoTen() );
        nhanVienDto.setDiaChi( entity.getDiaChi() );
        nhanVienDto.setBoPhan( entity.getBoPhan() );
        nhanVienDto.setChucVu( entity.getChucVu() );
        nhanVienDto.setTacVu( entity.getTacVu() );

        return nhanVienDto;
    }

    @Override
    public KhachHangDto toDto(KhachHang entity) {
        if ( entity == null ) {
            return null;
        }

        KhachHangDto khachHangDto = new KhachHangDto();

        khachHangDto.setId( entity.getId() );
        khachHangDto.setTenKhachHang( entity.getTenKhachHang() );
        khachHangDto.setSdt( entity.getSdt() );
        khachHangDto.setDiaChi( entity.getDiaChi() );

        return khachHangDto;
    }

    @Override
    public KhachHang toEntity(KhachHangDto dto) {
        if ( dto == null ) {
            return null;
        }

        KhachHang khachHang = new KhachHang();

        khachHang.setId( dto.getId() );
        khachHang.setTenKhachHang( dto.getTenKhachHang() );
        khachHang.setSdt( dto.getSdt() );
        khachHang.setDiaChi( dto.getDiaChi() );

        return khachHang;
    }

    @Override
    public SanPham toEntity(SanPhamDto dto) {
        if ( dto == null ) {
            return null;
        }

        SanPham sanPham = new SanPham();

        sanPham.setId( dto.getId() );
        sanPham.setTenSP( dto.getTenSP() );
        sanPham.setGia( dto.getGia() );
        sanPham.setMaVach( dto.getMaVach() );
        sanPham.setLoaiSp( toEntity( dto.getLoaiSp() ) );
        sanPham.setHinhDang( toEntity( dto.getHinhDang() ) );
        sanPham.setLoiNhuan( loiNhuanDtoListToLoiNhuanList( dto.getLoiNhuan() ) );

        return sanPham;
    }

    @Override
    public SanPhamDto toDto(SanPham entity) {
        if ( entity == null ) {
            return null;
        }

        SanPhamDto sanPhamDto = new SanPhamDto();

        sanPhamDto.setId( entity.getId() );
        sanPhamDto.setTenSP( entity.getTenSP() );
        sanPhamDto.setLoaiSp( toDto( entity.getLoaiSp() ) );
        sanPhamDto.setHinhDang( toDto( entity.getHinhDang() ) );
        sanPhamDto.setGia( entity.getGia() );
        sanPhamDto.setMaVach( entity.getMaVach() );
        sanPhamDto.setLoiNhuan( loiNhuanListToLoiNhuanDtoList( entity.getLoiNhuan() ) );

        return sanPhamDto;
    }

    @Override
    public ChatLieu toEntity(ChatLieuDto dto) {
        if ( dto == null ) {
            return null;
        }

        ChatLieu chatLieu = new ChatLieu();

        chatLieu.setId( dto.getId() );
        chatLieu.setTen( dto.getTen() );

        return chatLieu;
    }

    @Override
    public ChatLieuDto toDto(ChatLieu entity) {
        if ( entity == null ) {
            return null;
        }

        ChatLieuDto chatLieuDto = new ChatLieuDto();

        chatLieuDto.setId( entity.getId() );
        chatLieuDto.setTen( entity.getTen() );

        return chatLieuDto;
    }

    @Override
    public LoaiSp toEntity(LoaiSpDto dto) {
        if ( dto == null ) {
            return null;
        }

        LoaiSp loaiSp = new LoaiSp();

        loaiSp.setId( dto.getId() );
        loaiSp.setTen( dto.getTen() );

        return loaiSp;
    }

    @Override
    public LoaiSpDto toDto(LoaiSp entity) {
        if ( entity == null ) {
            return null;
        }

        LoaiSpDto loaiSpDto = new LoaiSpDto();

        loaiSpDto.setId( entity.getId() );
        loaiSpDto.setTen( entity.getTen() );

        return loaiSpDto;
    }

    @Override
    public DoViTinh toEntity(DoViTinhDto dto) {
        if ( dto == null ) {
            return null;
        }

        DoViTinh doViTinh = new DoViTinh();

        doViTinh.setId( dto.getId() );
        doViTinh.setTen( dto.getTen() );

        return doViTinh;
    }

    @Override
    public DoViTinhDto toDto(DoViTinh entity) {
        if ( entity == null ) {
            return null;
        }

        Integer id = null;
        String ten = null;

        id = entity.getId();
        ten = entity.getTen();

        DoViTinhDto doViTinhDto = new DoViTinhDto( id, ten );

        return doViTinhDto;
    }

    @Override
    public HinhDang toEntity(HinhDangDto dto) {
        if ( dto == null ) {
            return null;
        }

        HinhDang hinhDang = new HinhDang();

        hinhDang.setId( dto.getId() );
        hinhDang.setTen( dto.getTen() );

        return hinhDang;
    }

    @Override
    public HinhDangDto toDto(HinhDang entity) {
        if ( entity == null ) {
            return null;
        }

        HinhDangDto hinhDangDto = new HinhDangDto();

        hinhDangDto.setId( entity.getId() );
        hinhDangDto.setTen( entity.getTen() );

        return hinhDangDto;
    }

    @Override
    public CongDoan toEntity(CongDoanDto dto) {
        if ( dto == null ) {
            return null;
        }

        CongDoan congDoan = new CongDoan();

        congDoan.setId( dto.getId() );
        congDoan.setTenCongDoan( dto.getTenCongDoan() );
        congDoan.setGiaMuaNguyenLieu( dto.getGiaMuaNguyenLieu() );
        congDoan.setKhauHaoMay( dto.getKhauHaoMay() );
        congDoan.setCongNV( dto.getCongNV() );
        congDoan.setThuTu( dto.getThuTu() );
        congDoan.setHeSoThuMua( dto.getHeSoThuMua() );
        congDoan.setHeSoTienCong( dto.getHeSoTienCong() );

        return congDoan;
    }

    @Override
    public CongDoanDto toDto(CongDoan entity) {
        if ( entity == null ) {
            return null;
        }

        CongDoanDto congDoanDto = new CongDoanDto();

        congDoanDto.setId( entity.getId() );
        congDoanDto.setTenCongDoan( entity.getTenCongDoan() );
        congDoanDto.setThuTu( entity.getThuTu() );
        congDoanDto.setGiaMuaNguyenLieu( entity.getGiaMuaNguyenLieu() );
        congDoanDto.setKhauHaoMay( entity.getKhauHaoMay() );
        congDoanDto.setCongNV( entity.getCongNV() );
        congDoanDto.setHeSoThuMua( entity.getHeSoThuMua() );
        congDoanDto.setHeSoTienCong( entity.getHeSoTienCong() );

        return congDoanDto;
    }

    @Override
    public DonHangCT toEntity(DonHangCTDto dto) {
        if ( dto == null ) {
            return null;
        }

        DonHangCT donHangCT = new DonHangCT();

        donHangCT.setId( dto.getId() );
        donHangCT.setSanPham( toEntity( dto.getSanPham() ) );
        donHangCT.setSoLuong( dto.getSoLuong() );
        donHangCT.setTrangThai( dto.getTrangThai() );
        donHangCT.setDonHang( donHangDtoToDonHang( dto.getDonHang() ) );
        donHangCT.setChieuDai( dto.getChieuDai() );
        donHangCT.setChieuRong( dto.getChieuRong() );
        donHangCT.setGhiChu( dto.getGhiChu() );
        donHangCT.setQuyTrinh( quyTrinhDtoToQuyTrinh( dto.getQuyTrinh() ) );
        donHangCT.setImages( imagesDtoToImages( dto.getImages() ) );
        donHangCT.setDonGia( dto.getDonGia() );

        return donHangCT;
    }

    @Override
    public DonHangCTDto toDto(DonHangCT entity) {
        if ( entity == null ) {
            return null;
        }

        DonHangCTDto donHangCTDto = new DonHangCTDto();

        donHangCTDto.setId( entity.getId() );
        donHangCTDto.setSanPham( toDto( entity.getSanPham() ) );
        donHangCTDto.setSoLuong( entity.getSoLuong() );
        donHangCTDto.setChieuDai( entity.getChieuDai() );
        donHangCTDto.setChieuRong( entity.getChieuRong() );
        donHangCTDto.setGhiChu( entity.getGhiChu() );
        donHangCTDto.setTrangThai( entity.getTrangThai() );
        donHangCTDto.setDonHang( donHangToDonHangDto( entity.getDonHang() ) );
        donHangCTDto.setImages( imagesToImagesDto( entity.getImages() ) );
        donHangCTDto.setDonGia( entity.getDonGia() );
        donHangCTDto.setQuyTrinh( quyTrinhToQuyTrinhDto( entity.getQuyTrinh() ) );

        return donHangCTDto;
    }

    protected LoiNhuan loiNhuanDtoToLoiNhuan(LoiNhuanDto loiNhuanDto) {
        if ( loiNhuanDto == null ) {
            return null;
        }

        LoiNhuan loiNhuan = new LoiNhuan();

        loiNhuan.setSoLuong( loiNhuanDto.getSoLuong() );
        loiNhuan.setLoiNhuan( loiNhuanDto.getLoiNhuan() );

        return loiNhuan;
    }

    protected List<LoiNhuan> loiNhuanDtoListToLoiNhuanList(List<LoiNhuanDto> list) {
        if ( list == null ) {
            return null;
        }

        List<LoiNhuan> list1 = new ArrayList<LoiNhuan>( list.size() );
        for ( LoiNhuanDto loiNhuanDto : list ) {
            list1.add( loiNhuanDtoToLoiNhuan( loiNhuanDto ) );
        }

        return list1;
    }

    protected LoiNhuanDto loiNhuanToLoiNhuanDto(LoiNhuan loiNhuan) {
        if ( loiNhuan == null ) {
            return null;
        }

        LoiNhuanDto loiNhuanDto = new LoiNhuanDto();

        loiNhuanDto.setSoLuong( loiNhuan.getSoLuong() );
        loiNhuanDto.setLoiNhuan( loiNhuan.getLoiNhuan() );

        return loiNhuanDto;
    }

    protected List<LoiNhuanDto> loiNhuanListToLoiNhuanDtoList(List<LoiNhuan> list) {
        if ( list == null ) {
            return null;
        }

        List<LoiNhuanDto> list1 = new ArrayList<LoiNhuanDto>( list.size() );
        for ( LoiNhuan loiNhuan : list ) {
            list1.add( loiNhuanToLoiNhuanDto( loiNhuan ) );
        }

        return list1;
    }

    protected DonHang donHangDtoToDonHang(DonHangDto donHangDto) {
        if ( donHangDto == null ) {
            return null;
        }

        DonHang donHang = new DonHang();

        donHang.setNgayChotDon( donHangDto.getNgayChotDon() );
        donHang.setNgayGiaoHang( donHangDto.getNgayGiaoHang() );
        donHang.setKhachHang( toEntity( donHangDto.getKhachHang() ) );
        donHang.setId( donHangDto.getId() );
        donHang.setMaDonHang( donHangDto.getMaDonHang() );
        donHang.setGia( donHangDto.getGia() );
        donHang.setTrangThai( donHangDto.getTrangThai() );
        donHang.setNhanVien( toEntity( donHangDto.getNhanVien() ) );

        return donHang;
    }

    protected Set<CongDoan> congDoanDtoSetToCongDoanSet(Set<CongDoanDto> set) {
        if ( set == null ) {
            return null;
        }

        Set<CongDoan> set1 = new LinkedHashSet<CongDoan>( Math.max( (int) ( set.size() / .75f ) + 1, 16 ) );
        for ( CongDoanDto congDoanDto : set ) {
            set1.add( toEntity( congDoanDto ) );
        }

        return set1;
    }

    protected QuyTrinh quyTrinhDtoToQuyTrinh(QuyTrinhDto quyTrinhDto) {
        if ( quyTrinhDto == null ) {
            return null;
        }

        QuyTrinh quyTrinh = new QuyTrinh();

        quyTrinh.setId( quyTrinhDto.getId() );
        quyTrinh.setTenQuyTrinh( quyTrinhDto.getTenQuyTrinh() );
        quyTrinh.setNhanVienQL( toEntity( quyTrinhDto.getNhanVienQL() ) );
        quyTrinh.setCongDoans( congDoanDtoSetToCongDoanSet( quyTrinhDto.getCongDoans() ) );

        return quyTrinh;
    }

    protected Images imagesDtoToImages(ImagesDto imagesDto) {
        if ( imagesDto == null ) {
            return null;
        }

        Images images = new Images();

        images.setId( imagesDto.getId() );
        images.setTenAnh( imagesDto.getTenAnh() );
        images.setTenTep( imagesDto.getTenTep() );

        return images;
    }

    protected DonHangDto donHangToDonHangDto(DonHang donHang) {
        if ( donHang == null ) {
            return null;
        }

        DonHangDto donHangDto = new DonHangDto();

        donHangDto.setId( donHang.getId() );
        donHangDto.setMaDonHang( donHang.getMaDonHang() );
        donHangDto.setNgayChotDon( donHang.getNgayChotDon() );
        donHangDto.setNgayGiaoHang( donHang.getNgayGiaoHang() );
        donHangDto.setKhachHang( toDto( donHang.getKhachHang() ) );
        donHangDto.setNhanVien( toDto( donHang.getNhanVien() ) );
        donHangDto.setGia( donHang.getGia() );
        donHangDto.setTrangThai( donHang.getTrangThai() );

        return donHangDto;
    }

    protected ImagesDto imagesToImagesDto(Images images) {
        if ( images == null ) {
            return null;
        }

        ImagesDto imagesDto = new ImagesDto();

        imagesDto.setId( images.getId() );
        imagesDto.setTenAnh( images.getTenAnh() );
        imagesDto.setTenTep( images.getTenTep() );

        return imagesDto;
    }

    protected Set<CongDoanDto> congDoanSetToCongDoanDtoSet(Set<CongDoan> set) {
        if ( set == null ) {
            return null;
        }

        Set<CongDoanDto> set1 = new LinkedHashSet<CongDoanDto>( Math.max( (int) ( set.size() / .75f ) + 1, 16 ) );
        for ( CongDoan congDoan : set ) {
            set1.add( toDto( congDoan ) );
        }

        return set1;
    }

    protected QuyTrinhDto quyTrinhToQuyTrinhDto(QuyTrinh quyTrinh) {
        if ( quyTrinh == null ) {
            return null;
        }

        QuyTrinhDto quyTrinhDto = new QuyTrinhDto();

        quyTrinhDto.setId( quyTrinh.getId() );
        quyTrinhDto.setTenQuyTrinh( quyTrinh.getTenQuyTrinh() );
        quyTrinhDto.setNhanVienQL( toDto( quyTrinh.getNhanVienQL() ) );
        quyTrinhDto.setCongDoans( congDoanSetToCongDoanDtoSet( quyTrinh.getCongDoans() ) );

        return quyTrinhDto;
    }
}
