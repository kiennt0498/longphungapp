import { configureStore } from "@reduxjs/toolkit";
import nhanVienReducer from "./slide/NhanVienSlice"
import khachHangReducer from "./slide/KhachHangSlice"
import sanPhamReducer from "./slide/SanPhamSlice"
import donHangReducer from "./slide/DonHangSlice"
import quyTrinhreducer from "./slide/QuyTrinhSlice"
import congDoanReducer from "./slide/CongDoanSlice"
import taiKhoanReducer from "./slide/TaiKhoanSlice"




const store = configureStore({
  reducer: {
    NhanVien: nhanVienReducer,
    KhachHang : khachHangReducer,
    SanPham: sanPhamReducer,
    DonHang: donHangReducer,
    QuyTrinh: quyTrinhreducer,
    CongDoan: congDoanReducer,
    TaiKhoan: taiKhoanReducer,
  },
});

export default store;
