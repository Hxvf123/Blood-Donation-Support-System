import React from 'react';
import { useNavigate } from 'react-router';
import './RequestReceive.scss';
import { User, Phone, Mail, CalendarDays } from "lucide-react";

const mockRequests = [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    phone: '0123 456 789',
    email: 'abcxyz@gmail.com',
    date: '23/06/2025',
    status: 'Đã đăng kí',
  },
  {
    id: 2,
    name: 'Trần Thị B',
    phone: '0987 654 321',
    email: 'example@gmail.com',
    date: '24/06/2025',
    status: 'Đã xác nhận',
  },
  {
    id: 3,
    name: 'Lê Văn C',
    phone: '0365 987 123',
    email: 'le@example.com',
    date: '25/06/2025',
    status: 'Đang tiến hành',
  },
  {
    id: 4,
    name: 'Phạm Thị D',
    phone: '0912 345 678',
    email: 'pham@example.com',
    date: '26/06/2025',
    status: 'Đã bị hủy',
  },
];

const getStatusClass = (status) => {
  switch (status) {
    case 'Đã đăng kí':
      return 'status-label yellow';
    case 'Đã xác nhận':
      return 'status-label green';
    case 'Đang tiến hành':
      return 'status-label blue';
    case 'Đã bị hủy':
      return 'status-label red';
    default:
      return 'status-label gray';
  }
};

const RequestList = () => {
  const navigate = useNavigate();

  return (
    <div className="request-list">
      <h2>Danh sách yêu cầu nhận máu</h2>
      {mockRequests.map((req) => (
        <div key={req.id} className="request-card">
          <div className="request-info">
            <p><User size={16} style={{ marginRight: 6 }} /> <strong>{req.name}</strong></p>
            <p><Phone size={16} style={{ marginRight: 6 }} /> {req.phone}</p>
            <p><Mail size={16} style={{ marginRight: 6 }} /> {req.email}</p>
            <p><CalendarDays size={16} style={{ marginRight: 6 }} /> {req.date}</p>
          </div>
          <div className="request-actions">
            <span className={getStatusClass(req.status)}>{req.status}</span>
            <button
              className="detail-button"
              onClick={() =>
                navigate(`${req.id}`)
              }
            >
              Chi tiết
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RequestList;

