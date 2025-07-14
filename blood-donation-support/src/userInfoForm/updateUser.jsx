import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { Form } from "react-bootstrap";
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
    onUpdate(submitData);
  };

  if (!data) return null;

  return (
    <div className="form-container">
      <h2>Chỉnh sửa thông tin hiến máu</h2>
      <Form>

        <Form.Group className="mb-3 input-group">
          <Form.Label>Họ và tên</Form.Label>
          <Form.Control
            type="text"
            name="fullName"
            value={formData.fullName || ""}
            onChange={handleChange}
            placeholder="Nhập họ và tên"
          />
        </Form.Group>

        <Form.Group className="mb-3 input-group">
          <Form.Label>Ngày sinh</Form.Label>
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
        </Form.Group>

        <Form.Group className="mb-3 input-group">
          <Form.Label>Giới tính</Form.Label>
          <Form.Select
            name="gender"
            value={formData.gender || ""}
            onChange={handleChange}
          >
            <option value="">-- Chọn giới tính --</option>
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3 input-group">
          <Form.Label>Số điện thoại</Form.Label>
          <Form.Control
            type="tel"
            name="phone"
            value={formData.phone || ""}
            onChange={handleChange}
            placeholder="Nhập số điện thoại"
          />
        </Form.Group>

        <Form.Group className="mb-3 input-group">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            placeholder="Nhập email"
          />
        </Form.Group>

        <Form.Group className="mb-3 input-group">
          <Form.Label>Địa chỉ</Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={formData.address || ""}
            onChange={handleChange}
            placeholder="Nhập địa chỉ"
          />
        </Form.Group>

        <Form.Group className="mb-3 input-group">
          <Form.Label>Nhóm máu</Form.Label>
          <Form.Select
            name="bloodGroup"
            value={formData.bloodGroup || ""}
            onChange={handleChange}
          >
            <option value="">-- Chọn nhóm máu --</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </Form.Select>
        </Form.Group>

        <div className="buttons">
          <button className="register-button back-button" onClick={onBack} type="button">
            Quay lại
          </button>
          <button className="register-button continue-button" onClick={handleContinue} type="button">
            Tiếp tục
          </button>
        </div>
      </Form>
    </div>
  );
};

export default UpdateInfo;
