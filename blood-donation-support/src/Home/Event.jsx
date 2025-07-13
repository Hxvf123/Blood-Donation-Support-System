import React, { useEffect, useRef, useState } from "react";
import news1 from "../Img/news1.jpg";
import news2 from "../Img/news2.jpg";
import news3 from "../Img/news3.jpg";
import "./Event.scss";

const NewsCarousel = () => {
    const carouselRef = useRef(null);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!isPaused && carouselRef.current) {
                const container = carouselRef.current;
                const itemWidth = container.querySelector(".news__item").offsetWidth + 24;

                if (container.scrollLeft + container.offsetWidth >= container.scrollWidth - 5) {
                    setIsPaused(true);
                    setTimeout(() => {
                        container.scrollTo({ left: 0, behavior: "smooth" });
                        setIsPaused(false);
                    }, 800);
                } else {
                    container.scrollBy({ left: itemWidth, behavior: "smooth" });
                }
            }
        }, 2000);

        return () => clearInterval(interval);
    }, [isPaused]);

    const scrollLeft = () => {
        const itemWidth = carouselRef.current.querySelector(".news__item").offsetWidth + 24;
        carouselRef.current.scrollBy({ left: -itemWidth, behavior: "smooth" });
    };

    const scrollRight = () => {
        const itemWidth = carouselRef.current.querySelector(".news__item").offsetWidth + 24;
        carouselRef.current.scrollBy({ left: itemWidth, behavior: "smooth" });
    };

    const newsItems = [
        {
            img: news1,
            title: "Ngày Thế giới hiến máu tình nguyện 14/6",
            desc: "Tôn vinh người hiến máu và nâng cao nhận thức hiến máu cứu người.",
        },
        {
            img: news2,
            title: "Truyền thông hiến máu an toàn",
            desc: "Chương trình nâng cao nhận thức về an toàn khi hiến máu.",
        },
        {
            img: news3,
            title: "Chương trình hiến máu tình nguyện",
            desc: "Tham gia hiến máu để cứu giúp người bệnh.",
        },
    ];

    const loopItems = [...newsItems, ...newsItems];

    return (
        <section className="news">
            <h2>Sự kiện</h2>
            <div
                className="news-carousel-container"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                <button className="scroll-btn left" onClick={scrollLeft}>
                    &#10094;
                </button>
                <div className="news-carousel" ref={carouselRef}>
                    <div className="carousel-track">
                        {loopItems.map((item, index) => (
                            <article className="news__item" key={index}>
                                <img src={item.img} alt={item.title} />
                                <h4>{item.title}</h4>
                                <p>{item.desc}</p>
                            </article>
                        ))}
                    </div>
                </div>
                <button className="scroll-btn right" onClick={scrollRight}>
                    &#10095;
                </button>
            </div>
        </section>
    );
};

export default NewsCarousel;
