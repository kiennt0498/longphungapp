package com.example.longphungapp.fileEnum;

public enum TrangThai {

     DANG_SAN_XUAT("Đang sản xuất"),
     DANG_GIAO("Đang giao"),
     CHO_THIET_KE("Đang thiết kế"),
     CHO_NHAN_DON( "Chờ nhận đơn"),
     CHO_SAN_XUAT("Chờ sản xuất"),
     CHO_DUYET("Chờ duyệt"),
     CHO_XAC_NHAN("Chờ xác nhận"),
     CHO_THANH_TOAN("Chờ thanh toán"),
     CHO_VAN_CHUYEN("Chờ vận chuyển"),
     NGUNG_SAN_XUAT("Ngừng sản xuất"),
     DA_GIAO("Đã giao"),
     HUY("Hủy");

     private final String description;

     TrangThai(String description) {
          this.description = description;
     }

}
