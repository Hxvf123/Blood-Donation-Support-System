import axiosClient from "./axiosClient";

const userApi = {
  loginWithEmail: (data) => axiosClient.post("User/login-email", data),
  loginWithGoogle: (idToken) => axiosClient.post("User/login-google", { idToken }),
  registerWithEmail: (token) =>
    axiosClient.post("User/register-email", {}, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  registerWithGoogle: (token) =>
    axiosClient.post("User/register-google", {}, {
      headers: { Authorization: `Bearer ${token}` },
    }),
};

export default userApi;