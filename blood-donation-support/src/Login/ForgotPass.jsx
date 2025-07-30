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
  const [sentEmail, setSentEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "" },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log("Email gửi lên API:", data.email);
    try {
      const res = await axios.post("https://hienmau-se1864-eqfyh4edege7g5b0.koreacentral-01.azurewebsites.net/api/User/forgot-password", {
        email: data.email,

      });


      setSentEmail(data.email);
      setSubmitted(true);
      toast.success(res.data.message || "Yêu cầu đã được gửi. Vui lòng kiểm tra email.");
    } catch (error) {
      console.error("Lỗi gửi yêu cầu:", error);

      const apiError = error.response?.data?.error || "Không thể gửi yêu cầu. Hãy kiểm tra lại email.";
      toast.error(apiError);
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
              Yêu cầu đã được gửi tới <strong>{sentEmail}</strong>. Vui lòng kiểm tra email để đặt lại mật khẩu.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
