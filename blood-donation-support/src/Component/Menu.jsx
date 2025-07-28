import React, { useEffect, useState } from "react";
import {
    BarChart2,
    Droplet,
    ClipboardList,
    CalendarHeart,
    User,
    LogOut,
    Inbox,
    HandHeart,
    ScanLine
} from "lucide-react";
import { NavLink, useNavigate, useLocation } from "react-router";
import "./Menu.scss";
import logo from "../Img/logo.png";
import ROUTE_PATH from "../Constants/route";
import { getAuth } from "firebase/auth";

const MenuManager = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [showRequestSub, setShowRequestSub] = useState(
        location.pathname.startsWith("/requests")
    );

    useEffect(() => {
        if (!location.pathname.startsWith("/requests")) {
            setShowRequestSub(false);
        }
    }, [location.pathname]);

    const handleLogout = async () => {
        const auth = getAuth();
        await auth.signOut();
        localStorage.removeItem("user");
        navigate(ROUTE_PATH.HOME);
    };

    const toggleRequestSub = () => {
        setShowRequestSub((prev) => !prev);
    };

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

                    <div className={`menu-item ${showRequestSub ? "active" : ""}`} onClick={toggleRequestSub}>
                        <ClipboardList size={20} />
                        <span>Yêu cầu</span>
                    </div>

                    {showRequestSub && (
                        <div className="sub-menu">
                            <NavLink
                                to={ROUTE_PATH.REQUEST_DONATION}
                                className={({ isActive }) => `menu-item sub ${isActive ? "active" : ""}`}>
                                <Inbox size={18} />
                                <span>Hiến máu</span>
                            </NavLink>

                            <NavLink
                                to={ROUTE_PATH.REQUEST_RECEIVE}
                                className={({ isActive }) => `menu-item sub ${isActive ? "active" : ""}`}>
                                <HandHeart size={18} />
                                <span>Nhận máu</span>
                            </NavLink>
                        </div>
                    )}

                    <NavLink
                        to={ROUTE_PATH.EVENT}
                        end
                        className={({ isActive }) => `menu-item ${isActive ? "active" : ""}`}>
                        <CalendarHeart size={20} />
                        <span>Tạo sự kiện</span>
                    </NavLink>

                    <NavLink
                        to={ROUTE_PATH.CHECKIN}
                        end
                        className={({ isActive }) => `menu-item ${isActive ? "active" : ""}`}>
                        <ScanLine size={20} />
                        <span>Check-in</span>
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

            <div className="logout-section">
                <button className="menu-item logout-button" onClick={handleLogout}>
                    <LogOut size={20} />
                    <span>Đăng xuất</span>
                </button>
            </div>
        </div>
    );
};

export default MenuManager;
