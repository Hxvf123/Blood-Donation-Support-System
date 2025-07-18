import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import "./userInfoForm.scss";

const bloodTypes = [
  { id: "BTI001", name: "A+" },
  { id: "BTI002", name: "A−" },
  { id: "BTI003", name: "B+" },
  { id: "BTI004", name: "B−" },
  { id: "BTI005", name: "AB+" },
  { id: "BTI006", name: "AB−" },
  { id: "BTI007", name: "O+" },
  { id: "BTI008", name: "O−" },
];

const UpdateInfo = ({ data, onBack }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (data) {
      setFormData({
        fullName: data.fullName || '',
        birthDate: data.dayOfBirth ? new Date(data.dayOfBirth) : null,
        gender: data.gender || '',
        phone: data.phoneNumber || '',
        email: data.email || '',
        address: data.address || '',
        bloodGroup: data.bloodTypeId || '',
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

  const handleSubmit = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.accessToken;

    if (!token) {
      toast.error("Bạn chưa đăng nhập. Vui lòng đăng nhập lại.");
      return;
    }

    

    const submitData = {
  FullName: formData.fullName,
  PhoneNumber: formData.phoneNumber,
  Address: formData.address,
  DayOfBirth: formData.birthDate ? formData.birthDate.toISOString() : null,
  Gender: formData.gender,
  Role: "Member",
  BloodTypeId: formData.bloodGroup,
};


    try {
      const res = await axios.put("http://localhost:5294/api/User/update-profile", submitData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Cập nhật thành công!");

      const updatedUser = { ...user, ...submitData };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      if (onBack) onBack();
    } catch (err) {
      toast.error("Lỗi khi cập nhật thông tin.");
      console.error(err);
    }
  };

  if (!data) return null;

  return (
    <div className="form-container">
      <h2>Cập nhật thông tin</h2>
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
            <option value="Male">Nam</option>
            <option value="Female">Nữ</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3 input-group">
          <Form.Label>Số điện thoại</Form.Label>
          <Form.Control
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber || ""}
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
            disabled
            placeholder="Email không thể chỉnh sửa"
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
            {bloodTypes.map(bt => (
              <option key={bt.id} value={bt.id}>{bt.name}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <div className="buttons">
          <button
            className="register-button back-button"
            onClick={onBack}
            type="button"
          >
            Quay lại
          </button>
          <button
            className="register-button continue-button"
            onClick={handleSubmit}
            type="button"
          >
            Chỉnh sửa thông tin
          </button>
        </div>
      </Form>
    </div>
  );
};

export default UpdateInfo;
