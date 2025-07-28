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

      // tìm giá trị value từ label (map ngược)
      const matched = statusOptions.find(opt => opt.label === passedData.status);
      setStatus(matched?.value || "Pending");
    } else {
      toast.error("Không tìm thấy thông tin yêu cầu. Vui lòng quay lại.");
    }
  }, [id, location.state]);

  const handleSave = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user?.accessToken;

      if (!token) {
        toast.warning("Không tìm thấy token. Vui lòng đăng nhập lại.");
        return;
      }

      // Nếu chọn là "Đang tiến hành" thì gọi API check-in
      if (status === "Processing") {
        const res = await axios.put(`http://localhost:5294/api/BloodDonation/check-in-by-id?userId=${request.userId}`, {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log("Request object:", request);
        toast.success("Đã check-in thành công!");
      } else {
        toast.info("Chỉ hỗ trợ cập nhật sang 'Đang tiến hành' thông qua API.");
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
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </p>
        <div className="button-group">
          <button className="btn back-btn" onClick={() => navigate("/dashboard/requestsDonation")}>Quay lại</button>
          <button
            className="btn update-btn"
            onClick={() => navigate(`/dashboard/requestsDonation/${request.id}/add-blood`, { state: { request } })}
          >
            Cập nhật kho máu
          </button>
          <button className="btn save-btn" onClick={handleSave}>Lưu</button>
        </div>
      </div>
    </div>
  );
};

export default RequestDetail;
