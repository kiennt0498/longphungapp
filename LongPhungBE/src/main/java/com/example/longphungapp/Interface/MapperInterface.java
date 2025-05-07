package com.example.longphungapp.Interface;

import com.example.longphungapp.dto.*;
import com.example.longphungapp.entity.*;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;


@Mapper
public interface MapperInterface {
    MapperInterface MAPPER = Mappers.getMapper(MapperInterface.class);

    TaiKhoan toEntity(TaiKhoanDto dto);
    TaiKhoanDto toDto(TaiKhoan entity);

    @Mapping(target = "taiKhoan", ignore = true)
    NhanVien toEntity(NhanVienDto dto);
    @Mapping(target = "taiKhoan", ignore = true)
    NhanVienDto toDto(NhanVien entity);

    @Mapping(target = "nhanVien", ignore = true)
    KhachHangDto toDto(KhachHang entity);
    @Mapping(target = "nhanVien", ignore = true)
    KhachHang toEntity(KhachHangDto dto);

    @Mapping(target = "quyTrinh", ignore = true)
    @Mapping(target = "nguyenVatLieus", ignore = true)
    SanPham toEntity(SanPhamDto dto);
    @Mapping(target = "quyTrinh", ignore = true)
    @Mapping(target = "nguyenVatLieus", ignore = true)
    SanPhamDto toDto(SanPham entity);

    ChatLieu toEntity(ChatLieuDto dto);
    ChatLieuDto toDto(ChatLieu entity);

    LoaiSp toEntity(LoaiSpDto dto);
    LoaiSpDto toDto(LoaiSp entity);

    DoViTinh toEntity(DoViTinhDto dto);
    DoViTinhDto toDto(DoViTinh entity);

    HinhDang toEntity(HinhDangDto dto);
    HinhDangDto toDto(HinhDang entity);

    CongDoan toEntity(CongDoanDto dto);
    CongDoanDto toDto(CongDoan entity);

    DonHangCT toEntity(DonHangCTDto dto);
    DonHangCTDto toDto(DonHangCT entity);

    DonThuMua toEntity(DonThuMuaDto dto);
    DonThuMuaDto toDto(DonThuMua entity);

    @Mapping(target = "nguoiTao", ignore = true)
    Phieu toEntity(PhieuDto dto);
    @Mapping(target = "nguoiTao", ignore = true)
    PhieuDto toDto(Phieu entity);

    PhieuChiTiet toEntity(PhieuChiTietDto dto);
    PhieuChiTietDto toDto(PhieuChiTiet entity);

    Kho toEntity(KhoDto dto);
    KhoDto toDto(Kho entity);

    TonKho toEntity(TonKhoDto dto);
    TonKhoDto toDto(TonKho entity);

    VatTu toEntity(VatTuDto dto);
    VatTuDto toDto(VatTu entity);

    ThongBao toEntity(ThongBaoDto dto);
    ThongBaoDto toDto(ThongBao entity);

}
