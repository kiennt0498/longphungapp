import axiosClient from "../redux/axiosClient"
import { API_PHIEU_IN } from "./constans"

export default class PhieuInService {

    createPhieuIn = async (data) =>{
        return await axiosClient.post(API_PHIEU_IN + "/create", data)
    }
}