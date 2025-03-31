import { createSlice } from "@reduxjs/toolkit";

const SanPhamSlice= createSlice({
    name: "SanPham",
    initialState: {
        sanPham : {},
        sanPhams : [],
        loaiSP: [],
        chatLieu: [],
        hinhDang: [],
        kieuMau: []
    },
    reducers: {
        setListSP: (state, action) => {
            state.sanPhams = action.payload;
        },
        setSanPham:(state, action)=>{
            state.sanPham = action.payload
        },

        setLoaiSP:(state, action)=>{
            state.loaiSP = action.payload
        },

        setChatLieu:(state, action)=>{
            state.chatLieu = action.payload
        },

        setHinhDang:(state, action)=>{
            state.hinhDang = action.payload
        },

        setKieuMau:(state, action)=>{
            state.kieuMau = action.payload
        },

        addSP: (state, action)=>{
            state.sanPhams.unshift(action.payload)
        },
        updateSP: (state, action)=>{
            const index = state.sanPhams.findIndex(i=> i.id === action.payload.id)
            if(index !== -1){
                state.sanPhams[index] =  action.payload
            }
        },
        deleteSP: (state, action)=>{
            state.sanPhams =  state.sanPhams.filter(i=> i.id !== action.payload)
        }
    },
   
       
})

export const {addSP,deleteSP,setListSP,setSanPham,updateSP, setChatLieu, setLoaiSP, setHinhDang, setKieuMau } = SanPhamSlice.actions
export default SanPhamSlice.reducer