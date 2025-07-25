import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import "./RequestReceiveDetail.scss";

const statusOptions = ["Đã đăng kí", "Đã xác nhận", "Đang tiến hành", "Đã bị hủy"];

const mapLabelToValue = (label) => {
  switch (label) {
    case "Đã đăng kí": return "Pending";
    case "Đã xác nhận": return "Confirmed";
    case "Đang tiến hành": return "Processing";
    case "Đã bị hủy": return "Canceled";
    default: return "Pending";
  }
};

const mapValueToLabel = (value) => {
  switch (value) {
    case "Pending": return "Đã đăng kí";
    case "Confirmed": return "Đã xác nhận";
    case "Processing": return "Đang tiến hành";
    case "Canceled": return "Đã bị hủy";
    default: return "Đã đăng kí";
  }
};

const RequestDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [request, setRequest] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const passedData = location.state?.request;

    if (passedData && passedData.id === id) {
      setRequest(passedData);

      const matched = statusOptions.find(opt => opt.label === passedData.status);
      setStatus(matched?.value || "Pending");
    } else {
      toast.error("Không tìm thấy thông tin yêu cầu. Vui lòng quay lại.");
    }
  }, [id, location.state]);

  const handleSave = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.accessToken;

    if (!token) {
      toast.warning("Không tìm thấy token. Vui lòng đăng nhập lại.");
      navigate("/login");
      return;
    }


  };

  if (!request) return <p>Không tìm thấy yêu cầu.</p>;

  return (
    <div className="request-detail-container">
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="request-card-detail">
        <h2>Chi tiết yêu cầu #{request.id}</h2>
        <p><strong>Tên:</strong> {request.name}</p>
        <p><strong>Số điện thoại:</strong> {request.phone}</p>
        <p><strong>Email:</strong> {request.email}</p>
        <p>
          <strong>Trạng thái:</strong>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            {statusOptions.map((label) => (
              <option key={label} value={mapLabelToValue(label)}>{label}</option>
            ))}
          </select>
        </p>

        {request.img && (
          <img
            src={request.img}
            alt={request.name}
            className="img-fluid mb-3"
          />
        )}
          <p><strong>Ghi chú:</strong> {request.note}</p>
        <div className="button-group">
          <button className="btn back-btn" onClick={() => navigate("/dashboard/requestsReceive")}>Quay lại</button>
          <button className="btn save-btn" onClick={handleSave}>Lưu</button>
        </div>
      </div>
    </div>
  );
};

export default RequestDetail;
