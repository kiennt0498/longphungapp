
import axiosClient from "../redux/axiosClient";
import { API_CONG_DOAN } from "./constans";

export default class CongDoanService {
  getListCD = async () => {
    return await axiosClient.get(API_CONG_DOAN);
  };
  insterCD = async (data) => {
    return await axiosClient.post(API_CONG_DOAN + "/save", data);
  };
  updateCD = async (data) => {
    return await axiosClient.put(API_CONG_DOAN + "/update", data);
  };
  deleteCD = async (id) => {
    return await axiosClient.delete(API_CONG_DOAN + "/delete/" + id);
  };
  updateCongNV = async (data) => {
    return await axiosClient.get(API_CONG_DOAN + "/updatecong", { params: { cong: data } });
  }
}
