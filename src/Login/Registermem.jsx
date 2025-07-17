import React, { useState } from "react";
import "./Registermem.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  signOut,
} from "firebase/auth";
import { auth, db } from "../FireBase/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

function Registermem() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
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
      const methods = await fetchSignInMethodsForEmail(auth, email);
      if (methods.includes("google.com")) {
        toast.error("Email này đã được đăng ký bằng Google. Vui lòng đăng nhập bằng Google.");
        return;
      }

      const result = await createUserWithEmailAndPassword(auth, email, password);
      const user = result.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        name: name,
        role: "user",
        createdAt: serverTimestamp(),
        method: "email",
      });

      toast.success("Đăng ký thành công!");
      navigate("/login");
    } catch (error) {
      console.error("Đăng ký lỗi:", error);
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email đã được sử dụng.");
      } else {
        toast.error("Đăng ký thất bại!");
      }
    }
  };

  const handleGoogleRegister = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const signInMethods = await fetchSignInMethodsForEmail(auth, user.email);
      if (signInMethods.includes("password")) {
        await signOut(auth); // Thoát tài khoản Google đã đăng nhập
        toast.error("Email đã được đăng ký bằng Email & Mật khẩu. Vui lòng đăng nhập bằng Email.");
        return;
      }

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        name: user.displayName || "",
        role: "user",
        createdAt: serverTimestamp(),
        method: "google",
      });

      toast.success("Đăng ký bằng Google thành công!");
      navigate("/login");
    } catch (error) {
      console.error("Đăng ký Google lỗi:", error);
      if (error.code === "auth/account-exists-with-different-credential") {
        toast.error("Email đã được đăng ký bằng phương thức khác.");
      } else {
        toast.error("Đăng ký Google thất bại!");
      }
    }
  };

  return (
    <div className="register-page">
      <div className="register-content">
        <div className="register-box">
          <h2 className="register-title">Đăng ký tài khoản</h2>

          <form onSubmit={handleRegister}>
            <label>Họ và tên</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

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
