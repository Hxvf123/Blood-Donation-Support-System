// src/services/authService.js
import api from "./axios";

export const loginUser = async (phone, password) => {
  try {
    const response = await api.get("/lab5", {
      params: { phone }
    });

    const users = response.data;

    if (!users || users.length === 0) {
      throw new Error("Số điện thoại không tồn tại");
    }

    const user = users[0];

    if (user.password !== password) {
      throw new Error("Sai mật khẩu");
    }

    return user;
  } catch (error) {
    throw error;
  }
};
