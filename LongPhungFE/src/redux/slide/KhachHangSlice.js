import { createSlice } from "@reduxjs/toolkit";

    const initialState = {
        khachHang: {},
        khachHangs: []
    }

const KhachHangSlice= createSlice({
    name: "KhachHang",
    initialState,
    reducers: {
        setListKH: (state, action) => {
            state.khachHangs = action.payload;
        },
        setKhachHang:(state, action)=>{
            state.khachHang = action.payload
        },
        
        addCus: (state, action)=>{
            state.khachHangs.unshift(action.payload)
        },
        updateCus: (state, action)=>{
            const index = state.khachHangs.findIndex(i=> i.id === action.payload.id)
            if(index !== -1){
                state.khachHangs.splice(index,1)
            }
            state.khachHangs.unshift(action.payload)
        },
        deleteCus: (state, action)=>{
            state.khachHangs =  state.khachHangs.filter(i=> i.id !== action.payload)
        }
    },
       
})

export const { setKhachHang, setListKH, addCus, updateCus, deleteCus } = KhachHangSlice.actions
export default KhachHangSlice.reducer