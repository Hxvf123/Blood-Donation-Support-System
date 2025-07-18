import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./RequestReceiveDetail.scss";

const mockRequests = [
  { id: "1", name: "Nguyễn Văn A", phone: "0123 456 789", email: "abcxyz@gmail.com", status: "Đã đăng kí" },
  { id: "2", name: "Trần Thị B", phone: "0987 654 321", email: "example@gmail.com", status: "Đã xác nhận" },
];

const statusOptions = ["Đã đăng kí", "Đã xác nhận", "Đang tiến hành", "Đã bị hủy"];

const RequestDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [request, setRequest] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const found = mockRequests.find((req) => req.id === id);
    if (found) {
      setRequest(found);
      setStatus(found.status);
    }
  }, [id]);

  const handleSave = () => {
    console.log("Trạng thái mới:", status);
    toast.success("Cập nhật trạng thái thành công!");
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
            {statusOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </p>

        <div className="button-group">
          <button className="btn back-btn" onClick={() => navigate("/dashboard/requestsReceive")}>Quay lại</button>
          <button className="btn save-btn" onClick={handleSave}>Lưu</button>
        </div>
      </div>
    </div>
  );
};

export default RequestDetail;
