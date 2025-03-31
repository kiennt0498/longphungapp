import axios from "axios";
import { API_HOA_DON } from "./constans";

export default class DonHangService {
  getListBill = async () => {
    return await axios.get(API_HOA_DON);
  };
  insterBill = async (data) => {
    return await axios.post(API_HOA_DON + "/create", data);
  };
  chotBill = async (id) => {
    return await axios.put(API_HOA_DON + "/chotdon/"+id);
  };
  deleteBill = async (id) => {
    return await axios.delete(API_HOA_DON + "/delete/" + id);
  };
  getDonHangCT = async (id) => {
    return await axios.get(API_HOA_DON + "/donct/" + id);
  }
  huyDonHang = async (data) =>{
    return await axios.put(API_HOA_DON + "/huydon",data);
  }
}
