import React from "react";
import "./Contact.scss";
import logo from "../Img/logo.png";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
    return (
        <div className="contact-page">
            <div className="contact-box">
                <img src={logo} alt="Logo" className="contact-logo" />

                <h2 className="contact-name">Trung Tâm Hiến Máu Nhân Đạo</h2>

                <div className="contact-info">
                    <div className="contact-item">
                        <MapPin size={18} />
                        <span>123 Đường Hòa Bình, Quận 10, TP.HCM</span>
                    </div>

                    <div className="contact-item">
                        <Phone size={18} />
                        <span>(028) 1234 5678</span>
                    </div>

                    <div className="contact-item">
                        <Mail size={18} />
                        <span>lienhe@hienmautinhnguyen.vn</span>
                    </div>
                </div>

                <div className="social-icons">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <Facebook />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <Instagram />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <Twitter />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Contact;
