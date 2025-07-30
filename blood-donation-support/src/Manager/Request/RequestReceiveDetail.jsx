import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./RequestReceiveDetail.scss";
import axios from "axios";

const mapValueToLabel = (value) => {
  switch (value) {
    case "Pending": return "Đã đăng kí";
    case "Processing": return "Đang tiến hành";
    case "Completed": return "Hoàn thành";
    case "Rejected": return "Đã bị hủy";
    default: return value;
  }
};

const bloodTypes = [
  { id: "BTI001", name: "A+" },
  { id: "BTI002", name: "A-" },
  { id: "BTI003", name: "B+" },
  { id: "BTI004", name: "B-" },
  { id: "BTI005", name: "AB+" },
  { id: "BTI006", name: "AB-" },
  { id: "BTI007", name: "O+" },
  { id: "BTI008", name: "O-" }
];

const components = [
  { id: "BCT001", name: "Máu toàn phần" },
  { id: "BCT002", name: "Hồng cầu" },
  { id: "BCT003", name: "Huyết tương" },
  { id: "BCT004", name: "Tiểu cầu" }
];
const RequestDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [request, setRequest] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const passedData = location.state?.request;
    if (passedData && (passedData.id === id || passedData.RequestId === id)) {
      setRequest(passedData);
      setStatus(passedData.status || passedData.Status || "Pending");
    } else {
      toast.error("Không tìm thấy thông tin yêu cầu. Vui lòng quay lại.");
    }
  }, [id, location.state]);

  const updateStatusAndSave = (newStatus) => {
    handleSave(newStatus);
  };

  const handleSave = async (newStatus) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.accessToken;

    if (!token) {
      toast.warning("Không tìm thấy token. Vui lòng đăng nhập lại.");
      navigate("/login");
      return;
    }

    try {
      const payload = {
        RequestId: request.id,
        Status: newStatus,
      };
      const response = await axios.post(
        "https://hienmau-se1864-eqfyh4edege7g5b0.koreacentral-01.azurewebsites.net/api/BloodReceive/change-status",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Cập nhật trạng thái thành công!");

        setStatus(newStatus);
        setRequest((prev) => ({
          ...prev,
          status: newStatus,
        }));
      } else {
        toast.error(response.data?.Message || "Cập nhật thất bại!");
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái:", error);
      toast.error("Cập nhật thất bại. Vui lòng thử lại.");
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
        <p><strong>Nhóm máu:</strong> {
          bloodTypes.find(bt => bt.id === request.bloodTypeId)?.name || request.bloodTypeId
        }</p>
        <p><strong>Thành phần máu:</strong> {
          components.find(c => c.id === request.componentId)?.name || request.componentId
        }</p>
        <p><strong>Số lượng:</strong> {request.quantity || 0} ml</p>
        <p><strong>Trạng thái hiện tại:</strong> {mapValueToLabel(status)}</p>

        {request.img && (
          <img
            src={request.img}
            alt={request.name}
            className="img-fluid mb-3"
          />
        )}

        <p><strong>Ghi chú:</strong> {request.note || "Không có ghi chú"}</p>
        <div className="button-group">
          <button className="btn back-btn" onClick={() => navigate("/dashboard/requestsReceive")}>Quay lại</button>
          <div className="status-action-buttons">

            <button className="btn confirm-btn" onClick={() => updateStatusAndSave("Processing")}>Xác nhận</button>
            <button className="btn reject-btn" onClick={() => updateStatusAndSave("Rejected")}>Từ chối</button>

          </div>
          <button className="btn complete-btn" onClick={() => updateStatusAndSave("Completed")}>Hoàn thành</button>
        </div>

      </div>
    </div>
  );
};

export default RequestDetail;