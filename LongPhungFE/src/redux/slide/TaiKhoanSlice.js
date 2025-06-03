import { createSlice } from "@reduxjs/toolkit";

const TaiKhoanSlice = createSlice({
  name: "TaiKhoan",
  initialState: {
    boPhan: "",
    chucVu: "",
    tacVu: "",
    taiKhoan: {},
  },
  reducers: {
    setIsLogin: (state, action) => {
      state.boPhan = action.payload.boPhan;
      state.chucVu = action.payload.chucVu;
      state.tacVu = action.payload.tacVu;
    },
    setTaiKhoan: (state, action) => {
      state.taiKhoan = action.payload;
    },
  },
});

export const { setTaiKhoan, setIsLogin } = TaiKhoanSlice.actions;
export default TaiKhoanSlice.reducer;
