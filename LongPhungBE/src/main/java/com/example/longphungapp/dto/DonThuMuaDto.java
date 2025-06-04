package com.example.longphungapp.dto;

import com.example.longphungapp.entity.DonThuMua;
import lombok.Data;
import lombok.Value;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

/**
 * DTO for {@link DonThuMua}
 */
@Data
public class DonThuMuaDto implements Serializable {
    Long id;
    String tenNguyenLieu;
    DoViTinhDto doViTinh;
    Long soLuong;
    String kichThuoc;
    String mauSac;
    ChatLieuDto chatLieu;
    String tieuChuan;
    Date hanThuMua;
    BigDecimal giaDuTinh;
    BigDecimal giaThuMua;
    private String loai;
    Boolean done;
    String ghiChu;
    private BigDecimal phiVanChuyen;
    private NhanVienDto nguoiLenDon;
    private NhanVienDto nhanVienThuMua;


}