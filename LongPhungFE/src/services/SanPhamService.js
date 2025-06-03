
import axiosClient from "../redux/axiosClient";
import { API_SAN_PHAM } from "./constans"

export default class SanPhamService  {
    getList = async ()=>{
        return await axiosClient.get(API_SAN_PHAM)
    }
    
      getDonVi = async () => {
        return await axiosClient.get(API_SAN_PHAM + "/donvi");
      };
      getTruong = async () => {
        return await axiosClient.get(API_SAN_PHAM + "/truong");
      };
    insertProd = async (data) =>{
      return await axiosClient.post(API_SAN_PHAM, data)
    }
    updateSanPham = async (data) =>{
      return await axiosClient.put(API_SAN_PHAM, data)
    }
    deleteSanPham = async (id) =>{
      return await axiosClient.delete(API_SAN_PHAM + "/delete/" + id)
    }
    getLoiNhuan = async (id) =>{
      return await axiosClient.get(API_SAN_PHAM + "/loinhuan/" + id)
    }
}
