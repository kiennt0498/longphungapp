import axios from "axios"
import { API_KHO } from "./constans"

export default class KhoService{
    getListPhieu = async () =>{
        return await axios.get(API_KHO+"/phieu/list")
    
    }

    createPhieu = async (data) =>{
        return await axios.post(API_KHO+"/phieu/save",data)
    }

    deletePhieu = async (id) =>{
        return await axios.delete(API_KHO+"/phieu/delete/"+id)
    }
    
}