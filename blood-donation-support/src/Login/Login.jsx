import React, { useEffect, useRef, useState } from "react";
import "./Login.scss";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router";
import {
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../Firebase/firebase";
import ROUTE_PATH from "../Constants/route";
import axios from "axios";

function LoginPage({ onLoginSuccess }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const hasShownToast = useRef(false);

  // ✅ Login bằng Email
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5294/api/User/login-email", {
        email,
        password,
      });

      const { accessToken, refreshToken } = response.data;

      if (!accessToken) {
        toast.error("Đăng nhập thất bại: không nhận được accessToken");
        return;
      }

      const profileResponse = await axios.get("http://localhost:5294/api/User/get-by-id", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const fullName = profileResponse.data?.fullName || "Người dùng";

      const userInfo = {
        name: fullName,
        accessToken,
      };

      localStorage.setItem("user", JSON.stringify(userInfo));

      toast.success("Đăng nhập thành công!");
      onLoginSuccess?.(userInfo.name);
      navigate("/");
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      toast.error("Đăng nhập thất bại!");
    }
  };

  // ✅ Login bằng Google
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

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
        accessToken,
      };

      localStorage.setItem("user", JSON.stringify(userInfo));

      toast.success("Đăng nhập bằng Google thành công!");
      onLoginSuccess?.(userInfo.name);
      navigate("/");
    } catch (error) {
      console.error("Lỗi đăng nhập Google:", error);
      toast.error("Đăng nhập Google thất bại!");
    }
  };

  // ✅ Hiện cảnh báo nếu bị redirect từ route yêu cầu login
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
              pattern="^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$"
              onInvalid={(e) => e.target.setCustomValidity("Vui lòng nhập đúng định dạng email.")}
              onInput={(e) => e.target.setCustomValidity("")}
            />


            <label>Mật khẩu</label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ width: "100%", paddingRight: "30px" }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "18px",
                }}
              >
                {showPassword ? "" : ""}
              </button>
            </div>

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
    </div>
  );
}

export default LoginPage;
