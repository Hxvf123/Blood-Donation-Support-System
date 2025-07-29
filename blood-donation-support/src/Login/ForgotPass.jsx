import React, { useState } from "react";
import "./Login.scss";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { toast } from "react-toastify";

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

  const onSubmit = async (data) => {
    try {
      // Gọi API để kiểm tra email, tạo token
      const res = await axios.post("http://localhost:3000/api/forgot-password", {
        email: data.email,
      });

      if (res.data.success) {
        const { userId, token } = res.data;

        // Dựng link reset password có userId & token
        const resetLink = `https://your-frontend.com/reset-password?userId=${userId}&token=${token}`;

        // Gửi link về backend để gửi mail
        await axios.post("http://localhost:3000/api/send-reset-email", {
          email: data.email,
          resetLink,
        });

        setSubmitted(true);
        toast.success("✅ Đã gửi email đặt lại mật khẩu!");
      } else {
        toast.error(res.data.message || "Không thể gửi yêu cầu.");
      }
    } catch (error) {
      console.error("Lỗi gửi yêu cầu:", error);
      toast.error("Không thể gửi yêu cầu. Hãy kiểm tra email.");
    }
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
              <button type="submit" className="login-button-2">Gửi yêu cầu</button>
            </form>
          ) : (
            <p className="success-message">
              ✅ Yêu cầu đã được gửi. Vui lòng kiểm tra email để đặt lại mật khẩu.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
