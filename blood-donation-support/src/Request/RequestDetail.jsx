import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import './RequestDetail.scss';

const RequestDetail = () => {
  const { id } = useParams();

  // 🔧 Tạm mock dữ liệu dựa vào id
  const mockData = {
    1: {
      name: "Nguyễn Văn A",
      phone: "0123 456 789",
      email: "abcxyz@gmail.com",
      date: "23/06/2025",
      status: "Đã đăng kí"
    }
  };

  const selectedRequest = mockData[id]; // 🔍 lấy từ mock theo id

  const [status, setStatus] = useState('');

  useEffect(() => {
    if (selectedRequest) {
      setStatus(selectedRequest.status);
    }
  }, [selectedRequest]);

  if (!selectedRequest) return <p>Không tìm thấy yêu cầu!</p>;

  return (
    <div className="request-detail">
      <h3>Chi tiết yêu cầu #{id}</h3>
      <p><strong>Tên:</strong> {selectedRequest.name}</p>
      <p><strong>Số điện thoại:</strong> {selectedRequest.phone}</p>
      <p><strong>Email:</strong> {selectedRequest.email}</p>

      <p><strong>Trạng thái:</strong>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Đã đăng kí">Đã đăng kí</option>
          <option value="Đã xác nhận">Đã xác nhận</option>
          <option value="Đang tiến hành">Đang tiến hành</option>
          <option value="Đã bị hủy">Đã bị hủy</option>
        </select>
      </p>
    </div>
  );
};

export default RequestDetail;
