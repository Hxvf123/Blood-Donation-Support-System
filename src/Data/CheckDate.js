import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import '../components/BloodDonationForm.css';
import './CheckDate.css';


const CheckDate = ({ data, onSubmit, onBack }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleContinue = () => {
    if (!selectedDate) {
      alert("Vui lòng chọn ngày hiến máu!");
      return;
    }
    // Gửi dữ liệu ngày được chọn cùng thông tin cũ
    onSubmit({ ...data, donationDate: selectedDate });
  };

  if (!data) return null;

  return (
    <div className="form-container">
      <h2 >Xác Nhận Thông Tin Và Ngày Hiến Máu</h2>
      <div className="info-group">
        <strong>Họ và tên:</strong> {data.fullName}
      </div>
      <div className="info-group">
        <strong>Ngày sinh:</strong>{" "}
        {data.birthDate ? format(new Date(data.birthDate), "dd/MM/yyyy") : ""}
      </div>
      <div className="info-group">
        <strong>Giới tính:</strong> {data.gender}
      </div>
      <div className="info-group">
        <strong>Số điện thoại:</strong> {data.phone}
      </div>
      <div className="info-group">
        <strong>Email:</strong> {data.email}
      </div>
      <div className="info-group">
        <strong>Địa chỉ:</strong> {data.address}
      </div>
      <div className="info-group">
        <strong>Nhóm máu:</strong> {data.bloodGroup}
      </div>

      <div className="info-group">
        <strong>Chọn ngày hiến máu:</strong>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="dd/MM/yyyy"
          className="form-control"
          placeholderText="Chọn ngày"
        />
      </div>

      <div className="buttons">
        <button className="register-button" onClick={onBack}> Chỉnh sửa</button>
          <button className="register-button" onClick={handleContinue}> Tiếp tục </button>
      </div>
    </div>
  );
};

export default CheckDate;
