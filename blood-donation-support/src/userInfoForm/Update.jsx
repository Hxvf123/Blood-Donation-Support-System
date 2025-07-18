import React from "react";
import UpdateInfo from "../userInfoForm/updateUser";

const Update = () => {
  const sampleUser = {
    fullName: "Nguyễn Văn A",
    birthDate: "1995-06-01",
    gender: "Nam",
    phone: "0901234567",
    email: "test@example.com",
    address: "123 Hà Nội",
    bloodGroup: "O+"
  };

  return <UpdateInfo data={sampleUser} onBack={() => window.history.back()} onUpdate={(d) => console.log(d)} />;
};

export default Update;
