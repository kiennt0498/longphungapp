
import axiosClient from "../redux/axiosClient"
import { API_ACC } from "./constans"

export default class AccService  {
  
    getAcc = async (data) =>{
        return await axiosClient.get(API_ACC+"/getdata/"+data)
    }
    updateAcc = async (data) =>{
        return await axiosClient.put(API_ACC+"/update", data)
    }
    changePass = async (data) =>{
        return await axiosClient.put(API_ACC+"/changepass", data)
    }
    getListCV = async (data) =>{
        return await axiosClient.post(API_ACC+"/listcv",data)
    }

    getListXuong = async () =>{
        return await axiosClient.get(API_ACC+"/listxuong")
    }
    getListKhu = async () =>{
        return await axiosClient.get(API_ACC+"/listkhu")
    }
    

}