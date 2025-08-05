import axiosClient from "../redux/axiosClient";
import { API_THONG_KE } from "./constans";

export default class ThongKeService {
  getThongKeSanPham = async () => {
    return await axiosClient.get(API_THONG_KE + "/san-pham");
  };

  getLoiNhuanDoanhThu = async () => {
    return await axiosClient.get(API_THONG_KE+"/loinhuan-doanhthu");
  };

  
}
