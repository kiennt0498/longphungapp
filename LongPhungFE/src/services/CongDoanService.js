import axios from "axios";
import { API_CONG_DOAN } from "./constans";

export default class CongDoanService {
  getListCD = async () => {
    return await axios.get(API_CONG_DOAN);
  };
  insterCD = async (data) => {
    return await axios.post(API_CONG_DOAN + "/save", data);
  };
  updateCD = async (data) => {
    return await axios.put(API_CONG_DOAN + "/update", data);
  };
  deleteCD = async (id) => {
    return await axios.delete(API_CONG_DOAN + "/delete/" + id);
  };
}
