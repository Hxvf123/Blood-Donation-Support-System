import React, { useEffect, useState } from "react";
import { User } from "lucide-react";
import "./HeaderManager.scss";

const HeaderManager = () => {
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser?.name) {
            setUserName(storedUser.name);
        }
    }, []);

    return (
        <header className="header-manager">
            <div className="header-manager__right">
                <User className="icon" />
                <span className="username">{userName || "Quản lý"}</span>
            </div>
        </header>
    );
};

export default HeaderManager;