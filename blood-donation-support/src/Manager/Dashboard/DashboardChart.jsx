// components/Dashboard/DashboardCharts.jsx
import React from "react";
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, CartesianGrid
} from "recharts";

const COLORS = ['#00C49F', '#FF8042', '#FFBB28', '#8884d8'];

const DashboardCharts = ({ data }) => {
  if (!data) return null;

  // 1. Pie chart - Tình trạng máu
  const bloodStats = [
    { name: 'Còn sử dụng', value: data.totalBloodAvailable },
    { name: 'Đã dùng', value: data.totalUsedBlood },
    { name: 'Hết hạn', value: data.totalExpiredBlood },
    { name: 'Đã nhận', value: data.totalReceivedBlood },
  ];

  // 2. Bar chart - Hiến máu thành công/thất bại/hủy
  const donationResult = [
    { name: "Thành công", value: data.totalSuccessfulDonors },
    { name: "Thất bại", value: data.totalFailedDonors },
    { name: "Bị hủy", value: data.totalCancelledRegistrations },
  ];

  // 3. Line chart - Sự kiện và đăng ký (đơn giản, hoặc dùng dữ liệu theo thời gian sau)
  const activityTrend = [
    { name: "Tổng sự kiện", value: data.totalEvents },
    { name: "Đơn đăng ký", value: data.totalRegistrations },
    { name: "Người dùng", value: data.totalUsers },
  ];

  return (
    <div className="dashboard-charts" style={{ padding: '20px' }}>
      <h3>Biểu đồ thống kê</h3>

      {/* Pie chart - Máu */}
      <h4>Tình trạng lượng máu</h4>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={bloodStats}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
          >
            {bloodStats.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      {/* Bar chart - Hiến máu kết quả */}
      <h4>Kết quả hiến máu</h4>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={donationResult}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#00A6ED" />
        </BarChart>
      </ResponsiveContainer>

      {/* Line chart - Hoạt động chung */}
      <h4>Hoạt động tổng quan</h4>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={activityTrend}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#FF8042" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardCharts;