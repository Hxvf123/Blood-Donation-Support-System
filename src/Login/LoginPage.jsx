import React, { useState } from "react";
import "./LoginPage.css";
import Footer from "../components/Footer";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginUser } from "../Service/authService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google"; // ✅ THÊM DÒNG NÀY

const schema = yup.object({
  phone: yup
    .string()
    .required("Vui lòng nhập số điện thoại")
    .matches(/^0\d{9}$/, "Số điện thoại phải có 10 số và bắt đầu bằng số 0"),
  password: yup
    .string()
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt")
    .required("Vui lòng nhập mật khẩu"),
});

function LoginPage({ onLoginSuccess }) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { phone: "", password: "" },
    resolver: yupResolver(schema),
  });

  const onHandleSubmit = async (data) => {
    try {
      const user = await loginUser(data.phone, data.password);
      toast.success("Đăng nhập thành công!");
      onLoginSuccess?.(user.name);
    } catch (err) {
      toast.error(err.message || "Lỗi khi đăng nhập");
      console.error("Login Error:", err);
    }
  };

  return (
    <div className="login-page">
      <div className="login-content">
        <div className="login-box">
          <h2 className="login-title">Đăng nhập</h2>
          <form onSubmit={handleSubmit(onHandleSubmit)}>
            <label htmlFor="phone">
              SĐT<span className="required">*</span>
            </label>
            <input
              type="text"
              id="phone"
              placeholder="Nhập SĐT của bạn"
              {...register("phone")}
            />
            {errors.phone && <p className="error-message">{errors.phone.message}</p>}

            <label htmlFor="password">
              Mật khẩu<span className="required">*</span>
            </label>
            <div className="password-input" style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Nhập mật khẩu của bạn"
                {...register("password")}
                style={{ paddingRight: "36px" }}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex={-1}
                style={{
                  position: "absolute",
                  right: "8px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  width: "24px",
                  height: "24px",
                  padding: 0,
                }}
                aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
              />
            </div>
            {errors.password && (
              <p className="error-message">{errors.password.message}</p>
            )}

            <div className="forgot-password">
              <Link to="/forgot-password">Bạn quên mật khẩu?</Link>
            </div>

            <button type="submit" className="login-button">
              Đăng nhập
            </button>

            <div className="register">
              Bạn chưa có tài khoản? <Link to="/register">Tạo tài khoản</Link>
            </div>
          </form>

          {/* ✅ Thêm nút đăng nhập Google */}
          <div style={{ marginTop: 20, textAlign: "center" }}>
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                console.log("Google Credential:", credentialResponse);
                toast.success("Đăng nhập Google thành công!");
                onLoginSuccess?.("Người dùng Google");
              }}
              onError={() => {
                toast.error("Đăng nhập Google thất bại");
              }}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default LoginPage;
