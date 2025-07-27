import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";
import "./BloodInventory.scss";

const COLORS = ["#FF6384", "#36A2EB", "#FFCE56"];

const BloodInventory = () => {
  const [summaryData, setSummaryData] = useState(null);
  const [isManager, setIsManager] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.accessToken;

    // Kiểm tra role trước
    if (user?.role === "Manager") {
      setIsManager(true);

      const fetchData = async () => {
        try {
          const res = await axios.get("http://localhost:5294/api/BloodInventory/summary-blood-inventory", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setSummaryData(res.data.Data);
        } catch (err) {
          console.error("Lỗi khi gọi API:", err);
        }
      };

      fetchData();
    }
  }, []);

  if (!isManager) {
    return (
      <div className="create-event-page">
        <ToastContainer />
        <h2 style={{ color: "red", textAlign: "center", marginTop: "100px" }}>
          Bạn không có quyền truy cập trang này.
        </h2>
      </div>
    );
  }

  if (!summaryData) return <p>Đang tải dữ liệu kho máu...</p>;

  const bloodGroupData = Object.entries(summaryData.TotalVolumeByBloodType).map(([group, amount]) => ({
    group,
    amount,
  }));

  const bloodComponentData = Object.entries(summaryData.TotalVolumeByComponentType).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="blood-inventory">
      <h2>Quản lý kho máu</h2>

      <div className="chart-section">
        <h4>Tổng số lượng máu theo nhóm máu</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={bloodGroupData}>
            <XAxis dataKey="group" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#007bff" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-section">
        <h4>Thành phần máu trong kho</h4>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={bloodComponentData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              dataKey="value"
            >
              {bloodComponentData.map((_, i) => (
                <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BloodInventory;
