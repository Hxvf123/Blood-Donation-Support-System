import React, { useState } from "react";
import "./Register.scss";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../Firebase/firebase";
import axios from "axios";

function Registermem() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isValidPassword = (password) => {
    const regex = /^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{6,}$/;
    return regex.test(password);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Mật khẩu không khớp");
      return;
    }

    if (!isValidPassword(password)) {
      toast.error("Mật khẩu phải có ít nhất 6 ký tự và 1 ký tự đặc biệt");
      return;
    }

    try {
   
    const response = await axios.post("http://localhost:5294/api/User/register-email", {
      email,
      password,
      verifyPassword: confirmPassword,
    });

    toast.success("Đăng ký thành công! Vui lòng kiểm tra email để xác thực.");
    navigate("/login");
  } catch (error) {
    console.error("Đăng ký lỗi:", error);
    toast.error(error?.response?.data?.error || "Đăng ký thất bại!");
  }
};

  const handleGoogleRegister = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();

      // Gọi BE đăng ký google
      await axios.post("http://localhost:5294/api/User/register-google", {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Đăng ký bằng Google thành công!");
      navigate("/login");
    } catch (error) {
      console.error("Đăng ký Google lỗi:", error);
      toast.error("Đăng ký Google thất bại!");
    }
  };

  return (
    <div className="register-page">
      <div className="register-content">
        <div className="register-box">
          <h2 className="register-title">Đăng ký tài khoản</h2>

          <form onSubmit={handleRegister}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Mật khẩu</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <label>Xác nhận mật khẩu</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <button type="submit" className="primary-button">
              Đăng ký
            </button>
          </form>

          <button onClick={handleGoogleRegister} className="google-register-button">
            <img
              src="https://png.pngtree.com/png-clipart/20230916/original/pngtree-google-logo-vector-png-image_12256710.png"
              alt="Google"
              className="google-icon"
              style={{ width: "40px", marginRight: "20px" }}
            />
            Đăng ký bằng Google
          </button>

          <div className="register-link">
            Đã có tài khoản? <a href="/login">Đăng nhập tại đây</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registermem;
