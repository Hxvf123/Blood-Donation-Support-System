import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "../userInfoForm/userInfoForm.scss";
import './CheckDate.scss';

const CheckDate = ({ data, onSubmit, onBack }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleContinue = () => {
    console.log(" Ngày được chọn:", selectedDate);

    if (!selectedDate || isNaN(new Date(selectedDate))) {
      alert("Vui lòng chọn ngày hiến máu hợp lệ!");
      return;
    }

    const updatedData = {
      ...data,
      donationDate: selectedDate.toISOString(), // chuẩn định dạng
    };

    console.log(" Gửi dữ liệu:", updatedData);
    onSubmit(updatedData); // gọi handleFinalSubmit bên BloodDonationPage
  };

  if (!data) return null;

  return (
    <div className="form-container">
      <h2>Xác Nhận Thông Tin Và Ngày Hiến Máu</h2>

      <div className="info-group"><strong>Họ và tên:</strong> {data.fullName}</div>
      <div className="info-group">
        <strong>Ngày sinh:</strong>{" "}
        {data.birthDate ? format(new Date(data.birthDate), "dd/MM/yyyy") : ""}
      </div>
      <div className="info-group"><strong>Giới tính:</strong> {data.gender}</div>
      <div className="info-group"><strong>Số điện thoại:</strong> {data.phone}</div>
      <div className="info-group"><strong>Email:</strong> {data.email}</div>
      <div className="info-group"><strong>Địa chỉ:</strong> {data.address}</div>
      <div className="info-group"><strong>Nhóm máu:</strong> {data.bloodGroup}</div>

      <div className="info-group">
        <label><strong>Chọn ngày hiến máu:</strong></label>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="dd/MM/yyyy"
          className="form-control"
          placeholderText="Chọn ngày"
          minDate={new Date()} // không cho chọn ngày trong quá khứ
        />
      </div>

      <div className="buttons">
        <button className="register-button back-button" onClick={onBack}>Chỉnh sửa</button>
        <button className="register-button continue-button" onClick={handleContinue}>Tiếp tục</button>
      </div>
    </div>
  );
};

export default CheckDate;
