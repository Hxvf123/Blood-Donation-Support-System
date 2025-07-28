import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "./AddBloodBag.scss";

const staticBloodTypes = [
   { bloodTypeId: "BTI001", bloodName: "A+" },
  { bloodTypeId: "BTI002", bloodName: "A-" },
  { bloodTypeId: "BTI003", bloodName: "B+" },
  { bloodTypeId: "BTI004", bloodName: "B-" },
  { bloodTypeId: "BTI005", bloodName: "AB+" },
  { bloodTypeId: "BTI006", bloodName: "AB-" },
  { bloodTypeId: "BTI007", bloodName: "O+" },
  { bloodTypeId: "BTI008", bloodName: "O-" }
];

const staticComponents = [
  { componentTypeId: "BCT003", componentName: "Huyết tương" },
  { componentTypeId: "BCT004", componentName: "Tiểu cầu" },
  { componentTypeId: "BCT002", componentName: "Hồng cầu" },
  { componentTypeId: "BCT001", componentName: "Máu toàn phần" },
];

const AddBloodBag = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const request = location.state?.request;

  const [form, setForm] = useState({
    BloodTypeName: "",
    ComponentTypeName: "",
    Volume: 0,
    CollectionDate: "",
    ExpiryDate: "",
    Status: "Available"
  });

  // Tự động cập nhật ExpiryDate mỗi khi CollectionDate thay đổi
  useEffect(() => {
    if (form.CollectionDate) {
      const colDate = new Date(form.CollectionDate);
      const expiry = new Date(colDate);
      expiry.setDate(expiry.getDate() + 35);

      const formattedExpiry = expiry.toISOString().split("T")[0];
      setForm(prev => ({ ...prev, ExpiryDate: formattedExpiry }));
    }
  }, [form.CollectionDate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.accessToken;

      if (!token) {
        toast.warning("Không tìm thấy token. Vui lòng đăng nhập lại.");
        return;
      }

      await axios.post(
        "http://localhost:5294/api/BloodInventory/add-blood-bag",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      toast.success("Thêm túi máu vào kho thành công!");
      navigate("/dashboard/inventory");
    } catch (err) {
      console.error("Lỗi khi gửi dữ liệu:", err);
      toast.error("Không thể thêm vào kho máu.");
    }
  };

  return (
    <div className="add-blood-bag-page">
      <ToastContainer />
      <h2>Thêm túi máu vào kho</h2>

      {/* Blood Type Dropdown */}
      <div className="form-group">
        <label>Nhóm máu:</label>
        <select
          name="BloodTypeId"
          value={form.BloodTypeId}
          onChange={handleChange}
          required
        >
          <option value="">-- Chọn nhóm máu --</option>
          {staticBloodTypes.map(bt => (
            <option key={bt.bloodTypeId} value={bt.bloodTypeId}>
              {bt.bloodName}
            </option>
          ))}
        </select>
      </div>

      {/* Component Dropdown */}
      <div className="form-group">
        <label>Loại thành phần:</label>
        <select
          name="ComponentTypeId"
          value={form.ComponentTypeId}
          onChange={handleChange}
          required
        >
          <option value="">-- Chọn thành phần máu --</option>
          {staticComponents.map(ct => (
            <option key={ct.componentTypeId} value={ct.componentTypeId}>
              {ct.componentName}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Thể tích (ml):</label>
        <input
          type="number"
          name="Volume"
          value={form.Volume}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Ngày thu thập:</label>
        <input
          type="date"
          name="CollectionDate"
          value={form.CollectionDate}
          onChange={handleChange}
          min={new Date().toISOString().split("T")[0]}
          required
        />
      </div>

      <div className="form-group">
        <label>Hạn sử dụng (tự động):</label>
        <input
          type="date"
          name="ExpiryDate"
          value={form.ExpiryDate}
          readOnly
        />
      </div>

    <div className="form-group">
  <label>Trạng thái:</label>
  <input type="text" value="Available" readOnly />
</div>

      <div className="button-group">
        <button className="btn back-btn" onClick={() => navigate(-1)}>Quay lại</button>
        <button className="btn save-btn" onClick={handleSubmit}>Lưu</button>
      </div>
    </div>
  );
};

export default AddBloodBag;