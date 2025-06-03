
import axiosClient from "../redux/axiosClient"
import { API_KHO } from "./constans"

export default class KhoService{
    getListPhieu = async () =>{
        return await axiosClient.get(API_KHO+"/phieu/list")
    
    }

    createPhieu = async (data) =>{
        return await axiosClient.post(API_KHO+"/phieu/save",data)
    }

    deletePhieu = async (id) =>{
        return await axiosClient.delete(API_KHO+"/phieu/delete/"+id)
    }
    
}