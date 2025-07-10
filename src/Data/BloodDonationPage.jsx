import React, { useState, useEffect } from "react";
import BloodDonationForm from "../components/BloodDonationForm";
import CheckDate from "./CheckDate";
import UpdateInfo from "./UpdateInfo";
import BloodDonationConsentForm from "./BloodDonationConsentForm";
import "../components/BloodDonationForm.css";
import "bootstrap/dist/css/bootstrap.css";

const BloodDonationPage = ({ formData: initialData, setFormData: setAppFormData }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialData || null);

  // Nếu có formData từ props -> vào bước 2
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setStep(2);
    }
  }, [initialData]);

  // Khi formData có donationDate -> vào bước 4
  useEffect(() => {
    if (formData?.donationDate) {
      setStep(4);
    }
  }, [formData?.donationDate]);

  const handleFormSubmit = (data) => {
    console.log(" Thông tin ban đầu:", data);
    setFormData(data);
    setAppFormData(data);
    setStep(2);
  };

  const handleFinalSubmit = (finalData) => {
    console.log(" Ngày hiến máu đã chọn:", finalData);
    setFormData(finalData);
    setAppFormData(finalData);
  };

  const handleUpdateSubmit = (updatedData) => {
    setFormData(updatedData);
    setAppFormData(updatedData);
    setStep(2);
  };

  return (
    <div>
      {step === 1 && <BloodDonationForm onSubmit={handleFormSubmit} />}

      {step === 2 && formData && (
        <CheckDate
          data={formData}
          onBack={() => setStep(3)}
          onSubmit={handleFinalSubmit}
        />
      )}

      {step === 3 && formData && (
        <UpdateInfo
          data={formData}
          onUpdate={handleUpdateSubmit}
          onBack={() => setStep(2)}
        />
      )}

      {step === 4 && formData && (
        <BloodDonationConsentForm
          data={formData}
          onBack={() => setStep(2)}
          onSubmit={(finalConsentData) => {
            console.log(" Dữ liệu cuối cùng:", finalConsentData);
            setFormData(null);
            setAppFormData(null);
            setStep(1); // Reset về bước đầu
          }}
        />
      )}
    </div>
  );
};

export default BloodDonationPage;
