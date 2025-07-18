import React from "react";
import "./StatCard.scss";

const StatCard = ({ label, value }) => {
  return (
    <div className="stat-card">
      <h4>{label}</h4>
      <p>{value}</p>
    </div>
  );
};

export default StatCard;
