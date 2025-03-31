import axios from "axios";
import { API_KHACH_HANG } from "./constans";

export default class KhachHangSerivce {
  getListCus = async () => {
    return await axios.get(API_KHACH_HANG);
  };
  insterCus = async (data) => {
    return await axios.post(API_KHACH_HANG + "/create", data);
  };
  updateCus = async (data) => {
    return await axios.put(API_KHACH_HANG + "/update", data);
  };
  deleteCus = async (id) => {
   return await axios.delete(API_KHACH_HANG + "/delete/" + id);
  };
  onSearch = async (choose, key) => {
    return await axios.get(API_KHACH_HANG + "/search", {
      params: { type: choose, keyword: key },
    });
  };
}
