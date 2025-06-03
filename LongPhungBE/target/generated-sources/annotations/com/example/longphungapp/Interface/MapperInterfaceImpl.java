package com.example.longphungapp.Interface;

import com.example.longphungapp.dto.ChatLieuDto;
import com.example.longphungapp.dto.CongDoanDto;
import com.example.longphungapp.dto.DVVCDto;
import com.example.longphungapp.dto.DoViTinhDto;
import com.example.longphungapp.dto.DonHangCTDto;
import com.example.longphungapp.dto.DonHangDto;
import com.example.longphungapp.dto.DonThuMuaDto;
import com.example.longphungapp.dto.HinhDangDto;
import com.example.longphungapp.dto.ImagesDto;
import com.example.longphungapp.dto.KhachHangDto;
import com.example.longphungapp.dto.KhoDto;
import com.example.longphungapp.dto.LoaiSpDto;
import com.example.longphungapp.dto.LoiNhuanDto;
import com.example.longphungapp.dto.NhanVienDto;
import com.example.longphungapp.dto.PhieuChiTietDto;
import com.example.longphungapp.dto.PhieuDto;
import com.example.longphungapp.dto.QuyTrinhDto;
import com.example.longphungapp.dto.SanPhamDto;
import com.example.longphungapp.dto.TaiKhoanDto;
import com.example.longphungapp.dto.ThongBaoDto;
import com.example.longphungapp.dto.TonKhoDto;
import com.example.longphungapp.dto.VatTuDto;
import com.example.longphungapp.entity.ChatLieu;
import com.example.longphungapp.entity.CongDoan;
import com.example.longphungapp.entity.DVVC;
import com.example.longphungapp.entity.DoViTinh;
import com.example.longphungapp.entity.DonHang;
import com.example.longphungapp.entity.DonHangCT;
import com.example.longphungapp.entity.DonThuMua;
import com.example.longphungapp.entity.HinhDang;
import com.example.longphungapp.entity.Images;
import com.example.longphungapp.entity.KhachHang;
import com.example.longphungapp.entity.Kho;
import com.example.longphungapp.entity.LoaiSp;
import com.example.longphungapp.entity.LoiNhuan;
import com.example.longphungapp.entity.NhanVien;
import com.example.longphungapp.entity.Phieu;
import com.example.longphungapp.entity.PhieuChiTiet;
import com.example.longphungapp.entity.QuyTrinh;
import com.example.longphungapp.entity.SanPham;
import com.example.longphungapp.entity.TaiKhoan;
import com.example.longphungapp.entity.ThongBao;
import com.example.longphungapp.entity.TonKho;
import com.example.longphungapp.entity.VatTu;
import java.math.BigDecimal;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoField;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.annotation.processing.Generated;
import javax.xml.datatype.DatatypeConfigurationException;
import javax.xml.datatype.DatatypeConstants;
import javax.xml.datatype.DatatypeFactory;
import javax.xml.datatype.XMLGregorianCalendar;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-06-03T08:11:06+0700",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.42.0.v20250514-1000, environment: Java 21.0.7 (Eclipse Adoptium)"
)
public class MapperInterfaceImpl implements MapperInterface {

    private final DatatypeFactory datatypeFactory;

    public MapperInterfaceImpl() {
        try {
            datatypeFactory = DatatypeFactory.newInstance();
        }
        catch ( DatatypeConfigurationException ex ) {
            throw new RuntimeException( ex );
        }
    }

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
    public KhachHangDto toDto(KhachHang entity) {
        if ( entity == null ) {
            return null;
        }

        KhachHangDto khachHangDto = new KhachHangDto();

        khachHangDto.setDiaChi( entity.getDiaChi() );
        khachHangDto.setId( entity.getId() );
        khachHangDto.setSdt( entity.getSdt() );
        khachHangDto.setTenKhachHang( entity.getTenKhachHang() );

        return khachHangDto;
    }

