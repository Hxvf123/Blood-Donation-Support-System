import React from "react";
import "./notiPopup.scss";

const notifications = [
  "Bạn có lịch hiến máu vào ngày 20/06/2025.",
  "Cảm ơn bạn đã đăng ký hiến máu!",
  "Tin mới: Đợt hiến máu cộng đồng tháng 7 sắp diễn ra."
];

const NotificationPopup = () => (
  <div className="notification-popup">
    <div className="popup-header">Thông báo</div>
    <ul>
      {notifications.length === 0 ? (
        <li className="text-muted">Không có thông báo mới</li>
      ) : (
        notifications.map((msg, idx) => <li key={idx}>{msg}</li>)
      )}
    </ul>
  </div>
);

export default NotificationPopup;
