import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  congDoan: {},
  congDoans: [],
};

const CongDoanSlice = createSlice({
  name: "CongDoan",
  initialState,
  reducers: {
    setList: (state, action) => {
      state.congDoans = action.payload;
    },
    setCongDoan: (state, action) => {
      state.congDoan = action.payload;
    },

    addCD: (state, action) => {
      state.congDoans.unshift(action.payload);
    },
    updateCD: (state, action) => {
      const index = state.congDoans.findIndex((i) => i.id === action.payload.id);
      if (index !== -1) {
        state.congDoans.splice(index, 1);
      }
      state.congDoans.unshift(action.payload);
    },
    deleteCD: (state, action) => {
      state.congDoans = state.congDoans.filter((i) => i.id !== action.payload);
    },
  },
});

export const { setHoaDon, setList, addCD, updateCD, deleteCD } =
CongDoanSlice.actions;
export default CongDoanSlice.reducer;
