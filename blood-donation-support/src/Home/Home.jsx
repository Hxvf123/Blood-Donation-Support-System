import React from "react";
import "./Home.scss";
import { useLocation } from "react-router";
import { useEffect } from "react";
import { toast } from "react-toastify";
import DonationInfo from "./donationInfo";
import Event from "./Event";

import Banner from "../Img/banner.jpg";
import aboutUs from "../Img/aboutUs.jpg";

const Home = () => {
    const location = useLocation();

    useEffect(() => {
        if (location.state?.message) {
            toast.success(location.state.message);
            window.history.replaceState({}, document.title);
        }
    }, [location]);
    return (
        <div className="home-container">
            <section className="banner">
                <img
                    className="banner__image"
                    src={Banner}
                    alt="Banner"
                />
                <div className="banner__form">
                    <h2>Bạn cần đặt lịch vào thời gian nào?</h2>
                    <div className="banner__date-range">
                        <label>Chọn ngày:</label>
                        <input type="date" name="fromDate" />
                        <button
                            className="search-btn"
                            type="button"
                            onClick={() => alert(`Tìm kiếm`)}
                        >
                            Tìm kiếm
                        </button>
                    </div>
                </div>
            </section>

            {/* Về chúng tôi */}
            <section className="about-us" id="about-us">
                <h2 className="about-us_title">VỀ CHÚNG TÔI</h2>
                <div className="about-us__content">
                    <div className="about-us__text">
                        <p>
                            Là một cơ sở y tế uy tín và có nhiều kinh nghiệm về việc hiến máu
                            trước đây, Đã giúp đỡ được nhiều ca truyền máu trên khắp cả nước,
                            Được nhiều bệnh nhân tin tưởng và sử dụng
                        </p>
                    </div>
                    <div className="about-us__image">
                        <img
                            src={aboutUs}
                            alt="Hiến máu"
                        />
                    </div>
                </div>
            </section>

            {/* Ai có thể hiến máu */}
            <section className="donation_info">
                <DonationInfo />
            </section>

            {/* Tin tức */}
            <section className="news" id="news-section">
                <Event />
            </section>

            {/* Blog */}
            <section className="blog" id="blog">
                <h2>BLOG</h2>
                <div className="blog__container">
                    <div className="blog__list">
                        <div className="blog__item">
                            <h4>Thông tin hiến máu</h4>
                            <p>Những kiến thức cần biết khi tham gia hiến máu.</p>
                        </div>
                        <div className="blog__item">
                            <h4>Chia sẻ câu chuyện</h4>
                            <p>Câu chuyện cảm động về những người hiến máu.</p>
                        </div>
                        <div className="blog__item">
                            <h4>Hướng dẫn đăng ký</h4>
                            <p>Hướng dẫn chi tiết cách đăng ký hiến máu trực tuyến.</p>
                        </div>
                    </div>
                    <div className="blog__featured">
                        <p>Đây là khu vực dành cho bài viết nổi bật hoặc bình luận.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
