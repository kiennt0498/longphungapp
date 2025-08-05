
import axiosClient from "../redux/axiosClient";
import { API_NGUYEN_LIEU } from "./constans";

export default class NguyenLieuService {
  getListNL = async () => {
    return await axiosClient.get(API_NGUYEN_LIEU);
  };
  insterNL = async (data) => {
    return await axiosClient.post(API_NGUYEN_LIEU + "/save", data);
  };
  updateNL = async (data) => {
    return await axiosClient.put(API_NGUYEN_LIEU + "/update", data);
  };
  deleteNL = async (id) => {
    return await axiosClient.delete(API_NGUYEN_LIEU + "/delete/" + id);
  };
  getDonThuMua = async (id) => {
    return await axiosClient.get(API_NGUYEN_LIEU + "/donthumua/" + id);
  };
  insterDTM = async (data) => {
    return await axiosClient.post(API_NGUYEN_LIEU + "/donthumua/save", data);
  };
  huyDonThuMua = async (data) => {
    return await axiosClient.delete(API_NGUYEN_LIEU + "/donthumua/huy/"+ data);
  };
  getListLoaiVatTu = async () => {
    return await axiosClient.get(API_NGUYEN_LIEU + "/loaivattu");
  };
  getListChatLieu = async () => {
    return await axiosClient.get(API_NGUYEN_LIEU + "/chatlieu");
  };
  updateVatTu = async (data) => {
    return await axiosClient.put(API_NGUYEN_LIEU + "/updatevt", data);
  };
  getDonThuMuaByVT = async (id) => {
    return await axiosClient.get(API_NGUYEN_LIEU + "/lsthumua/" + id);
  }

}
