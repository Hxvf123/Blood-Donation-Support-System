import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

import LoginPage from "./Login/LoginPage";
import Registermem from "./Login/Registermem";
import Header from './components/Header';
import Footer from './components/Footer';
import BloodDonationPage from './Data/BloodDonationPage';
import BloodReceiveForm from './BloodReceive/BloodReceiveForm';
import CheckDate from './Data/CheckDate'; 

import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [formData, setFormData] = useState(null);

  const handleDateSubmit = (dataWithDate) => {
    console.log("Dữ liệu hoàn tất:", dataWithDate);
    alert("Thông tin đã được xác nhận!");
    // TODO: Gửi dữ liệu tới backend nếu cần
  };

  return (
    <Router>
      <div>
        {isLoggedIn && <Header username={userName} />}

        <Routes>
          <Route path="/" element={<Navigate to="/register" replace />} />
          <Route path="/register" element={<Registermem />} />

          <Route
            path="/login"
            element={
              !isLoggedIn ? (
                <LoginPage
                  onLoginSuccess={(name) => {
                    setIsLoggedIn(true);
                    setUserName(name);
                  }}
                />
              ) : (
                <Navigate to="/donation" replace />
              )
            }
          />

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
            path="/check-date"
            element={
              isLoggedIn && formData ? (
                <CheckDate
                  data={formData}
                  onBack={() => window.history.back()}
                  onSubmit={handleDateSubmit}
                />
              ) : (
                <Navigate to="/donation" replace />
              )
            }
          />

          <Route
            path="/register-receive"
            element={
              isLoggedIn ? (
                <BloodReceiveForm
                  userId="USR001"
                  onSuccess={() => alert("Đã gửi yêu cầu nhận máu thành công.")}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>

        {isLoggedIn && <Footer />}
      </div>
    </Router>
  );
}

export default App;
