import React from 'react';
import { useNavigate } from 'react-router';
import ROUTE_PATH from '../Constants/route';
import './RequestList.scss';

const mockRequests = [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    phone: '0123 456 789',
    email: 'abcxyz@gmail.com',
    date: '23/06/2025',
    status: 'Đã đăng kí',
  },
  // Có thể thêm nhiều dữ liệu khác...
];

const getStatusClass = (status) => {
  switch (status) {
    case 'Đã đăng kí':
      return 'status yellow';
    case 'Đã xác nhận':
      return 'status green';
    case 'Đang tiến hành':
      return 'status blue';
    case 'Đã bị hủy':
      return 'status red';
    default:
      return 'status gray';
  }
};

const RequestList = () => {
  const navigate = useNavigate();

  return (
    <div className="request-list">
      {mockRequests.map((req) => (
        <div key={req.id} className="request-card">
          <div className="info">
            <div><i className="fas fa-user"></i> {req.name}</div>
            <div><i className="fas fa-phone"></i> {req.phone}</div>
            <div><i className="fas fa-envelope"></i> {req.email}</div>
            <div><i className="fas fa-calendar-alt"></i> {req.date}</div>
          </div>
          <div className="actions">
            <span className={getStatusClass(req.status)}>{req.status}</span>
            <button onClick={() => navigate(`${ROUTE_PATH.REQUEST_DETAIL.replace(':id', req.id)}`)}>Chi tiết</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RequestList;
