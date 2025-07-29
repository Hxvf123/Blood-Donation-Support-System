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
        const response = await axios.get("https://hienmau-se1864-eqfyh4edege7g5b0.koreacentral-01.azurewebsites.net/api/ReportLog/dashboard-summary");
        const apiData = response.data?.Data;

        if (apiData) {
          // Mapping từ API sang format cũ
          const mappedData = {
            totalEvents: apiData.TotalEvents,
            totalRegistrations: apiData.TotalDonationForms,
            totalBloodAvailable: apiData.TotalBloodAvailable,
            totalExpiredBlood: apiData.TotalBloodExpiry,
            totalUsedBlood: apiData.TotalBloodUsed,
            totalUsers: apiData.TotalUserRegisters,
            totalSuccessfulDonors: apiData.TotalDonorSuccessDonations,
            totalFailedDonors: apiData.TotalDonorFailDonations,
            totalCancelledRegistrations: apiData.TotalDonorCancels,
            totalReceivedBlood: apiData.TotalBloodRecipients,
          };
          setData(mappedData);
          console.log("Mapp", mappedData)
        } else {
          console.error("Không có dữ liệu từ API.");
        }
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    };

    fetchDashboardData();
  }, []);

const handleExportReport = () => {
    const downloadUrl = "https://hienmau-se1864-eqfyh4edege7g5b0.koreacentral-01.azurewebsites.net/api/ReportLog/export/aggregated-csv";
    // Mở link trong tab mới hoặc tải về
    window.open(downloadUrl, "_blank");
  };

  if (!data) {
    return <div>Đang tải dữ liệu...</div>;
  }

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
      <button className="export-btn" onClick={handleExportReport}>
        Xuất báo cáo
      </button>
    </div>
  );
};

export default Dashboard;
