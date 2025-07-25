import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import './RequestReceive.scss';
import { User, Phone, Mail, CalendarDays } from "lucide-react";
import { toast } from 'react-toastify';

// Map status code từ BE sang tiếng Việt
const mapStatus = (status) => {
  switch (status) {
    case 'Pending': return 'Đã đăng kí';
    case 'Confirmed': return 'Đã xác nhận';
    case 'Processing': return 'Đang tiến hành';
    case 'Canceled': return 'Đã bị hủy';
    default: return 'Không rõ';
  }
};

// Màu sắc theo trạng thái
const getStatusClass = (status) => {
  switch (status) {
    case 'Đã đăng kí': return 'status-label yellow';
    case 'Đã xác nhận': return 'status-label green';
    case 'Đang tiến hành': return 'status-label blue';
    case 'Đã bị hủy': return 'status-label red';
    default: return 'status-label gray';
  }
};

// Format ngày
const formatDate = (isoDate) => {
  if (!isoDate) return 'Không rõ';
  const date = new Date(isoDate);
  return date.toLocaleDateString('vi-VN');
};

const RequestList = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = user?.accessToken;

        if (!token) {
          toast.warning("Không tìm thấy accessToken. Vui lòng đăng nhập lại.");
          return;
        }

        const response = await axios.get('http://localhost:5294/api/BloodReceive/all', {
          headers: { Authorization: `Bearer ${token}` }
        });

        const data = response.data?.Data;
 
        if (data) {
          const formatted = data.map(item => ({
            id: item.RegisterId,
            userId: item.UserId,
            name: item.FullName || 'Không rõ',
            phone: item.PhoneNumber || 'Không rõ',
            email: item.Email || 'Không rõ',
            date: formatDate(item.RegisterDate),
            status: mapStatus(item.Status),
            img: item.Img || null,
  note: item.Notes || '',
          }));

          setRequests(formatted);
        } else {
          toast.error("Không nhận được danh sách yêu cầu.");
        }

      } catch (error) {
        console.error("Lỗi khi lấy danh sách yêu cầu nhận máu:", error);
        toast.error("Không thể tải danh sách yêu cầu nhận máu.");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="request-list">
      <h2>Danh sách yêu cầu nhận máu</h2>
      {requests.length === 0 ? (
        <p>Không có yêu cầu nào.</p>
      ) : (
        requests.map((req) => (
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
                onClick={() => navigate(`${req.id}`, { state: { request: req } })}
              >
                Chi tiết
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default RequestList;
