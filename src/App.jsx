import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import LoginPage from "./Login/LoginPage";
import ForgotPassword from './Login/ForgotPassword';
import Registermem from "./Login/Registermem";
import Header from './components/Header';
import Footer from './components/Footer';
import BloodDonationPage from './Data/BloodDonationPage';
import BloodReceiveForm from './BloodReceive/BloodReceiveForm';
import Logout from './Login/Logout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [formData, setFormData] = useState(null);

  return (
    <Router>
      <div>
        {/*  Header luôn hiển thị, truyền thêm isLoggedIn */}
        <Header username={userName} isLoggedIn={isLoggedIn} />

        <Routes>
          <Route path="/" element={<Navigate to="/register" replace />} />
          <Route path="/register" element={<Registermem />} />

          <Route
            path="/login"
            element={!isLoggedIn ? (
              <LoginPage
                onLoginSuccess={(name) => {
                  setIsLoggedIn(true);
                  setUserName(name);
                }}
              />
            ) : (
              <Navigate to="/donation" replace />
            )}
          />

          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route
            path="/donation"
            element={
              isLoggedIn ? (
                <BloodDonationPage
                  formData={formData}
                  setFormData={setFormData}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="/register-receive"
            element={
              isLoggedIn ? (
                <BloodReceiveForm
                  userId="USR001"
                  onSuccess={() => toast.success("Đã gửi yêu cầu nhận máu thành công.")}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="/logout"
            element={
              <Logout
                onLogout={() => {
                  setIsLoggedIn(false);
                  setUserName("");
                  toast.success("Đăng xuất thành công!");
                }}
              />
            }
          />
        </Routes>
        <Footer />
      
        <ToastContainer
          position="top-center"
          autoClose={3000} //3s
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </Router>
  );
}

export default App;  