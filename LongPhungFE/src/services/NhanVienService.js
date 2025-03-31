import axios from "axios"
import { API_NHAN_VIEN } from "./constans"


export default class NhanVienSerivce {
    getListEmp = async () =>{
        return await axios.get(API_NHAN_VIEN)
    }

    getListEmpSX = async () =>{
        return await axios.get(API_NHAN_VIEN+"/sanxuat")
    }

    insterEmp = async (data) =>{
        return await axios.post(API_NHAN_VIEN+"/create", data)
    }
    updateEmp = async (data) =>{
        return await axios.put(API_NHAN_VIEN+"/update", data)
    }
    deleteEmp = async (id) =>{
       return await axios.delete(API_NHAN_VIEN + "/delete/" + id)
    }
    getBoPhan = async ()=>{
        return await axios.get(API_NHAN_VIEN + "/bophan" )
    }
    getChucVu = async ()=>{
        return await axios.get(API_NHAN_VIEN + "/chucvu" )
    }
    getTacVu = async ()=>{
        return await axios.get(API_NHAN_VIEN + "/tacvu" )
    }
    onSearch = async (choose, key) =>{
        return await axios.get(API_NHAN_VIEN + "/search", {
            params : { type : choose, keyword : key}
        })
    }
}