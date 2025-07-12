import React from "react";
import DashboardCharts from "./DashboardChart";
import StatCard from "./StatCard";
import "./Dashboard.scss";

const mockData = {
  totalEvents: 18,
  totalRegistrations: 142,
  totalBloodAvailable: 90,
  totalExpiredBlood: 10,
  totalUsedBlood: 65,
  totalUsers: 210,
  totalSuccessfulDonors: 120,
  totalFailedDonors: 15,
  totalCancelledRegistrations: 7,
  totalReceivedBlood: 80
};

const Dashboard = () => {
  const data = mockData;

  return (
    <div className="dashboard">
      <h2>Thống kê tổng quan</h2>
      <div className="dashboard__grid">
        <StatCard label="Tổng số sự kiện" value={data.totalEvents} />
        <StatCard label="Tổng đơn đăng ký hiến máu" value={data.totalRegistrations} />
        <StatCard label="Tổng lượng máu còn sử dụng" value={data.totalBloodAvailable} />
        <StatCard label="Tổng máu hết hạn" value={data.totalExpiredBlood} />
        <StatCard label="Tổng máu đã sử dụng" value={data.totalUsedBlood} />
        <StatCard label="Người dùng đã đăng ký tài khoản" value={data.totalUsers} />
        <StatCard label="Người hiến máu thành công" value={data.totalSuccessfulDonors} />
        <StatCard label="Người hiến thất bại" value={data.totalFailedDonors} />
        <StatCard label="Đơn đăng ký bị huỷ" value={data.totalCancelledRegistrations} />
        <StatCard label="Tổng số máu đã nhận" value={data.totalReceivedBlood} />
      </div>

      <DashboardCharts data={data} />
    </div>
  );
};

export default Dashboard;
