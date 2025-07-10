
import React, { useState } from "react";
import "./LoginPage.css";
import Footer from "../components/Footer";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
  email: yup.string().email("Email không hợp lệ").required("Vui lòng nhập email"),
});

function ForgotPassword() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "" },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("🔐 Yêu cầu khôi phục:", data.email);
    setSubmitted(true);
  };

  return (
    <div className="login-page">
      <div className="login-content">
        <div className="login-box">
          <h2 className="login-title">Quên mật khẩu</h2>
          {!submitted ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="email">Nhập email của bạn:</label>
              <input
                type="email"
                id="email"
                placeholder="Nhập email"
                {...register("email")}
              />
              {errors.email && <p className="error-message">{errors.email.message}</p>}

              <button type="submit" className="login-button">Gửi yêu cầu</button>
            </form>
          ) : (
            <p className="success-message">
              ✅ Yêu cầu đã được gửi. Vui lòng kiểm tra email để đặt lại mật khẩu.
            </p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ForgotPassword;
