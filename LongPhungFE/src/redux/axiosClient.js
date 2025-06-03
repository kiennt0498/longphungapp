// src/utils/axiosClient.js
import axios from "axios";
import { toast } from "react-toastify";

const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

const axiosClient = axios.create({
  baseURL: API_BASE,
  withCredentials: true, // Bắt buộc để gửi/nhận cookie
  headers: {
    "Content-Type": "application/json",
  },
});


axiosClient.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      toast.error("Phiên đăng nhập đã hết. Vui lòng đăng nhập lại.");
      sessionStorage.clear();
      localStorage.clear();
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default axiosClient;