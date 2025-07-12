import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { Bell, LogIn } from "lucide-react";
import "./Header.scss";

import logo from "../Img/logo.png";
import defaultAvatar from "../Img/user.png";
import NotificationPopup from "./notiPopup";
import ROUTE_PATH from "../Constants/route";

export default function Header() {
    const [showPopup, setShowPopup] = useState(false);
    const [showRegisterMenu, setShowRegisterMenu] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);

    const bellRef = useRef(null);
    const registerRef = useRef(null);
    const userMenuRef = useRef(null);
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const scrollToNews = () => {
        const newsSection = document.getElementById("news-section");
        if (newsSection) {
            newsSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(() => {
        const mockUser = { name: "Nguyễn Văn A" };
        if (!localStorage.getItem("user")) {
            localStorage.setItem("user", JSON.stringify(mockUser));
        }
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (bellRef.current && !bellRef.current.contains(event.target)) {
                setShowPopup(false);
            }
            if (registerRef.current && !registerRef.current.contains(event.target)) {
                setShowRegisterMenu(false);
            }
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setShowUserMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/");
        window.location.reload();
    };

    return (
        <header className="header">
            <div className="header__main">
                <div className="header__left" />

                <div className="header__logo" onClick={() => navigate("/")}>
                    <img src={logo} alt="Blood Donation" style={{ cursor: "pointer" }} />
                </div>

                <div className="header__actions">
                    <div className="notification-bell" ref={bellRef}>
                        <Bell size={28} style={{ cursor: "pointer" }} onClick={() => setShowPopup((prev) => !prev)} />
                        {showPopup && <NotificationPopup />}
                    </div>

                    {user ? (
                        <div className="user-avatar" ref={userMenuRef}>
                            <img
                                src={defaultAvatar}
                                alt="avatar"
                                onClick={() => setShowUserMenu((prev) => !prev)}
                            />
                            <span className="username" onClick={() => setShowUserMenu((prev) => !prev)}>
                                {user.name}
                            </span>

                            {showUserMenu && (
                                <div className="user-menu">
                                    <div onClick={() => navigate(ROUTE_PATH.PROFILE)}>Thông tin cá nhân</div>
                                    <div onClick={() => navigate(ROUTE_PATH.HISTORY)}>Lịch sử hiến máu</div>
                                    <div className="logout" onClick={handleLogout}>Đăng xuất</div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button className="login-button" onClick={() => navigate(ROUTE_PATH.LOGIN)}>
                            <LogIn size={18} />
                            <span>Đăng Nhập</span>
                        </button>
                    )}
                </div>
            </div>

            <nav className="header__nav">
                <ul>
                    <li onClick={() => navigate("/")}>Trang chủ</li>
                    <li onClick={scrollToNews}>Tin tức</li>
                    <li ref={registerRef} className="register-menu-parent">
                        <span className="register-menu-btn" onClick={() => setShowRegisterMenu((prev) => !prev)}>
                            Đăng ký
                        </span>
                        {showRegisterMenu && (
                            <div className="register-dropdown">
                                <a href={ROUTE_PATH.BLOOD_DONATION}>Hiến máu</a>
                                <a href={ROUTE_PATH.BLOOD_RECEIVE}>Nhận máu</a>
                            </div>
                        )}
                    </li>
                    <li onClick={() => navigate("/contact")}>Liên hệ</li>
                </ul>
            </nav>
        </header>
    );
}
