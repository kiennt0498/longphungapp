import { createSlice } from "@reduxjs/toolkit"


const TaiKhoanSlice = createSlice({
    name: "TaiKhoan",
    initialState: {},
    reducers: {
        setTaiKhoan: (state, action) => {
            state.taiKhoan = action.payload
        },
    },
})

export const { setTaiKhoan } = TaiKhoanSlice.actions
export default TaiKhoanSlice.reducer