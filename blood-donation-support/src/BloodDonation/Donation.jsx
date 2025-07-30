import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import CheckDate from "./CheckDate";
import UpdateInfo from "../userInfoForm/updateUser";
import ConsentForm from "./ConsentForm";
import ROUTE_PATH from "../Constants/route";
import axios from "axios";

const BloodDonationPage = () => {
  const [formData, setFormData] = useState(null);
  const [step, setStep] = useState(1); // Step 1 = CheckDate

  const navigate = useNavigate();

   useEffect(() => {
    const fetchUserData = async () => {
      const userLocal = localStorage.getItem("user");
      if (!userLocal) {
        navigate(ROUTE_PATH.LOGIN, {
          state: { message: "Bạn phải đăng nhập trước!" },
        });
        return;
      }

      try {
        const { accessToken } = JSON.parse(userLocal);
        const res = await axios.get("https://hienmau-se1864-eqfyh4edege7g5b0.koreacentral-01.azurewebsites.net/api/User/get-by-id", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const data = res.data?.Data;

        if (data) {
          const mappedData = {
            userId: data.UserId,
            fullName: data.FullName,
            birthDate: data.DayOfBirth ? new Date(data.DayOfBirth) : null,
            gender: data.Gender,
            phone: data.PhoneNumber,
            email: data.Email,
            address: data.Address,
            bloodGroup: data.BloodTypeId,
          };

          setFormData(mappedData);
        } else {
          console.warn("API không trả về thông tin người dùng hợp lệ.");
        }
      } catch (error) {
        console.error("Không thể lấy dữ liệu người dùng:", error);
        navigate(ROUTE_PATH.LOGIN, {
          state: { message: "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!" },
        });
      }
    };

    fetchUserData();
  }, [navigate]);

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
