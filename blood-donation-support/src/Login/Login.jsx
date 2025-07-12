import React, { useState } from "react";
import "./Login.scss";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../Firebase/firebase";
import ROUTE_PATH from "../Constants/route";

function LoginPage({ onLoginSuccess }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      toast.success("Đăng nhập thành công!");
      onLoginSuccess?.(result.user.displayName || "Người dùng");
      navigate("/");
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      toast.error("Đăng nhập thất bại!");
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      toast.success("Đăng nhập Google thành công!");
      onLoginSuccess?.(result.user.displayName || "Người dùng Google");
      navigate("/");
    } catch (error) {
      console.error("Lỗi đăng nhập Google:", error);
      toast.error("Đăng nhập Google thất bại!");
    }
  };

  return (
    <div className="login-page">
      <div className="login-content">
        <div className="login-box">
          <h2 className="login-title">Đăng nhập</h2>

          <form onSubmit={handleEmailLogin}>
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

            <div className="forgot-password">
              <a href={ROUTE_PATH.FORGOT_PASSWORD}>Quên mật khẩu?</a>
            </div>

            <button type="submit" className="login-button-2">Đăng nhập</button>
          </form>

          <button onClick={handleGoogleLogin} className="google-login-button">
            <img
              src="https://png.pngtree.com/png-clipart/20230916/original/pngtree-google-logo-vector-png-image_12256710.png"
              alt="Google"
              className="google-icon"
            />
            Đăng nhập bằng Google
          </button>

          <div className="register">
            Bạn chưa có tài khoản? <a href={ROUTE_PATH.REGISTER}>Tạo tài khoản</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
