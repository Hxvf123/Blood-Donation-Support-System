import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import "./RequestDonationDetail.scss";

const statusOptions = [
  { label: "Đã đăng kí", value: "Pending" },
  { label: "Đang tiến hành", value: "Processing" },
];

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

  const updateStatusAndSave = async (newStatus) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.accessToken;

      if (!token) {
        toast.warning("Không tìm thấy token. Vui lòng đăng nhập lại.");
        navigate("/login");
        return;
      }

      if (newStatus === "Processing") {
        const res = await axios.put(
          `https://hienmau-se1864-eqfyh4edege7g5b0.koreacentral-01.azurewebsites.net/api/BloodDonation/check-in-by-id?userId=${request.userId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success("Đã check-in thành công!");
        setStatus("Processing");
        setRequest((prev) => ({
          ...prev,
          status: "Processing",
        }));
      } else if (newStatus === "Rejected") {
        toast.info("Yêu cầu đã bị từ chối.");
        setStatus("Rejected");
        setRequest((prev) => ({
          ...prev,
          status: "Rejected",
        }));
      }

    } catch (err) {
      console.error("Lỗi khi cập nhật trạng thái:", err);
      toast.error("Không thể cập nhật trạng thái.");
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
          <select value={status} onChange={(e) => setStatus(e.target.value)} disabled>
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </p>

        <div className="button-group">
          <button className="btn back-btn" onClick={() => navigate("/dashboard/requestsDonation")}>Quay lại</button>
          
          <div className="status-action-buttons">
            <button className="btn confirm-btn" onClick={() => updateStatusAndSave("Processing")}>Xác nhận</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestDetail;
