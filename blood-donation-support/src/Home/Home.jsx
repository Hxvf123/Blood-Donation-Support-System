import React from "react";
import "./Home.scss";
import DonationInfo from "./donationInfo";

import Banner from "../Img/banner.jpg";
import aboutUs from "../Img/aboutUs.jpg";
import news1 from "../Img/news1.jpg"
import news2 from "../Img/news2.jpg"
import news3 from "../Img/news3.jpg"

const Home = () => {
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
            <section className="about-us">
                <h2 className="about-us_title">Về chúng tôi</h2>
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
            <section className="news">
                <h2>Tin tức</h2>
                <div className="news__items">
                    <article className="news__item">
                        <img
                            src={news1}
                            alt="Tin tức 1"
                        />
                        <h4>Ngày Thế giới hiến máu tình nguyện 14/6</h4>
                        <p>
                            Ngày Thế giới hiến máu tình nguyện 14/6 nhằm tôn vinh những người
                            hiến máu tình nguyện và nâng cao nhận thức về việc hiến máu cứu
                            người.
                        </p>
                    </article>
                    <article className="news__item">
                        <img
                            src={news2}
                            alt="Tin tức 2"
                        />
                        <h4>Truyền thông hiến máu an toàn</h4>
                        <p>
                            Các chương trình truyền thông nhằm nâng cao nhận thức về an toàn
                            trong hiến máu và tiếp nhận máu.
                        </p>
                    </article>
                    <article className="news__item">
                        <img
                            src={news3}
                            alt="Tin tức 3"
                        />
                        <h4>Chương trình hiến máu tình nguyện</h4>
                        <p>
                            Tham gia các chương trình hiến máu tình nguyện để cứu giúp nhiều
                            người bệnh.
                        </p>
                    </article>
                </div>
            </section>

            {/* Blog */}
            <section className="blog">
                <h2>Blog</h2>
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
