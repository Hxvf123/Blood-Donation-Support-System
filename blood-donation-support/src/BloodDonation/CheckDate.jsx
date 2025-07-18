import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import axios from "axios";
import "../userInfoForm/userInfoForm.scss";
import "./CheckDate.scss";
import { getAuth } from "firebase/auth";

const bloodTypes = [
  { id: "BTI001", name: "A+" },
  { id: "BTI002", name: "A−" },
  { id: "BTI003", name: "B+" },
  { id: "BTI004", name: "B−" },
  { id: "BTI005", name: "O+" },
  { id: "BTI006", name: "O−" },
  { id: "BTI007", name: "AB+" },
  { id: "BTI008", name: "AB−" }
];

const CheckDate = ({ data, onBack, onSubmit }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) return alert("Vui lòng đăng nhập trước khi tiếp tục");

        const token = await user.getIdToken();
        const res = await axios.get("http://localhost:5294/GetAllEvents", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setEvents(res.data.data);
      } catch (err) {
        console.error("Lỗi khi tải danh sách sự kiện:", err);
        alert("Không thể tải danh sách sự kiện hiến máu.");
      }
    };

    fetchEvents();
  }, []);

  const handleContinue = () => {
    if (!selectedDate || isNaN(new Date(selectedDate))) {
      return alert("Vui lòng chọn ngày hiến máu hợp lệ!");
    }

    if (!selectedEventId) {
      return alert("Vui lòng chọn địa điểm hiến máu!");
    }

    const finalData = {
      ...data,
      registerDate: selectedDate.toISOString(),
      donationId: selectedEventId
    };

    onSubmit(finalData);
  };

  if (!data) return null;

  return (
    <div className="form-container">
      <h2>Xác Nhận Thông Tin Và Ngày Hiến Máu</h2>

      <div className="info-group"><strong>Họ và tên:</strong> {data.fullName}</div>
      <div className="info-group">
        <strong>Ngày sinh:</strong>{" "}
        {data.birthDate ? format(new Date(data.birthDate), "dd/MM/yyyy") : ""}
      </div>
      <div className="info-group"><strong>Giới tính:</strong> {data.gender}</div>
      <div className="info-group"><strong>Số điện thoại:</strong> {data.phone}</div>
      <div className="info-group"><strong>Email:</strong> {data.email}</div>
      <div className="info-group"><strong>Địa chỉ:</strong> {data.address}</div>
      <div className="info-group">
        <strong>Nhóm máu:</strong>{" "}
        {bloodTypes.find(bt => bt.id === data.bloodGroup)?.name || ""}
      </div>

      <div className="info-group">
        <label><strong>Chọn ngày hiến máu:</strong></label>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="dd/MM/yyyy"
          className="form-control"
          placeholderText="Chọn ngày"
          minDate={new Date()}
        />
      </div>

      <div className="info-group">
        <label><strong>Chọn địa điểm hiến máu:</strong></label>
        <select
          value={selectedEventId}
          onChange={(e) => setSelectedEventId(e.target.value)}
          className="form-control"
        >
          <option value="">-- Chọn địa điểm --</option>
          {events.map((ev) => (
            <option key={ev.eventId} value={ev.eventId}>
              {ev.eventName} - {ev.donationLocation}
            </option>
          ))}
        </select>
      </div>

      <div className="buttons">
        <button className="register-button back-button" onClick={onBack}>
          Chỉnh sửa
        </button>
        <button
          className="register-button continue-button"
          onClick={handleContinue}
          disabled={loading}
        >
          Tiếp theo
        </button>
      </div>
    </div>
  );
};

export default CheckDate;
