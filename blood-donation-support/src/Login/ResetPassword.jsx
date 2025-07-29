import React from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { toast } from "react-toastify";
import "./Login.scss";

// Schema kiểm tra định dạng mật khẩu
const schema = yup.object({
  password: yup
    .string()
    .required("Nhập mật khẩu mới")
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
      "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, số và ký tự đặc biệt"
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Xác nhận mật khẩu không khớp")
    .required("Xác nhận mật khẩu"),
});

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const userId = query.get("userId");
  const token = query.get("token");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/api/reset-password", {
        userId,
        token,
        password: data.password,
      });

      if (res.data.success) {
        toast.success(" Mật khẩu đã được cập nhật");
        navigate("/login");
      } else {
        toast.error(res.data.message || "Không thể cập nhật mật khẩu.");
      }
    } catch (error) {
      console.error("Lỗi cập nhật:", error);
      toast.error("Đã có lỗi xảy ra.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-content">
        <div className="login-box">
          <h2 className="login-title">Đặt lại mật khẩu</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>Mật khẩu mới:</label>
            <input type="password" {...register("password")} />
            {errors.password && <p className="error-message">{errors.password.message}</p>}

            <label>Xác nhận mật khẩu:</label>
            <input type="password" {...register("confirmPassword")} />
            {errors.confirmPassword && (
              <p className="error-message">{errors.confirmPassword.message}</p>
            )}

            <button type="submit" className="login-button-2">Xác nhận</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
