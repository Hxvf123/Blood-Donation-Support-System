// Dashboard.jsx
import React, { useEffect, useState } from "react";
import DashboardCharts from "./DashboardChart";
import StatCard from "./StatCard";
import axios from "axios";
import "./Dashboard.scss";

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get("http://localhost:5294/api/ReportLog/dashboard-summary");
        const result = response.data;

        if (result.success && result.data?.DashboardSummary) {
          setData(result.data.DashboardSummary);
        } else {
          console.error("Không thể tải dữ liệu dashboard:", result.message);
        }
      } catch (error) {
        console.error("Lỗi khi gọi API dashboard-summary:", error);
      }
    };

    fetchDashboardData();
  }, []);

  if (!data) return <p>Đang tải dữ liệu...</p>;

  return (
    <div className="dashboard">
      <h2>Thống kê tổng quan</h2>
      <div className="dashboard__grid">
        <StatCard label="Tổng số sự kiện" value={data.totalEvents} />
        <StatCard label="Tổng đơn đăng ký hiến máu" value={data.totalDonationForms} />
        <StatCard label="Tổng lượng máu còn sử dụng" value={data.totalBloodAvailable} />
        <StatCard label="Tổng máu hết hạn" value={data.totalBloodExpiry} />
        <StatCard label="Tổng máu đã sử dụng" value={data.totalBloodUsed} />
        <StatCard label="Người dùng đã đăng ký tài khoản" value={data.totalUserRegisters} />
        <StatCard label="Người hiến máu thành công" value={data.totalDonorSuccessDonations} />
        <StatCard label="Người hiến thất bại" value={data.totalDonorFailDonations} />
        <StatCard label="Đơn đăng ký bị huỷ" value={data.totalDonorCancels} />
        <StatCard label="Tổng số máu đã nhận" value={data.totalBloodRecipients} />
      </div>

      <DashboardCharts data={{
        totalEvents: data.totalEvents,
        totalRegistrations: data.totalDonationForms,
        totalBloodAvailable: data.totalBloodAvailable,
        totalExpiredBlood: data.totalBloodExpiry,
        totalUsedBlood: data.totalBloodUsed,
        totalUsers: data.totalUserRegisters,
        totalSuccessfulDonors: data.totalDonorSuccessDonations,
        totalFailedDonors: data.totalDonorFailDonations,
        totalCancelledRegistrations: data.totalDonorCancels,
        totalReceivedBlood: data.totalBloodRecipients
      }} />
    </div>
  );
};

export default Dashboard;
