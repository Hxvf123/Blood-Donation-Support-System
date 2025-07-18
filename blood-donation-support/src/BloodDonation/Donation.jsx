import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import CheckDate from "./CheckDate";
import UpdateInfo from "../userInfoForm/updateUser";
import ConsentForm from "./ConsentForm";
import ROUTE_PATH from "../Constants/route";

const BloodDonationPage = () => {
  const [formData, setFormData] = useState(null);
  const [step, setStep] = useState(1); // Step 1 = CheckDate

  const location = useLocation();
  const navigate = useNavigate();

  // Nhận dữ liệu từ navigation state (nơi trước đó gửi tới)
  useEffect(() => {
    if (location.state?.userData) {
      setFormData(location.state.userData);
    } else {
      // Nếu không có dữ liệu thì quay về trang user-info (hoặc login)
      navigate(ROUTE_PATH.PROFILE);
    }
  }, [location.state, navigate]);

  // Nhấn "Chỉnh sửa" từ CheckDate
  const handleGoToUpdate = () => {
    setStep(2);
  };

  // Nhấn "Lưu" từ UpdateInfo → quay lại CheckDate
  const handleUpdateSubmit = (updatedData) => {
    setFormData(updatedData);
    setStep(1);
  };

  // Nhấn "Tiếp theo" từ CheckDate → sang ConsentForm
  const handleFinalSubmit = (finalData) => {
    setFormData(finalData);
    setStep(3);
  };

  // Nhấn "Đăng ký" từ ConsentForm → hoàn tất
  const handleConsentSubmit = (consentData) => {
    console.log("Dữ liệu gửi đi:", consentData);
    alert("Đăng ký hiến máu thành công!");
    navigate("/"); // hoặc setStep(1) nếu muốn quay lại
  };

  return (
    <div style={{ padding: "20px" }}>
      {!formData && <p>Đang tải dữ liệu...</p>}

      {formData && step === 1 && (
        <CheckDate
          data={formData}
          onSubmit={handleFinalSubmit}
          onBack={handleGoToUpdate}
        />
      )}

      {formData && step === 2 && (
        <UpdateInfo
          data={formData}
          onUpdate={handleUpdateSubmit}
          onBack={() => setStep(1)}
        />
      )}

      {formData && step === 3 && (
        <ConsentForm
          data={formData}
          onSubmit={handleConsentSubmit}
          onBack={() => setStep(1)}
        />
      )}
    </div>
  );
};

export default BloodDonationPage;
