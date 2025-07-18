import React from "react";
import { BarChart2, Droplet, ClipboardList, CalendarHeart, User } from "lucide-react";
import { NavLink } from "react-router";
import "./Menu.scss";
import logo from "../Img/logo.png";
import ROUTE_PATH from "../Constants/route";

const MenuManager = () => {
    return (
        <div className="manager-menu">
            <div className="logo">
                <img src={logo} alt="Logo" className="logo" />
            </div>

            <nav className="menu">
                <ul>
                    <NavLink
                        to={ROUTE_PATH.DASHBOARD}
                        end
                        className={({ isActive }) => `menu-item ${isActive ? "active" : ""}`}>
                        <BarChart2 size={20} />
                        <span>Thống kê</span>
                    </NavLink>

                    <NavLink
                        to={ROUTE_PATH.INVENTORY}
                        className={({ isActive }) => `menu-item ${isActive ? "active" : ""}`}>
                        <Droplet size={20} />
                        <span>Kho máu</span>
                    </NavLink>

                    <NavLink
                        to={ROUTE_PATH.REQUEST_LIST}
                        className={({ isActive }) => `menu-item ${isActive ? "active" : ""}`}>
                        <ClipboardList size={20} />
                        <span>Yêu cầu</span>
                    </NavLink>

                    <NavLink
                        to={ROUTE_PATH.EVENT}
                        end
                        className={({ isActive }) => `menu-item ${isActive ? "active" : ""}`}>
                        <CalendarHeart size={20} />
                        <span>Tạo sự kiện</span>
                    </NavLink>

                    <NavLink
                        to={ROUTE_PATH.MANAGE_ACCOUNT}
                        end
                        className={({ isActive }) => `menu-item ${isActive ? "active" : ""}`}>
                        <User size={20} />
                        <span>Quản lí tài khoản</span>
                    </NavLink>
                </ul>
            </nav>
        </div>
    );
};

export default MenuManager;
