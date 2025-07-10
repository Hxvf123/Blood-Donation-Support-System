import React from "react";
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h3>Liên hệ tại</h3>
          <p>Cơ sở hiến máu nhân đạo</p>
          <p>Địa chỉ: 123 đường abc, F. xyz, Q. def, TP.HCM</p>
          <p>Điện thoại: (+84) 123 456 789</p>
          <p>Email: blood_donation@gmail.com</p>
        </div>

        <div className="footer-column">
          <h3>Liên kết nhanh</h3>
          <ul>
            <li><a href="/home">Trang chủ</a></li>
            <li><a href="/about">Về chúng tôi</a></li>
            <li><a href="/blog">Blog chia sẻ</a></li>
            <li><a href="/privacy-policy">Chính sách bảo mật</a></li>
          </ul>
        </div>

        <div className="footer-column social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <img src="7.jpg" alt="Facebook" />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
            <img src="9.jpg" alt="YouTube" />
          </a>
          <a href="https://zalo.me" target="_blank" rel="noopener noreferrer">
            <img src="8.jpg" alt="Zalo" />
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; copyright 2025
      </div>
    </footer>
  );
}

export default Footer;