    @Override
    public KhachHang toEntity(KhachHangDto dto) {
        if ( dto == null ) {
            return null;
        }

        KhachHang khachHang = new KhachHang();

        khachHang.setDiaChi( dto.getDiaChi() );
        khachHang.setId( dto.getId() );
        khachHang.setSdt( dto.getSdt() );
        khachHang.setTenKhachHang( dto.getTenKhachHang() );

        return khachHang;
    }

    @Override
    public SanPham toEntity(SanPhamDto dto) {
        if ( dto == null ) {
            return null;
        }

        SanPham sanPham = new SanPham();

        sanPham.setDoViTinh( toEntity( dto.getDoViTinh() ) );
        sanPham.setGia( dto.getGia() );
        sanPham.setHinhDang( toEntity( dto.getHinhDang() ) );
        sanPham.setId( dto.getId() );
        sanPham.setLoaiSp( toEntity( dto.getLoaiSp() ) );
        sanPham.setLoiNhuan( loiNhuanDtoListToLoiNhuanList( dto.getLoiNhuan() ) );
        sanPham.setMaVach( dto.getMaVach() );
        sanPham.setTenSP( dto.getTenSP() );

        return sanPham;
    }

    @Override
    public SanPhamDto toDto(SanPham entity) {
        if ( entity == null ) {
            return null;
        }

        SanPhamDto sanPhamDto = new SanPhamDto();

        sanPhamDto.setDoViTinh( toDto( entity.getDoViTinh() ) );
        sanPhamDto.setGia( entity.getGia() );
        sanPhamDto.setHinhDang( toDto( entity.getHinhDang() ) );
        sanPhamDto.setId( entity.getId() );
        sanPhamDto.setLoaiSp( toDto( entity.getLoaiSp() ) );
        sanPhamDto.setLoiNhuan( loiNhuanListToLoiNhuanDtoList( entity.getLoiNhuan() ) );
        sanPhamDto.setMaVach( entity.getMaVach() );
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

    @Override
    public CongDoan toEntity(CongDoanDto dto) {
        if ( dto == null ) {
            return null;
        }

        CongDoan congDoan = new CongDoan();

        congDoan.setCongNV( dto.getCongNV() );
        congDoan.setDieuChinh( dto.getDieuChinh() );
        congDoan.setGiaMuaNguyenLieu( dto.getGiaMuaNguyenLieu() );
        congDoan.setHeSoThuMua( dto.getHeSoThuMua() );
        congDoan.setHeSoTienCong( dto.getHeSoTienCong() );
        congDoan.setId( dto.getId() );
        congDoan.setKhauHaoMay( dto.getKhauHaoMay() );
        congDoan.setKpiGoc( dto.getKpiGoc() );
        congDoan.setTacVu( dto.getTacVu() );
        congDoan.setTenCongDoan( dto.getTenCongDoan() );

        return congDoan;
    }

    @Override
    public CongDoanDto toDto(CongDoan entity) {
        if ( entity == null ) {
            return null;
        }

        CongDoanDto congDoanDto = new CongDoanDto();

        congDoanDto.setCongNV( entity.getCongNV() );
        congDoanDto.setDieuChinh( entity.getDieuChinh() );
        congDoanDto.setGiaMuaNguyenLieu( entity.getGiaMuaNguyenLieu() );
        congDoanDto.setHeSoThuMua( entity.getHeSoThuMua() );
        congDoanDto.setHeSoTienCong( entity.getHeSoTienCong() );
        congDoanDto.setId( entity.getId() );
        congDoanDto.setKhauHaoMay( entity.getKhauHaoMay() );
        congDoanDto.setKpiGoc( entity.getKpiGoc() );
        congDoanDto.setTacVu( entity.getTacVu() );
        congDoanDto.setTenCongDoan( entity.getTenCongDoan() );

        return congDoanDto;
    }

    @Override
    public DonHangCT toEntity(DonHangCTDto dto) {
        if ( dto == null ) {
            return null;
        }

        DonHangCT donHangCT = new DonHangCT();

        donHangCT.setChieuDai( dto.getChieuDai() );
        donHangCT.setChieuRong( dto.getChieuRong() );
        donHangCT.setDonGia( dto.getDonGia() );
        donHangCT.setDonHang( donHangDtoToDonHang( dto.getDonHang() ) );
        donHangCT.setGhiChu( dto.getGhiChu() );
        donHangCT.setGiaGoc( dto.getGiaGoc() );
        donHangCT.setId( dto.getId() );
        donHangCT.setImages( imagesDtoToImages( dto.getImages() ) );
        donHangCT.setQuyTrinh( quyTrinhDtoToQuyTrinh( dto.getQuyTrinh() ) );
        donHangCT.setSanPham( toEntity( dto.getSanPham() ) );
        donHangCT.setSoLuong( dto.getSoLuong() );
        donHangCT.setTrangThai( dto.getTrangThai() );

        return donHangCT;
    }

    @Override
    public DonHangCTDto toDto(DonHangCT entity) {
        if ( entity == null ) {
            return null;
        }

        DonHangCTDto donHangCTDto = new DonHangCTDto();

        donHangCTDto.setChieuDai( entity.getChieuDai() );
        donHangCTDto.setChieuRong( entity.getChieuRong() );
        donHangCTDto.setDonGia( entity.getDonGia() );
        donHangCTDto.setDonHang( donHangToDonHangDto( entity.getDonHang() ) );
        donHangCTDto.setGhiChu( entity.getGhiChu() );
        donHangCTDto.setGiaGoc( entity.getGiaGoc() );
        donHangCTDto.setId( entity.getId() );
        donHangCTDto.setImages( imagesToImagesDto( entity.getImages() ) );
        donHangCTDto.setQuyTrinh( quyTrinhToQuyTrinhDto( entity.getQuyTrinh() ) );
        donHangCTDto.setSanPham( toDto( entity.getSanPham() ) );
        donHangCTDto.setSoLuong( entity.getSoLuong() );
        donHangCTDto.setTrangThai( entity.getTrangThai() );

        return donHangCTDto;
    }

    @Override
    public DonThuMua toEntity(DonThuMuaDto dto) {
        if ( dto == null ) {
            return null;
        }

        DonThuMua donThuMua = new DonThuMua();

        donThuMua.setChatLieu( toEntity( dto.getChatLieu() ) );
        donThuMua.setDoViTinh( toEntity( dto.getDoViTinh() ) );
        donThuMua.setDone( dto.getDone() );
        donThuMua.setGhiChu( dto.getGhiChu() );
        donThuMua.setGiaDuTinh( dto.getGiaDuTinh() );
        donThuMua.setGiaThuMua( dto.getGiaThuMua() );
        donThuMua.setHanThuMua( dto.getHanThuMua() );
        donThuMua.setId( dto.getId() );
        donThuMua.setKichThuoc( dto.getKichThuoc() );
        donThuMua.setLoai( dto.getLoai() );
        donThuMua.setMauSac( dto.getMauSac() );
        donThuMua.setNguoiLenDon( toEntity( dto.getNguoiLenDon() ) );
        donThuMua.setPhiVanChuyen( dto.getPhiVanChuyen() );
        donThuMua.setSoLuong( dto.getSoLuong() );
        donThuMua.setTenNguyenLieu( dto.getTenNguyenLieu() );
        donThuMua.setTieuChuan( dto.getTieuChuan() );

        return donThuMua;
    }

    @Override
    public DonThuMuaDto toDto(DonThuMua entity) {
        if ( entity == null ) {
            return null;
        }

        DonThuMuaDto donThuMuaDto = new DonThuMuaDto();

        donThuMuaDto.setChatLieu( toDto( entity.getChatLieu() ) );
        donThuMuaDto.setDoViTinh( toDto( entity.getDoViTinh() ) );
        donThuMuaDto.setDone( entity.getDone() );
        donThuMuaDto.setGhiChu( entity.getGhiChu() );
        donThuMuaDto.setGiaDuTinh( entity.getGiaDuTinh() );
        donThuMuaDto.setGiaThuMua( entity.getGiaThuMua() );
        donThuMuaDto.setHanThuMua( entity.getHanThuMua() );
        donThuMuaDto.setId( entity.getId() );
        donThuMuaDto.setKichThuoc( entity.getKichThuoc() );
        donThuMuaDto.setLoai( entity.getLoai() );
        donThuMuaDto.setMauSac( entity.getMauSac() );
        donThuMuaDto.setNguoiLenDon( toDto( entity.getNguoiLenDon() ) );
        donThuMuaDto.setPhiVanChuyen( entity.getPhiVanChuyen() );
        donThuMuaDto.setSoLuong( entity.getSoLuong() );
        donThuMuaDto.setTenNguyenLieu( entity.getTenNguyenLieu() );
        donThuMuaDto.setTieuChuan( entity.getTieuChuan() );

        return donThuMuaDto;
    }

    @Override
    public Phieu toEntity(PhieuDto dto) {
        if ( dto == null ) {
            return null;
        }

        Phieu phieu = new Phieu();

        phieu.setId( dto.getId() );
        phieu.setKho( toEntity( dto.getKho() ) );
        phieu.setNgayNhap( dto.getNgayNhap() );
        phieu.setNgayXuat( dto.getNgayXuat() );
        phieu.setPhieuChiTiets( phieuChiTietDtoListToPhieuChiTietList( dto.getPhieuChiTiets() ) );
        phieu.setTongGiaTri( dto.getTongGiaTri() );

        return phieu;
    }

    @Override
    public PhieuDto toDto(Phieu entity) {
        if ( entity == null ) {
            return null;
        }

        List<PhieuChiTietDto> phieuChiTiets = null;
        Long id = null;
        KhoDto kho = null;
        Date ngayNhap = null;
        Date ngayXuat = null;
        BigDecimal tongGiaTri = null;

        phieuChiTiets = phieuChiTietListToPhieuChiTietDtoList( entity.getPhieuChiTiets() );
        id = entity.getId();
        kho = toDto( entity.getKho() );
        ngayNhap = entity.getNgayNhap();
        ngayXuat = entity.getNgayXuat();
        tongGiaTri = entity.getTongGiaTri();

        NhanVienDto nguoiTao = null;

        PhieuDto phieuDto = new PhieuDto( id, kho, ngayNhap, ngayXuat, nguoiTao, tongGiaTri, phieuChiTiets );

        return phieuDto;
    }

    @Override
    public PhieuChiTiet toEntity(PhieuChiTietDto dto) {
        if ( dto == null ) {
            return null;
        }

        PhieuChiTiet phieuChiTiet = new PhieuChiTiet();

        phieuChiTiet.setDonGia( dto.getDonGia() );
        phieuChiTiet.setId( dto.getId() );
        phieuChiTiet.setPhieu( toEntity( dto.getPhieu() ) );
        phieuChiTiet.setSoLuong( dto.getSoLuong() );
        phieuChiTiet.setThanhTien( dto.getThanhTien() );
        phieuChiTiet.setVatTu( toEntity( dto.getVatTu() ) );

        return phieuChiTiet;
    }

    @Override
    public PhieuChiTietDto toDto(PhieuChiTiet entity) {
        if ( entity == null ) {
            return null;
        }

        Long id = null;
        VatTuDto vatTu = null;
        Long soLuong = null;
        BigDecimal donGia = null;
        BigDecimal thanhTien = null;
        PhieuDto phieu = null;

        id = entity.getId();
        vatTu = toDto( entity.getVatTu() );
        soLuong = entity.getSoLuong();
        donGia = entity.getDonGia();
        thanhTien = entity.getThanhTien();
        phieu = toDto( entity.getPhieu() );

        PhieuChiTietDto phieuChiTietDto = new PhieuChiTietDto( id, vatTu, soLuong, donGia, thanhTien, phieu );

        return phieuChiTietDto;
    }

    @Override
    public Kho toEntity(KhoDto dto) {
        if ( dto == null ) {
            return null;
        }

        Kho kho = new Kho();

        kho.setDVVC( dVVCDtoToDVVC( dto.getDVVC() ) );
        kho.setDiaChi( dto.getDiaChi() );
        kho.setMaKho( dto.getMaKho() );
        kho.setSdt( dto.getSdt() );
        kho.setTenKho( dto.getTenKho() );

        return kho;
    }

    @Override
    public KhoDto toDto(Kho entity) {
        if ( entity == null ) {
            return null;
        }

        Long maKho = null;
        String tenKho = null;
        String sdt = null;
        String diaChi = null;

        maKho = entity.getMaKho();
        tenKho = entity.getTenKho();
        sdt = entity.getSdt();
        diaChi = entity.getDiaChi();

        DVVCDto dVVC = null;

        KhoDto khoDto = new KhoDto( maKho, tenKho, sdt, diaChi, dVVC );

        return khoDto;
    }

    @Override
    public TonKho toEntity(TonKhoDto dto) {
        if ( dto == null ) {
            return null;
        }

        TonKho tonKho = new TonKho();

        tonKho.setGiaTriTonKho( dto.getGiaTriTonKho() );
        tonKho.setId( dto.getId() );
        tonKho.setKho( toEntity( dto.getKho() ) );
        tonKho.setSoLuong( dto.getSoLuong() );
        tonKho.setVatTu( toEntity( dto.getVatTu() ) );

        return tonKho;
    }

    @Override
    public TonKhoDto toDto(TonKho entity) {
        if ( entity == null ) {
            return null;
        }

        Long id = null;
        KhoDto kho = null;
        VatTuDto vatTu = null;
        Long soLuong = null;
        BigDecimal giaTriTonKho = null;

        id = entity.getId();
        kho = toDto( entity.getKho() );
        vatTu = toDto( entity.getVatTu() );
        soLuong = entity.getSoLuong();
        giaTriTonKho = entity.getGiaTriTonKho();

        BigDecimal donGia = null;

        TonKhoDto tonKhoDto = new TonKhoDto( id, kho, vatTu, soLuong, donGia, giaTriTonKho );

        return tonKhoDto;
    }

    @Override
    public VatTu toEntity(VatTuDto dto) {
        if ( dto == null ) {
            return null;
        }

        VatTu vatTu = new VatTu();

        vatTu.setChatLieu( toEntity( dto.getChatLieu() ) );
        vatTu.setDoViTinh( toEntity( dto.getDoViTinh() ) );
        vatTu.setGiaNhap( dto.getGiaNhap() );
        vatTu.setHeSoBu( dto.getHeSoBu() );
        vatTu.setHeSoThuMua( dto.getHeSoThuMua() );
        vatTu.setId( dto.getId() );
        vatTu.setLoaiVatTu( dto.getLoaiVatTu() );
        vatTu.setTen( dto.getTen() );

        return vatTu;
    }

    @Override
    public VatTuDto toDto(VatTu entity) {
        if ( entity == null ) {
            return null;
        }

        VatTuDto vatTuDto = new VatTuDto();

        vatTuDto.setChatLieu( toDto( entity.getChatLieu() ) );
        vatTuDto.setDoViTinh( toDto( entity.getDoViTinh() ) );
        vatTuDto.setGiaNhap( entity.getGiaNhap() );
        vatTuDto.setHeSoBu( entity.getHeSoBu() );
        vatTuDto.setHeSoThuMua( entity.getHeSoThuMua() );
        vatTuDto.setId( entity.getId() );
        vatTuDto.setLoaiVatTu( entity.getLoaiVatTu() );
        vatTuDto.setTen( entity.getTen() );

        return vatTuDto;
    }

    @Override
    public ThongBao toEntity(ThongBaoDto dto) {
        if ( dto == null ) {
            return null;
        }

        ThongBao thongBao = new ThongBao();

        thongBao.setId( dto.getId() );
        thongBao.setNguoiGui( toEntity( dto.getNguoiGui() ) );
        thongBao.setNoiDung( dto.getNoiDung() );
        thongBao.setTime( xmlGregorianCalendarToLocalDate( localDateTimeToXmlGregorianCalendar( dto.getTime() ) ) );

        return thongBao;
    }

    @Override
    public ThongBaoDto toDto(ThongBao entity) {
        if ( entity == null ) {
            return null;
        }

        ThongBaoDto thongBaoDto = new ThongBaoDto();

        thongBaoDto.setId( entity.getId() );
        thongBaoDto.setNguoiGui( toDto( entity.getNguoiGui() ) );
        thongBaoDto.setNoiDung( entity.getNoiDung() );
        thongBaoDto.setTime( xmlGregorianCalendarToLocalDateTime( localDateToXmlGregorianCalendar( entity.getTime() ) ) );

        return thongBaoDto;
    }

    private XMLGregorianCalendar localDateToXmlGregorianCalendar( LocalDate localDate ) {
        if ( localDate == null ) {
            return null;
        }

        return datatypeFactory.newXMLGregorianCalendarDate(
            localDate.getYear(),
            localDate.getMonthValue(),
            localDate.getDayOfMonth(),
            DatatypeConstants.FIELD_UNDEFINED );
    }

    private XMLGregorianCalendar localDateTimeToXmlGregorianCalendar( LocalDateTime localDateTime ) {
        if ( localDateTime == null ) {
            return null;
        }

        return datatypeFactory.newXMLGregorianCalendar(
            localDateTime.getYear(),
            localDateTime.getMonthValue(),
            localDateTime.getDayOfMonth(),
            localDateTime.getHour(),
            localDateTime.getMinute(),
            localDateTime.getSecond(),
            localDateTime.get( ChronoField.MILLI_OF_SECOND ),
            DatatypeConstants.FIELD_UNDEFINED );
    }

    private static LocalDate xmlGregorianCalendarToLocalDate( XMLGregorianCalendar xcal ) {
        if ( xcal == null ) {
            return null;
        }

        return LocalDate.of( xcal.getYear(), xcal.getMonth(), xcal.getDay() );
    }

    private static LocalDateTime xmlGregorianCalendarToLocalDateTime( XMLGregorianCalendar xcal ) {
        if ( xcal == null ) {
            return null;
        }

        if ( xcal.getYear() != DatatypeConstants.FIELD_UNDEFINED
            && xcal.getMonth() != DatatypeConstants.FIELD_UNDEFINED
            && xcal.getDay() != DatatypeConstants.FIELD_UNDEFINED
            && xcal.getHour() != DatatypeConstants.FIELD_UNDEFINED
            && xcal.getMinute() != DatatypeConstants.FIELD_UNDEFINED
        ) {
            if ( xcal.getSecond() != DatatypeConstants.FIELD_UNDEFINED
                && xcal.getMillisecond() != DatatypeConstants.FIELD_UNDEFINED ) {
                return LocalDateTime.of(
                    xcal.getYear(),
                    xcal.getMonth(),
                    xcal.getDay(),
                    xcal.getHour(),
                    xcal.getMinute(),
                    xcal.getSecond(),
                    Duration.ofMillis( xcal.getMillisecond() ).getNano()
                );
            }
            else if ( xcal.getSecond() != DatatypeConstants.FIELD_UNDEFINED ) {
                return LocalDateTime.of(
                    xcal.getYear(),
                    xcal.getMonth(),
                    xcal.getDay(),
                    xcal.getHour(),
                    xcal.getMinute(),
                    xcal.getSecond()
                );
            }
            else {
                return LocalDateTime.of(
                    xcal.getYear(),
                    xcal.getMonth(),
                    xcal.getDay(),
                    xcal.getHour(),
                    xcal.getMinute()
                );
            }
        }
        return null;
    }

    protected LoiNhuan loiNhuanDtoToLoiNhuan(LoiNhuanDto loiNhuanDto) {
        if ( loiNhuanDto == null ) {
            return null;
        }

        LoiNhuan loiNhuan = new LoiNhuan();

        loiNhuan.setLoiNhuan( loiNhuanDto.getLoiNhuan() );
        loiNhuan.setSoLuong( loiNhuanDto.getSoLuong() );

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

        loiNhuanDto.setLoiNhuan( loiNhuan.getLoiNhuan() );
        loiNhuanDto.setSoLuong( loiNhuan.getSoLuong() );

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

        donHang.setGia( donHangDto.getGia() );
        donHang.setId( donHangDto.getId() );
        donHang.setKhachHang( toEntity( donHangDto.getKhachHang() ) );
        donHang.setMaDonHang( donHangDto.getMaDonHang() );
        donHang.setNgayChotDon( donHangDto.getNgayChotDon() );
        donHang.setNgayGiaoHang( donHangDto.getNgayGiaoHang() );
        donHang.setNhanVien( toEntity( donHangDto.getNhanVien() ) );
        donHang.setTrangThai( donHangDto.getTrangThai() );

        return donHang;
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

    protected QuyTrinh quyTrinhDtoToQuyTrinh(QuyTrinhDto quyTrinhDto) {
        if ( quyTrinhDto == null ) {
            return null;
        }

        QuyTrinh quyTrinh = new QuyTrinh();

        quyTrinh.setId( quyTrinhDto.getId() );
        quyTrinh.setNhanVienQL( toEntity( quyTrinhDto.getNhanVienQL() ) );
        quyTrinh.setTenQuyTrinh( quyTrinhDto.getTenQuyTrinh() );

        return quyTrinh;
    }

    protected DonHangDto donHangToDonHangDto(DonHang donHang) {
        if ( donHang == null ) {
            return null;
        }

        DonHangDto donHangDto = new DonHangDto();

        donHangDto.setGia( donHang.getGia() );
        donHangDto.setId( donHang.getId() );
        donHangDto.setKhachHang( toDto( donHang.getKhachHang() ) );
        donHangDto.setMaDonHang( donHang.getMaDonHang() );
        donHangDto.setNgayChotDon( donHang.getNgayChotDon() );
        donHangDto.setNgayGiaoHang( donHang.getNgayGiaoHang() );
        donHangDto.setNhanVien( toDto( donHang.getNhanVien() ) );
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

    protected QuyTrinhDto quyTrinhToQuyTrinhDto(QuyTrinh quyTrinh) {
        if ( quyTrinh == null ) {
            return null;
        }

        QuyTrinhDto quyTrinhDto = new QuyTrinhDto();

        quyTrinhDto.setId( quyTrinh.getId() );
        quyTrinhDto.setNhanVienQL( toDto( quyTrinh.getNhanVienQL() ) );
        quyTrinhDto.setTenQuyTrinh( quyTrinh.getTenQuyTrinh() );

        return quyTrinhDto;
    }

    protected List<PhieuChiTiet> phieuChiTietDtoListToPhieuChiTietList(List<PhieuChiTietDto> list) {
        if ( list == null ) {
            return null;
        }

        List<PhieuChiTiet> list1 = new ArrayList<PhieuChiTiet>( list.size() );
        for ( PhieuChiTietDto phieuChiTietDto : list ) {
            list1.add( toEntity( phieuChiTietDto ) );
        }

        return list1;
    }

    protected List<PhieuChiTietDto> phieuChiTietListToPhieuChiTietDtoList(List<PhieuChiTiet> list) {
        if ( list == null ) {
            return null;
        }

        List<PhieuChiTietDto> list1 = new ArrayList<PhieuChiTietDto>( list.size() );
        for ( PhieuChiTiet phieuChiTiet : list ) {
            list1.add( toDto( phieuChiTiet ) );
        }

        return list1;
    }

    protected DVVC dVVCDtoToDVVC(DVVCDto dVVCDto) {
        if ( dVVCDto == null ) {
            return null;
        }

        DVVC dVVC = new DVVC();

        dVVC.setId( dVVCDto.getId() );
        dVVC.setSdt( dVVCDto.getSdt() );
        dVVC.setTenDV( dVVCDto.getTenDV() );

        return dVVC;
    }
}
