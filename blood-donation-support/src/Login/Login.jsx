import React, { useEffect, useRef, useState } from "react";
import "./Login.scss";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import {
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useLocation } from "react-router";
import { auth, db } from "../Firebase/firebase";
import ROUTE_PATH from "../Constants/route";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
// import userApi from "../api/userApi";
import axios from "axios";

function LoginPage({ onLoginSuccess }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const hasShownToast = useRef(false);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5294/api/User/login-email", {email, password});
      const userInfo = {
        name: response.data.name,
        token: response.data.token,
      };
      console.log(response.data);
      localStorage.setItem("user", JSON.stringify(userInfo));

      toast.success("Đăng nhập thành công!");
      onLoginSuccess?.(userInfo.displayName || "Người dùng");
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

    // 👉 Lấy Google ID Token từ Firebase
    const idToken = await result.user.getIdToken();

    // 👉 Gửi lên server trong header Authorization
    const response = await axios.post(
      "http://localhost:5294/api/User/login-google",
      {},
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      }
    );

    const { accessToken } = response.data;

    const userInfo = {
      name: result.user.displayName || "Người dùng Google",
      accessToken: accessToken,
    };

    localStorage.setItem("user", JSON.stringify(userInfo));

    toast.success("Đăng nhập bằng Google thành công!");
    onLoginSuccess?.(result.user.displayName || "Người dùng Google");
    navigate("/");
  } catch (error) {
    console.error("Lỗi đăng nhập Google:", error);
    toast.error("Đăng nhập Google thất bại!");
  }
};

  useEffect(() => {
    if (location.state?.message && !hasShownToast.current) {
      toast.warning(location.state.message);
      hasShownToast.current = true;
      window.history.replaceState({}, document.title);
    }
  }, [location]);

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

            <button type="submit" className="login-button-2">
              Đăng nhập
            </button>
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
            Bạn chưa có tài khoản?{" "}
            <a href={ROUTE_PATH.REGISTER}>Tạo tài khoản</a>
          </div>
        </div>
      </div>
    </div >
  );
}

export default LoginPage;
