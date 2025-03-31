import axios from "axios";
import { API_QUY_TRINH } from "./constans";

export default class QuyTrinhService {
  getListQT = async () => {
    return await axios.get(API_QUY_TRINH);
  };
  insterQT = async (data) => {
    return await axios.post(API_QUY_TRINH + "/save", data);
  };
  updateQT = async (data) => {
    return await axios.put(API_QUY_TRINH + "/update", data);
  };
  deleteQT = async (id) => {
    return await axios.delete(API_QUY_TRINH + "/delete/" + id);
  };
  getListCongDoan = async () =>{
  return await axios.get(API_QUY_TRINH+"/congdoan")
 }
}
