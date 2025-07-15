import React, { useEffect, useRef, useState } from "react";
import { Bell, User } from "lucide-react";
import "./HeaderManager.scss";
import NotificationPopup from "./notiPopup";

const HeaderManager = () => {
    const [userName, setUserName] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const bellRef = useRef(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser?.name) {
            setUserName(storedUser.name);
        }
    }, []);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (bellRef.current && !bellRef.current.contains(e.target)) {
                setShowPopup(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className="header-manager">
            <div className="header-manager__right">
                <div className="notification-bell" ref={bellRef}>
                    <Bell size={28} style={{ cursor: "pointer" }} onClick={() => setShowPopup((prev) => !prev)} />
                    {showPopup && <NotificationPopup />}
                </div>
                <User className="icon" />
                <span className="username">{userName || "Quản lý"}</span>
            </div>
        </header>
    );
};

export default HeaderManager;
