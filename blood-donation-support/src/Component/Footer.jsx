import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Footer.scss";
import mxh from '../Img/mxh.png';

const Footer = () => (
    <footer className="footer bg-primary text-white pt-4 pb-2">
        <div className="container">
            <div className="row align-items-start">
                {/* Liên hệ */}
                <div className="col-md-4 mb-3">
                    <h5 className="mb-2">Liên hệ tại</h5>
                    <div className="mb-1">Cơ sở hiến máu nhân đạo</div>
                    <div className="small">
                        <div>Địa chỉ: 123 đường abc, F. xyz, Q. def, TP.HCM</div>
                        <div>Điện thoại: (+84) 123 456 789</div>
                        <div>Email: blood_donation@gmail.com</div>
                    </div>
                </div>

                {/* Liên kết nhanh */}
                <div className="col-md-4 mb-3">
                    <h5 className="mb-2">Liên kết nhanh</h5>
                    <ul className="list-unstyled mb-2">
                        <li><a href="#" className="footer-link">Trang chủ</a></li>
                        <li><a href="#" className="footer-link">Về chúng tôi</a></li>
                        <li><a href="#" className="footer-link">Blog chia sẻ</a></li>
                        <li><a href="#" className="footer-link">Chính sách bảo mật</a></li>
                    </ul>
                </div>

                {/* Mạng xã hội */}
                <div className="col-md-4 mb-3 d-flex flex-column align-items-center justify-content-center text-center">
                    <h5 className="mb-3">Kết nối mạng xã hội</h5>
                    <div className="d-flex gap-3 justify-content-center">
                        <img
                            src={mxh}
                            alt="Biểu tượng mạng xã hội"
                            className="footer-social-img"
                            style={{ width: "180px", maxWidth: "100%" }}
                        />
                    </div>
                </div>
            </div>
            <hr className="footer-divider" />
            <div className="text-center mt-3 small footer-bottom">
                &copy; copyright2025
            </div>
        </div>
    </footer>
);

export default Footer;
