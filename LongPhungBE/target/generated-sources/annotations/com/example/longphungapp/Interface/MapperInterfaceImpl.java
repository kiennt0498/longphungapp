package com.example.longphungapp.Interface;

import com.example.longphungapp.dto.ChatLieuDto;
import com.example.longphungapp.dto.DoViTinhDto;
import com.example.longphungapp.dto.HinhDangDto;
import com.example.longphungapp.dto.LoaiSpDto;
import com.example.longphungapp.dto.NhanVienDto;
import com.example.longphungapp.dto.SanPhamDto;
import com.example.longphungapp.dto.TaiKhoanDto;
import com.example.longphungapp.entity.ChatLieu;
import com.example.longphungapp.entity.DoViTinh;
import com.example.longphungapp.entity.HinhDang;
import com.example.longphungapp.entity.LoaiSp;
import com.example.longphungapp.entity.NhanVien;
import com.example.longphungapp.entity.SanPham;
import com.example.longphungapp.entity.TaiKhoan;
import javax.annotation.processing.Generated;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-03-31T10:12:54+0700",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.42.0.v20250325-2231, environment: Java 21.0.6 (Eclipse Adoptium)"
)
public class MapperInterfaceImpl implements MapperInterface {

    @Override
    public TaiKhoan toEntity(TaiKhoanDto dto) {
        if ( dto == null ) {
            return null;
        }

        TaiKhoan taiKhoan = new TaiKhoan();

        taiKhoan.setMatKhau( dto.getMatKhau() );
        taiKhoan.setSdt( dto.getSdt() );

        return taiKhoan;
    }

    @Override
    public TaiKhoanDto toDto(TaiKhoan entity) {
        if ( entity == null ) {
            return null;
        }

        TaiKhoanDto taiKhoanDto = new TaiKhoanDto();

        taiKhoanDto.setMatKhau( entity.getMatKhau() );
        taiKhoanDto.setSdt( entity.getSdt() );

        return taiKhoanDto;
    }

    @Override
    public NhanVien toEntity(NhanVienDto dto) {
        if ( dto == null ) {
            return null;
        }

        NhanVien nhanVien = new NhanVien();

        nhanVien.setBoPhan( dto.getBoPhan() );
        nhanVien.setChucVu( dto.getChucVu() );
        nhanVien.setDiaChi( dto.getDiaChi() );
        nhanVien.setHoTen( dto.getHoTen() );
        nhanVien.setId( dto.getId() );
        nhanVien.setTacVu( dto.getTacVu() );

        return nhanVien;
    }

    @Override
    public NhanVienDto toDto(NhanVien entity) {
        if ( entity == null ) {
            return null;
        }

        NhanVienDto nhanVienDto = new NhanVienDto();

        nhanVienDto.setBoPhan( entity.getBoPhan() );
        nhanVienDto.setChucVu( entity.getChucVu() );
        nhanVienDto.setDiaChi( entity.getDiaChi() );
        nhanVienDto.setHoTen( entity.getHoTen() );
        nhanVienDto.setId( entity.getId() );
        nhanVienDto.setTacVu( entity.getTacVu() );

        return nhanVienDto;
    }

    @Override
    public SanPham toEntity(SanPhamDto dto) {
        if ( dto == null ) {
            return null;
        }

        SanPham sanPham = new SanPham();

        sanPham.setChatLieu( toEntity( dto.getChatLieu() ) );
        sanPham.setDoViTinh( toEntity( dto.getDoViTinh() ) );
        sanPham.setGia( dto.getGia() );
        sanPham.setHinhDang( toEntity( dto.getHinhDang() ) );
        sanPham.setId( dto.getId() );
        sanPham.setKieuMau( dto.getKieuMau() );
        sanPham.setLoaiSp( toEntity( dto.getLoaiSp() ) );
        sanPham.setMaVach( dto.getMaVach() );
        sanPham.setMauSP( dto.getMauSP() );
        sanPham.setMauVien( dto.getMauVien() );
        sanPham.setTenSP( dto.getTenSP() );

        return sanPham;
    }

    @Override
    public SanPhamDto toDto(SanPham entity) {
        if ( entity == null ) {
            return null;
        }

        SanPhamDto sanPhamDto = new SanPhamDto();

        sanPhamDto.setChatLieu( toDto( entity.getChatLieu() ) );
        sanPhamDto.setDoViTinh( toDto( entity.getDoViTinh() ) );
        sanPhamDto.setGia( entity.getGia() );
        sanPhamDto.setHinhDang( toDto( entity.getHinhDang() ) );
        sanPhamDto.setId( entity.getId() );
        sanPhamDto.setKieuMau( entity.getKieuMau() );
        sanPhamDto.setLoaiSp( toDto( entity.getLoaiSp() ) );
        sanPhamDto.setMaVach( entity.getMaVach() );
        sanPhamDto.setMauSP( entity.getMauSP() );
        sanPhamDto.setMauVien( entity.getMauVien() );
        sanPhamDto.setTenSP( entity.getTenSP() );

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
}
