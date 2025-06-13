import React, { useState, useRef, useEffect } from "react";
import "./Header.scss";
import { Bell, LogIn } from "lucide-react";
import logo from '../Img/logo.png'
import NotificationPopup from './notiPopup'

export default function Header() {

    const [showPopup, setShowPopup] = useState(false);
    const bellRef = useRef(null);

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

    return (
        <header className="header">

            {/* Thanh giữa: logo + đăng nhập */}
            <div className="header__main">
                <div className="header__left"></div>

                <div className="header__logo">
                    <img src={logo} alt="Blood Donation" />
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
                    <li>Trang chủ</li>
                    <li>Tin tức</li>
                    <li>Đăng ký</li>
                    <li>Liên hệ</li>
                </ul>
            </nav>
        </header>
    );
}
