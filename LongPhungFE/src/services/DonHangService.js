
import axiosClient from "../redux/axiosClient";
import { API_HOA_DON } from "./constans";

const maNV = localStorage.getItem("maNV");

export default class DonHangService {
  getListBill = async () => {
    return await axiosClient.get(API_HOA_DON);
  };
  insterBill = async (data) => {
    return await axiosClient.post(API_HOA_DON + "/create", data);
  };
  chotBill = async (id) => {
    return await axiosClient.put(API_HOA_DON + "/chotdon/"+id+"?maNV="+maNV);
  };
  deleteBill = async (id) => {
    return await axiosClient.delete(API_HOA_DON + "/delete/" + id);
  };
  getDonHangCT = async (id) => {
    return await axiosClient.get(API_HOA_DON + "/donct/" + id);
  }
  updateDonCT = async (id,data) => {
    return await axiosClient.put(API_HOA_DON + "/updateCT/"+id, data);
  }
  huyDonHang = async (data) =>{
    return await axiosClient.put(API_HOA_DON + "/huydon?maNV="+maNV,data);
  }
  getDonHuy = async (id) =>{
    return await axiosClient.get(API_HOA_DON + "/donhuy/"+id);
  }
}
