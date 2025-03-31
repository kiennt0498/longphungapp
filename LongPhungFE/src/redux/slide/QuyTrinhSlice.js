import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quyTrinhs: [],

};

const QuyTrinhSlice = createSlice({
  name: "QuyTrinh",
  initialState,
  reducers: {
    setList: (state, action) => {
      state.quyTrinhs = action.payload;
    },

    addQT: (state, action) => {
      state.quyTrinhs.unshift(action.payload);
    },
    updateQT: (state, action) => {
      const index = state.quyTrinhs.findIndex((i) => i.id === action.payload.id);
      if (index !== -1) {
        state.quyTrinhs.splice(index, 1);
      }
      state.quyTrinhs.unshift(action.payload);
    },
    deleteQT: (state, action) => {
      state.quyTrinhs = state.quyTrinhs.filter((i) => i.id !== action.payload);
    },
  },
});

export const { setCD, setList, addQT, updateQT, deleteQT } =
QuyTrinhSlice.actions;
export default QuyTrinhSlice.reducer;
