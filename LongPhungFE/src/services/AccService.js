import axios from "axios"
import { API_ACC } from "./constans"

export default class AccService  {
    login = async (data) =>{
        return await axios.post(API_ACC+"/login", data)
    }
    logout = async () =>{
        return await axios.post(API_ACC+"/logout")
    }
    getAcc = async (data) =>{
        return await axios.get(API_ACC+"/getdata/"+data)
    }
    updateAcc = async (data) =>{
        return await axios.put(API_ACC+"/update", data)
    }
    changePass = async (data) =>{
        return await axios.put(API_ACC+"/changepass", data)
    }
    getListCV = async () =>{
        return await axios.get(API_ACC+"/listcv")
    }
    

}