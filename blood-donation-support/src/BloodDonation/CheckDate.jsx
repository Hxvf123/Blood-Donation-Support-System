import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import axios from "axios";
import "../userInfoForm/userInfoForm.scss";
import "./CheckDate.scss";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import ROUTE_PATH from "../Constants/route";

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

const CheckDate = ({ data, onBack, onSubmit }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = user?.accessToken;

        const res = await axios.get("http://localhost:5294/GetAllEvents", {
          headers: { Authorization: `Bearer ${token}` }
        });

        const fetchedEvents = res.data?.Data;

        if (!Array.isArray(fetchedEvents)) {
          console.warn("Events không phải là mảng hợp lệ:", fetchedEvents);
          setEvents([]);
        } else {
          const formattedEvents = fetchedEvents.map((ev) => ({
            eventId: ev.EventId,
            eventName: ev.EventName,
            donationLocation: ev.DonationLocation,
            startDate: ev.StartDate,
            endDate: ev.EndDate,
            description: ev.Description,
            img: ev.Img,
          }));
          setEvents(formattedEvents);
        }

      } catch (err) {
        console.error("Lỗi khi tải danh sách sự kiện:", err);
        alert("Không thể tải danh sách sự kiện hiến máu.");
      }
    };

    fetchEvents();
  }, []);



  const handleSubmit = async () => {
    if (!selectedDate || isNaN(new Date(selectedDate))) {
      return alert("Vui lòng chọn ngày hiến máu hợp lệ!");
    }

    if (!selectedEventId) {
      return alert("Vui lòng chọn địa điểm hiến máu!");
    }

    try {
      setLoading(true);

      const user = JSON.parse(localStorage.getItem('user'));
      const token = user?.accessToken;

      const payload = {
        registerDate: selectedDate.toISOString().split("T")[0],
        donationId: selectedEventId
      };

      console.log("payload:", payload);

      const res = await axios.post("http://localhost:5294/api/BloodDonation/register-donation", payload,
        {
          headers: { Authorization: `Bearer ${token}` }
        });

      const responseData = res.data;
      const registerResult = responseData.registerId;

      if (!registerResult.Success) {
        toast.error(registerResult.Message || "Đăng ký thất bại!");
        navigate("/");
        return;
      }

      onSubmit?.({
        ...data,
        donationDate: selectedDate,
        donationId: selectedEventId
      });

    } catch (error) {
      console.error("loi:", error);

      const errMsg =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Đăng ký thất bại. Vui lòng thử lại.";


      alert(errMsg);
    } finally {
      setLoading(false);
    }
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
        {bloodTypes.find(bt => bt.id === data.bloodGroup)?.name}
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
        <button className="register-button back-button" onClick={() => navigate(ROUTE_PATH.UPDATE)}>
          Chỉnh sửa
        </button>
        <button
          className="register-button continue-button"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Đang gửi..." : "Đăng ký"}
        </button>
      </div>
    </div>
  );
};

export default CheckDate;