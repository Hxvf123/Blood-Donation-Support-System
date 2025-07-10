import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ username, isLoggedIn }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showRegisterDropdown, setShowRegisterDropdown] = useState(false);
  const navigate = useNavigate();

  const toggleRegisterDropdown = () => {
    setShowRegisterDropdown(!showRegisterDropdown);
  };

  const handleLogout = () => {
    navigate('/logout');
  };

  return (
    <header className="header">
      <div className="logo">
        <img src="5.png" alt="Logo" />
        <span>Blood Donation</span>
      </div>

      <nav className="navbar">
        <ul>
          <li><Link to="/">Trang chủ</Link></li>
          <li><Link to="/blogs">Tin tức</Link></li>

          <li className="dropdown">
            <span className="dropbtn" onClick={toggleRegisterDropdown}>
              Đăng kí
            </span>
            {showRegisterDropdown && (
              <div className="dropdown-content">
                <Link to="/donation">Hiến máu</Link>
                <Link to="/register-receive">Nhận máu</Link>
              </div>
            )}
          </li>

          <li><Link to="/contact">Liên hệ</Link></li>
        </ul>
      </nav>

      <div className="header-actions">
        {/* ✅ Chỉ hiển thị menu nếu đã đăng nhập */}
        {isLoggedIn && (
          <>
            <span
              className="username"
              style={{ fontWeight: 'bold', cursor: 'pointer' }}
              onClick={() => setShowMenu(!showMenu)}
            >
              <img
                src="/avatar.jpg"
                alt="avatar"
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  marginRight: 8,
                  verticalAlign: 'middle'
                }}
              />
              {username}
              {showMenu && (
                <div className="user-menu">
                  <ul>
                    <li><Link to="/profile">Thông tin cá nhân</Link></li>
                    <li><Link to="/history">Lịch sử hiến máu</Link></li>
                    <li>
                      <button onClick={handleLogout} className="logout-button">Đăng xuất</button>
                    </li>
                  </ul>
                </div>
              )}
            </span>

            <button className="notification-btn">
              <i className="fas fa-bell" style={{ color: 'black', fontSize: '24px' }}></i>
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
