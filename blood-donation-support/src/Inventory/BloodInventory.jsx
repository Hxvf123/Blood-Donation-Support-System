import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";
import "./BloodInventory.scss";

const COLORS = ["#FF6384", "#36A2EB", "#FFCE56"];

const bloodGroupData = [
  { group: "A", amount: 120 },
  { group: "B", amount: 95 },
  { group: "AB", amount: 60 },
  { group: "O", amount: 150 }
];

// Thành phần máu theo từng nhóm
const bloodComponentsByGroup = {
  A: [
    { name: "Hồng cầu", value: 60 },
    { name: "Tiểu cầu", value: 20 },
    { name: "Huyết tương", value: 40 },
  ],
  B: [
    { name: "Hồng cầu", value: 50 },
    { name: "Tiểu cầu", value: 25 },
    { name: "Huyết tương", value: 35 },
  ],
  AB: [
    { name: "Hồng cầu", value: 30 },
    { name: "Tiểu cầu", value: 15 },
    { name: "Huyết tương", value: 25 },
  ],
  O: [
    { name: "Hồng cầu", value: 70 },
    { name: "Tiểu cầu", value: 30 },
    { name: "Huyết tương", value: 50 },
  ],
};

const BloodInventory = () => {
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
          {Object.entries(bloodComponentsByGroup).map(([group, data], index) => (
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
