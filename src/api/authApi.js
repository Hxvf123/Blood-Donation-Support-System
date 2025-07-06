import axiosClient from "./axiosClient";

// ✅ Gọi API Đăng ký (Register)
export const registerApi = (data) => {
  return axiosClient.post("/api/register", data); // đúng endpoint của bạn
};

// ✅ Gọi API Đăng nhập (Login)
export const loginApi = (data) => {
  return axiosClient.post("/api/login", data); // thống nhất baseURL
};
