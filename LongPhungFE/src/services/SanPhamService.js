import axios from "axios"
import { API_SAN_PHAM } from "./constans"

export default class SanPhamService  {
    getList = async ()=>{
        return await axios.get(API_SAN_PHAM)
    }
    
      getDonVi = async () => {
        return await axios.get(API_SAN_PHAM + "/donvi");
      };
      getTruong = async () => {
        return await axios.get(API_SAN_PHAM + "/truong");
      };
    insertProd = async (data) =>{
      return await axios.post(API_SAN_PHAM, data)
    }
    updateSanPham = async (data) =>{
      return await axios.put(API_SAN_PHAM, data)
    }
}
