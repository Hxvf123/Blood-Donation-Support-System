import React, { useState, useEffect } from "react";
import BloodDonationForm from "../components/BloodDonationForm";
import CheckDate from "./CheckDate";
import UpdateInfo from "./UpdateInfo";
import "../components/BloodDonationForm.css";
import "bootstrap/dist/css/bootstrap.css";

const BloodDonationPage = ({ formData: initialData, setFormData: setAppFormData }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialData || null); 

  // ✅ Nếu đã có formData thì chuyển thẳng đến step 2
  useEffect(() => {
    if (initialData) {
      setStep(2);
    }
  }, [initialData]);

  const handleFormSubmit = (data) => {
    setFormData(data);
    setAppFormData(data); // Cập nhật dữ liệu cho App.jsx
    setStep(2);
  };

  const handleFinalSubmit = (finalData) => {
    console.log("Dữ liệu cuối cùng:", finalData);
    alert("Cảm ơn bạn đã đăng ký hiến máu!");
    setFormData(finalData);
    setAppFormData(finalData);
    setStep(1);
  };

  const handleUpdateSubmit = (updatedData) => {
    setFormData(updatedData);
    setAppFormData(updatedData);
    setStep(2);
  };

  return (
    <div>
      {step === 1 && (
        <BloodDonationForm onSubmit={handleFormSubmit} />
      )}

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
    </div>
  );
};

export default BloodDonationPage;
