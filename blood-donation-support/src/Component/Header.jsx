import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { Bell, LogIn } from "lucide-react";
import "./Header.scss";

import logo from "../Img/logo.png";
import defaultAvatar from "../Img/user.png";
import ROUTE_PATH from "../Constants/route";
import { auth } from "../Firebase/firebase";

export default function Header() {
    
    const [showRegisterMenu, setShowRegisterMenu] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);

    
    const registerRef = useRef(null);
    const userMenuRef = useRef(null);
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        const handleClickOutside = (event) => {
            
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
        auth.signOut().then(() => {
            localStorage.removeItem("user");
            navigate("/");
            window.location.reload();
        });
    };

    const scrollToEvents = () => {
        const section = document.getElementById("event-section");
        if (section) section.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <header className="header">
            <div className="header__main">
                <div className="header__left" />

                <div className="header__logo" onClick={() => navigate("/")}>
                    <img src={logo} alt="Blood Donation" style={{ cursor: "pointer" }} />
                </div>

                <div className="header__actions">
                    

                    {user ? (
                        <div className="user-avatar" ref={userMenuRef}>
                            <img src={defaultAvatar} alt="avatar" onClick={() => setShowUserMenu((prev) => !prev)} />
                            <span className="username" onClick={() => setShowUserMenu((prev) => !prev)}>
                                {user.name || "Người dùng"}
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
                    <li onClick={scrollToEvents}>Sự kiện</li>
                    <li ref={registerRef} className="register-menu-parent">
                        <span className="register-menu-btn" onClick={() => setShowRegisterMenu((prev) => !prev)}>Đăng ký</span>
                        {showRegisterMenu && (
                            <div className="register-dropdown">
                                <a
                                    href={ROUTE_PATH.LOGIN}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        const user = JSON.parse(localStorage.getItem("user"));
                                        if (!user) {
                                            navigate(ROUTE_PATH.LOGIN, {
                                                state: { message: "Bạn phải đăng nhập trước!" },
                                            });
                                        } else {
                                            navigate(ROUTE_PATH.BLOOD_DONATION, { 
                                            });
                                        }
                                    }}
                                >
                                    Hiến máu
                                </a>

                                <a
                                    href={ROUTE_PATH.LOGIN}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        const user = JSON.parse(localStorage.getItem("user"));
                                        if (!user) {
                                            navigate(ROUTE_PATH.LOGIN, {
                                                state: { message: "Bạn phải đăng nhập trước!" },
                                            });
                                        } else {
                                            navigate(ROUTE_PATH.BLOOD_RECEIVE);
                                        }
                                    }}
                                >
                                    Nhận máu
                                </a>

                            </div>
                        )}
                    </li>
                    <li onClick={() => navigate(ROUTE_PATH.CONTACT)}>Liên hệ</li>
                </ul>
            </nav>
        </header>
    );
}