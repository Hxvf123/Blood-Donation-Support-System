import React, { useState, useRef, useEffect } from "react";
import "./Header.scss";
import { useNavigate } from "react-router";
import { Bell, LogIn } from "lucide-react";
import logo from '../Img/logo.png'
import NotificationPopup from './notiPopup'

export default function Header() {

    const [showPopup, setShowPopup] = useState(false);
    const [showRegisterMenu, setShowRegisterMenu] = useState(false);
    const bellRef = useRef(null);
    const registerRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (bellRef.current && !bellRef.current.contains(event.target)) {
                setShowPopup(false);
            }
        };
        if (showPopup) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showPopup]);

    useEffect(() => {
        const handleClickOutsideMenu = (event) => {
            if (registerRef.current && !registerRef.current.contains(event.target)) {
                setShowRegisterMenu(false);
            }
        };
        if (showRegisterMenu) {
            document.addEventListener("mousedown", handleClickOutsideMenu);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutsideMenu);
        };
    }, [showRegisterMenu]);

    return (
        <header className="header">

            <div className="header__main">
                <div className="header__left"></div>

                <div className="header__logo" onClick={() => navigate("/")}>
                    <img src={logo} alt="Blood Donation" style={{ cursor: "pointer" }} />
                </div>

                <div className="header__actions">
                    <div className="notification-bell" ref={bellRef}>
                        <Bell
                            size={28}
                            style={{ cursor: "pointer" }}
                            onClick={() => setShowPopup((prev) => !prev)}
                        />
                        {showPopup && <NotificationPopup />}
                    </div>

                    <button className="login-button" onClick={() => alert("Chuyển đến trang đăng nhập")}>
                        <LogIn size={18} />
                        <span>Đăng Nhập</span>
                    </button>
                </div>
            </div>

            {/* Thanh menu */}
            <nav className="header__nav">
                <ul>
                    <li style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
                        Trang chủ
                    </li>
                    <li>Tin tức</li>
                    <li ref={registerRef} className="register-menu-parent" style={{ position: "relative" }}>
                        <span
                            className="register-menu-btn"
                            onClick={() => setShowRegisterMenu((prev) => !prev)}
                            style={{ cursor: "pointer" }}
                        >
                            Đăng ký
                        </span>
                        {showRegisterMenu && (
                            <div className="register-dropdown">
                                <a href="/donate/register">Hiến máu</a>
                                <a href="/receive/register">Nhận máu</a>
                            </div>
                        )}
                    </li>
                    <li>Liên hệ</li>
                </ul>
            </nav>
        </header>
    );
}
