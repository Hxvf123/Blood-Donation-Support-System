import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "./userInfoForm.scss";

const UpdateInfo = ({ data, onBack, onUpdate }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (data) {
      setFormData({
        ...data,
        birthDate: data.birthDate ? new Date(data.birthDate) : null,
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      birthDate: date,
    }));
  };

  const handleContinue = () => {
    const submitData = {
      ...formData,
      birthDate: formData.birthDate ? formData.birthDate.toISOString() : null,
    };
    onUpdate(submitData); // CHỈNH SỬA Ở ĐÂY
  };

  if (!data) return null;

  return (
    <div className="form-container">
      <h2>Chỉnh sửa thông tin hiến máu</h2>

      <div className="info-group">
        <label>Họ và tên:</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName || ""}
          onChange={handleChange}
          placeholder="Nhập họ và tên"
        />
      </div>

      <div className="info-group">
        <label>Ngày sinh:</label>
        <DatePicker
          selected={formData.birthDate}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
          placeholderText="Chọn ngày sinh"
          className="form-control"
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          maxDate={new Date()}
        />
      </div>

      <div className="info-group">
        <label>Giới tính:</label>
        <select name="gender" value={formData.gender || ""} onChange={handleChange}>
          <option value="">-- Chọn giới tính --</option>
          <option value="Nam">Nam</option>
          <option value="Nữ">Nữ</option>
        </select>
      </div>

      <div className="info-group">
        <label>Số điện thoại:</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone || ""}
          onChange={handleChange}
          placeholder="Nhập số điện thoại"
        />
      </div>

      <div className="info-group">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email || ""}
          onChange={handleChange}
          placeholder="Nhập email"
        />
      </div>

      <div className="info-group">
        <label>Địa chỉ:</label>
        <input
          type="text"
          name="address"
          value={formData.address || ""}
          onChange={handleChange}
          placeholder="Nhập địa chỉ"
        />
      </div>

      <div className="info-group">
        <label>Nhóm máu:</label>
        <select name="bloodGroup" value={formData.bloodGroup || ""} onChange={handleChange}>
          <option value="">-- Chọn nhóm máu --</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>
      </div>

      <div className="buttons">
        <button className="register-button back-button" onClick={onBack}>Quay lại</button>
        <button className="register-button continue-button" onClick={handleContinue}>Tiếp tục</button>
      </div>
    </div>
  );
};

export default UpdateInfo;
