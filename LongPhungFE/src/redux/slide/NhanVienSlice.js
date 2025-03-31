import { createSlice } from "@reduxjs/toolkit";




const initialState = {
    nhanVien: {},
    nhanViens:[],
    boPhans: [],
    chucVus: [],
    tacVus: []
};

const NhanVienSlice = createSlice({
    name: "NhanVien",
    initialState,
    reducers: {
        setListEmp: (state, action) => {
            state.nhanViens = action.payload;
        },
        setNhanvien:(state, action)=>{
            state.nhanVien = action.payload
        },
        setBoPhans:(state, action)=>{
            state.boPhans = action.payload
        },
        setChucVu:(state, action)=>{
            state.chucVus = action.payload
        },
        setTacVu:(state, action)=>{
            state.tacVus = action.payload
        },
        addEmp: (state, action)=>{
            state.nhanViens.unshift(action.payload)
        },
        updateEmp: (state, action)=>{
            const index = state.nhanViens.findIndex(i=> i.id === action.payload.id)
            if(index !== -1){
                state.nhanViens[index] =  action.payload
            }
        },
        deleteEmp: (state, action)=>{
            state.nhanViens =  state.nhanViens.filter(i=> i.id !== action.payload)
        }
    },
    
       
})

export const { setListEmp, addEmp, updateEmp, deleteEmp, setNhanvien, setChucVu, setBoPhans, setTacVu } = NhanVienSlice.actions
export default NhanVienSlice.reducer