import axios from "axios";
import { API_NGUYEN_LIEU } from "./constans";

export default class NguyenLieuService {
  getListNL = async () => {
    return await axios.get(API_NGUYEN_LIEU);
  };
  insterNL = async (data) => {
    return await axios.post(API_NGUYEN_LIEU + "/save", data);
  };
  updateNL = async (data) => {
    return await axios.put(API_NGUYEN_LIEU + "/update", data);
  };
  deleteNL = async (id) => {
    return await axios.delete(API_NGUYEN_LIEU + "/delete/" + id);
  };
  getDonThuMua = async (id) => {
    return await axios.get(API_NGUYEN_LIEU + "/donthumua/" + id);
  };
  insterDTM = async (data) => {
    return await axios.post(API_NGUYEN_LIEU + "/donthumua/save", data);
  };
  huyDonThuMua = async (data) => {
    return await axios.delete(API_NGUYEN_LIEU + "/donthumua/huy/"+ data);
  };
  getListLoaiVatTu = async () => {
    return await axios.get(API_NGUYEN_LIEU + "/loaivattu");
  };

}
