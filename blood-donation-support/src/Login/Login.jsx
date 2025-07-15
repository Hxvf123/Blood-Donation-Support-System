import React, { useEffect, useRef, useState } from "react";
import "./Login.scss";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useLocation } from "react-router";
import { auth, db } from "../Firebase/firebase";
import ROUTE_PATH from "../Constants/route";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

function LoginPage({ onLoginSuccess }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const hasShownToast = useRef(false);

  const testAccounts = [
    {
      email: "manager@example.com",
      password: "123456",
      name: "Quản lý hệ thống",
      role: "manager",
    },
    {
      email: "user@example.com",
      password: "123456",
      name: "Người dùng thường",
      role: "user",
    },
  ];


  const handleEmailLogin = async (e) => {
    e.preventDefault();
    const found = testAccounts.find(
      (acc) => acc.email === email && acc.password === password
    );

    if (found) {
      const userInfo = {
        name: found.name,
        email: found.email,
        role: found.role,
      };
      localStorage.setItem("user", JSON.stringify(userInfo));

      toast.success("Đăng nhập thành công!");

      if (userInfo.role === "manager") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
      return;
    }
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;

      // Kiểm tra nếu user chưa tồn tại trong Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          email: user.email,
          createdAt: serverTimestamp(),
          method: "email",
        });
      }

      toast.success("Đăng nhập thành công!");
      onLoginSuccess?.(user.displayName || "Người dùng");
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
      const userInfo = {
        name: result.user.displayName || "Người dùng Google", // 👉 lấy tên từ Google
      };
      localStorage.setItem("user", JSON.stringify(userInfo));
      toast.success("Đăng nhập thành công!");
      onLoginSuccess?.(userInfo.name);
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
