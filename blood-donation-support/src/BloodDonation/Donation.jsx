import React, { useState, useEffect } from "react";
import UserInfomation from "../userInfoForm/userInfoForm";
import CheckDate from "./CheckDate";
import UpdateInfo from "../userInfoForm/updateUser";
import ConsentForm from "./ConsentForm";
import "../userInfoForm/userInfoForm.scss";
import { useNavigate } from "react-router";

const BloodDonationPage = ({ formData, setFormData }) => {
  const [step, setStep] = useState(1);
  const [localData, setLocalData] = useState(formData || null);
  const navigate = useNavigate();

  // Nếu có dữ liệu ban đầu => sang bước 2
  useEffect(() => {
    if (formData) {
      setLocalData(formData);
      setStep(2);
    }
  }, [formData]);

  // Nếu có ngày hiến máu => sang bước 4
  useEffect(() => {
    if (localData?.donationDate) {
      setStep(4);
    }
  }, [localData?.donationDate]);

  // Xử lý submit từ bước nhập thông tin ban đầu
  const handleFormSubmit = (data) => {
    console.log("Thông tin ban đầu:", data);
    setLocalData(data);
    setFormData?.(data);
    setStep(2);
  };

  // Xử lý sau khi chọn ngày hiến máu
  const handleFinalSubmit = (finalData) => {
    console.log("Ngày hiến máu đã chọn:", finalData);
    setLocalData(finalData);
    setFormData?.(finalData);
  };

  // Xử lý cập nhật thông tin người dùng
  const handleUpdateSubmit = (updatedData) => {
    setLocalData(updatedData);
    setFormData?.(updatedData);
    setStep(2);
  };

  return (
    <div>
      {step === 1 && <UserInfomation onSubmit={handleFormSubmit} />}

      {step === 2 && localData && (
        <CheckDate
          data={localData}
          onBack={() => setStep(3)}
          onSubmit={handleFinalSubmit}
        />
      )}

      {step === 3 && localData && (
        <UpdateInfo
          data={localData}
          onUpdate={handleUpdateSubmit}
          onBack={() => setStep(2)}
        />
      )}

      {step === 4 && localData && (
        <ConsentForm
          data={localData}
          onBack={() => setStep(2)}
          onSubmit={(finalConsentData) => {
            console.log("Dữ liệu cuối cùng:", finalConsentData);
            setLocalData(null);
            setFormData?.(null);
            navigate("/");
          }}
        />
      )}
    </div>
  );
};

export default BloodDonationPage;
