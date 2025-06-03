import axiosClient from "../redux/axiosClient"
import { API_AUTH } from "./constans"

export default class AuthService{
    login = async (data) =>{
        return await axiosClient.post(API_AUTH+'/login',data)
    }
    logout = async () =>{
        return await axiosClient.get(API_AUTH+'/logout')
    }
}