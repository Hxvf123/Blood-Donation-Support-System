import React from "react";
import HeaderManager from "../Component/HeaderManager"
import MenuManager from "../Component/Menu";
import Footer from "../Component/Footer";
import { Outlet } from "react-router";
import "./Manager.scss";

const ManagerLayout = () => {
  return (
    <div className="manager-layout">
      <div className="manager-menu">
        <MenuManager />
      </div>

      <div className="manager-main-content">
        <HeaderManager />
        <Outlet />
      </div>
    </div>
  );
};

export default ManagerLayout;
