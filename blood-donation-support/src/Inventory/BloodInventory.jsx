import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";
import "./BloodInventory.scss";

const COLORS = ["#FF6384", "#36A2EB", "#FFCE56"];

const BloodInventory = () => {
  const [summaryData, setSummaryData] = useState(null);

  useEffect(() => {
    axios.get("https://hienmau-se1864-eqfyh4edege7g5b0.koreacentral-01.azurewebsites.net/api/BloodInventory/summary-blood-inventory", {
      params: { userId: "USR001" }
    })
    .then(res => {
      const data = res.data.data.InventorySummary; 
      setSummaryData(data);
    })
    .catch(err => console.error("Lỗi khi gọi API:", err));
  }, []);

  if (!summaryData) return <p>Đang tải dữ liệu kho máu...</p>;

  const bloodGroupData = Object.entries(summaryData.totalVolumeByBloodType).map(([group, amount]) => ({
    group,
    amount
  }));

  const bloodComponentsByGroup = Object.entries(summaryData.totalVolumeByComponentType).reduce((acc, [component, volume]) => {
    const group = component === "Whole Blood" ? "O" : "A"; 
    if (!acc[group]) acc[group] = [];
    acc[group].push({ name: component, value: volume });
    return acc;
  }, {});

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
        <h4>Thành phần máu theo từng nhóm máu</h4>
        <div className="blood-group-charts">
          {Object.entries(bloodComponentsByGroup).map(([group, data]) => (
            <div className="blood-group-chart" key={group}>
              <h5>Nhóm máu {group}</h5>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    dataKey="value"
                  >
                    {data.map((_, i) => (
                      <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BloodInventory;
