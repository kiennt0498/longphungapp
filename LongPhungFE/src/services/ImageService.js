
import axiosUpload  from "../redux/axiosUpload";
import { API_FILE } from "./constans";

export default class ImageService {
  uploadImage = async (data) => {
    return await axiosUpload.post(API_FILE + "/upload/image", data);
  };
  downloadImage = async (name) => {
    return await axiosUpload.get(API_FILE + "/image/" + name, {
      responseType: "blob",params:{download : true}});
  };
  deleteImage = async (name) => {
    return await axiosUpload.delete(API_FILE + "/image/" + name);
  }
  getImage = async (name) => {
    return await axiosUpload.get(API_FILE + "/image/" + name,{params:{download : false}});
  }
  
}
