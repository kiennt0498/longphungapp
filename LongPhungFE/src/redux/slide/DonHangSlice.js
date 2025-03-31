import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  donHang: {},
  donHangs: [],
  donCT : {},
  donCTs : []
};

const DonHangSlice = createSlice({
  name: "DonHang",
  initialState,
  reducers: {
    setListDH: (state, action) => {
      state.donHangs = action.payload;
    },
    setDonHang: (state, action) => {
      state.donHang = action.payload;
    },

    setDonCT: (state, action) => {
      state.donCTs = action.payload;
    },

    addBill: (state, action) => {
      state.donHangs.unshift(action.payload);
    },
    updateBill: (state, action) => {
      const index = state.donHangs.findIndex((i) => i.id === action.payload.id);
      if (index !== -1) {
        state.donHangs.splice(index, 1);
      }
      state.donHangs.unshift(action.payload);
    },
    deleteBill: (state, action) => {
      state.donHangs = state.donHangs.filter((i) => i.id !== action.payload);
    },
  },
});

export const { setDonHang, setListDH, addBill, updateBill, deleteBill, setDonCT } =
DonHangSlice.actions;
export default DonHangSlice.reducer;
