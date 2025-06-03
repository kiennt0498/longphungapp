
import axiosClient from "../redux/axiosClient";
import { API_QUY_TRINH } from "./constans";

export default class QuyTrinhService {
  getListQT = async () => {
    return await axiosClient.get(API_QUY_TRINH);
  };
  insterQT = async (data) => {
    return await axiosClient.post(API_QUY_TRINH + "/save", data);
  };
  updateQT = async (data) => {
    return await axiosClient.put(API_QUY_TRINH + "/update", data);
  };
  deleteQT = async (id) => {
    return await axiosClient.delete(API_QUY_TRINH + "/delete/" + id);
  };
  getListCongDoan = async () =>{
  return await axiosClient.get(API_QUY_TRINH+"/congdoan")
 }
}
