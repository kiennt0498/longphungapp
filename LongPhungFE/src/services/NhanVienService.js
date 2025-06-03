
import axiosClient from "../redux/axiosClient"
import { API_NHAN_VIEN } from "./constans"


export default class NhanVienSerivce {
    getListEmp = async () =>{
        return await axiosClient.get(API_NHAN_VIEN)
    }

    getListEmpSX = async () =>{
        return await axiosClient.get(API_NHAN_VIEN+"/sanxuat")
    }

    insterEmp = async (data) =>{
        return await axiosClient.post(API_NHAN_VIEN+"/create", data)
    }
    updateEmp = async (data) =>{
        return await axiosClient.put(API_NHAN_VIEN+"/update", data)
    }
    deleteEmp = async (id) =>{
       return await axiosClient.delete(API_NHAN_VIEN + "/delete/" + id)
    }
    getBoPhan = async ()=>{
        return await axiosClient.get(API_NHAN_VIEN + "/bophan" )
    }
    getChucVu = async ()=>{
        return await axiosClient.get(API_NHAN_VIEN + "/chucvu" )
    }
    getTacVu = async ()=>{
        return await axiosClient.get(API_NHAN_VIEN + "/tacvu" )
    }
    onSearch = async (choose, key) =>{
        return await axiosClient.get(API_NHAN_VIEN + "/search", {
            params : { type : choose, keyword : key}
        })
    }
}