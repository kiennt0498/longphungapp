
import axiosClient from "../redux/axiosClient";
import { API_KHACH_HANG } from "./constans";

export default class KhachHangSerivce {
  getListCus = async () => {
    return await axiosClient.get(API_KHACH_HANG);
  };
  insterCus = async (data) => {
    return await axiosClient.post(API_KHACH_HANG + "/create", data);
  };
  updateCus = async (data) => {
    return await axiosClient.put(API_KHACH_HANG + "/update", data);
  };
  deleteCus = async (id) => {
   return await axiosClient.delete(API_KHACH_HANG + "/delete/" + id);
  };
  onSearch = async (choose, key) => {
    return await axiosClient.get(API_KHACH_HANG + "/search", {
      params: { type: choose, keyword: key },
    });
  };
}
