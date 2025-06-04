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
    date = "2025-06-04T08:58:48+0700",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.2 (Oracle Corporation)"
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
        sanPham.setDoViTinh( toEntity( dto.getDoViTinh() ) );
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
        sanPhamDto.setDoViTinh( toDto( entity.getDoViTinh() ) );
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
        congDoan.setHeSoThuMua( dto.getHeSoThuMua() );
        congDoan.setHeSoTienCong( dto.getHeSoTienCong() );
        congDoan.setTacVu( dto.getTacVu() );
        congDoan.setKpiGoc( dto.getKpiGoc() );
        congDoan.setDieuChinh( dto.getDieuChinh() );

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
        congDoanDto.setGiaMuaNguyenLieu( entity.getGiaMuaNguyenLieu() );
        congDoanDto.setKhauHaoMay( entity.getKhauHaoMay() );
        congDoanDto.setCongNV( entity.getCongNV() );
        congDoanDto.setHeSoThuMua( entity.getHeSoThuMua() );
        congDoanDto.setHeSoTienCong( entity.getHeSoTienCong() );
        congDoanDto.setTacVu( entity.getTacVu() );
        congDoanDto.setDieuChinh( entity.getDieuChinh() );
        congDoanDto.setKpiGoc( entity.getKpiGoc() );

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
        donHangCT.setGiaGoc( dto.getGiaGoc() );

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
        donHangCTDto.setGiaGoc( entity.getGiaGoc() );
        donHangCTDto.setQuyTrinh( quyTrinhToQuyTrinhDto( entity.getQuyTrinh() ) );

        return donHangCTDto;
    }

    @Override
    public DonThuMua toEntity(DonThuMuaDto dto) {
        if ( dto == null ) {
            return null;
        }

        DonThuMua donThuMua = new DonThuMua();

        donThuMua.setId( dto.getId() );
        donThuMua.setTenNguyenLieu( dto.getTenNguyenLieu() );
        donThuMua.setDoViTinh( toEntity( dto.getDoViTinh() ) );
        donThuMua.setSoLuong( dto.getSoLuong() );
        donThuMua.setKichThuoc( dto.getKichThuoc() );
        donThuMua.setMauSac( dto.getMauSac() );
        donThuMua.setChatLieu( toEntity( dto.getChatLieu() ) );
        donThuMua.setTieuChuan( dto.getTieuChuan() );
        donThuMua.setHanThuMua( dto.getHanThuMua() );
        donThuMua.setGiaDuTinh( dto.getGiaDuTinh() );
        donThuMua.setGiaThuMua( dto.getGiaThuMua() );
        donThuMua.setPhiVanChuyen( dto.getPhiVanChuyen() );
        donThuMua.setGhiChu( dto.getGhiChu() );
        donThuMua.setDone( dto.getDone() );
        donThuMua.setLoai( dto.getLoai() );
        donThuMua.setNguoiLenDon( toEntity( dto.getNguoiLenDon() ) );
        donThuMua.setNhanVienThuMua( toEntity( dto.getNhanVienThuMua() ) );

        return donThuMua;
    }

    @Override
    public DonThuMuaDto toDto(DonThuMua entity) {
        if ( entity == null ) {
            return null;
        }

        DonThuMuaDto donThuMuaDto = new DonThuMuaDto();

        donThuMuaDto.setId( entity.getId() );
        donThuMuaDto.setTenNguyenLieu( entity.getTenNguyenLieu() );
        donThuMuaDto.setDoViTinh( toDto( entity.getDoViTinh() ) );
        donThuMuaDto.setSoLuong( entity.getSoLuong() );
        donThuMuaDto.setKichThuoc( entity.getKichThuoc() );
        donThuMuaDto.setMauSac( entity.getMauSac() );
        donThuMuaDto.setChatLieu( toDto( entity.getChatLieu() ) );
        donThuMuaDto.setTieuChuan( entity.getTieuChuan() );
        donThuMuaDto.setHanThuMua( entity.getHanThuMua() );
        donThuMuaDto.setGiaDuTinh( entity.getGiaDuTinh() );
        donThuMuaDto.setGiaThuMua( entity.getGiaThuMua() );
        donThuMuaDto.setLoai( entity.getLoai() );
        donThuMuaDto.setDone( entity.getDone() );
        donThuMuaDto.setGhiChu( entity.getGhiChu() );
        donThuMuaDto.setPhiVanChuyen( entity.getPhiVanChuyen() );
        donThuMuaDto.setNguoiLenDon( toDto( entity.getNguoiLenDon() ) );
        donThuMuaDto.setNhanVienThuMua( toDto( entity.getNhanVienThuMua() ) );

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
        phieu.setTongGiaTri( dto.getTongGiaTri() );
        phieu.setPhieuChiTiets( phieuChiTietDtoListToPhieuChiTietList( dto.getPhieuChiTiets() ) );

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

        phieuChiTiet.setId( dto.getId() );
        phieuChiTiet.setPhieu( toEntity( dto.getPhieu() ) );
        phieuChiTiet.setVatTu( toEntity( dto.getVatTu() ) );
        phieuChiTiet.setSoLuong( dto.getSoLuong() );
        phieuChiTiet.setDonGia( dto.getDonGia() );
        phieuChiTiet.setThanhTien( dto.getThanhTien() );

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

        kho.setMaKho( dto.getMaKho() );
        kho.setTenKho( dto.getTenKho() );
        kho.setSdt( dto.getSdt() );
        kho.setDiaChi( dto.getDiaChi() );
        kho.setDVVC( dVVCDtoToDVVC( dto.getDVVC() ) );

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

        tonKho.setId( dto.getId() );
        tonKho.setKho( toEntity( dto.getKho() ) );
        tonKho.setVatTu( toEntity( dto.getVatTu() ) );
        tonKho.setSoLuong( dto.getSoLuong() );
        tonKho.setGiaTriTonKho( dto.getGiaTriTonKho() );

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

        vatTu.setId( dto.getId() );
        vatTu.setTen( dto.getTen() );
        vatTu.setGiaNhap( dto.getGiaNhap() );
        vatTu.setChatLieu( toEntity( dto.getChatLieu() ) );
        vatTu.setHeSoBu( dto.getHeSoBu() );
        vatTu.setHeSoThuMua( dto.getHeSoThuMua() );
        vatTu.setLoaiVatTu( dto.getLoaiVatTu() );
        vatTu.setDoViTinh( toEntity( dto.getDoViTinh() ) );

        return vatTu;
    }

    @Override
    public VatTuDto toDto(VatTu entity) {
        if ( entity == null ) {
            return null;
        }

        VatTuDto vatTuDto = new VatTuDto();

        vatTuDto.setId( entity.getId() );
        vatTuDto.setTen( entity.getTen() );
        vatTuDto.setGiaNhap( entity.getGiaNhap() );
        vatTuDto.setChatLieu( toDto( entity.getChatLieu() ) );
        vatTuDto.setHeSoBu( entity.getHeSoBu() );
        vatTuDto.setHeSoThuMua( entity.getHeSoThuMua() );
        vatTuDto.setLoaiVatTu( entity.getLoaiVatTu() );
        vatTuDto.setDoViTinh( toDto( entity.getDoViTinh() ) );

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

    protected QuyTrinh quyTrinhDtoToQuyTrinh(QuyTrinhDto quyTrinhDto) {
        if ( quyTrinhDto == null ) {
            return null;
        }

        QuyTrinh quyTrinh = new QuyTrinh();

        quyTrinh.setId( quyTrinhDto.getId() );
        quyTrinh.setTenQuyTrinh( quyTrinhDto.getTenQuyTrinh() );
        quyTrinh.setNhanVienQL( toEntity( quyTrinhDto.getNhanVienQL() ) );

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

    protected QuyTrinhDto quyTrinhToQuyTrinhDto(QuyTrinh quyTrinh) {
        if ( quyTrinh == null ) {
            return null;
        }

        QuyTrinhDto quyTrinhDto = new QuyTrinhDto();

        quyTrinhDto.setId( quyTrinh.getId() );
        quyTrinhDto.setTenQuyTrinh( quyTrinh.getTenQuyTrinh() );
        quyTrinhDto.setNhanVienQL( toDto( quyTrinh.getNhanVienQL() ) );

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
        dVVC.setTenDV( dVVCDto.getTenDV() );
        dVVC.setSdt( dVVCDto.getSdt() );

        return dVVC;
    }
}
