import React from "react";
import { FaHeart } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { AiFillCalendar } from "react-icons/ai";
import "./DonationCard.scss";
import HistoryBlood from "../Img/HistoryBlood.png"

export default function DonationCard({ center, address, date, amount, status }) {
    const statusMap = {
        "Pending": { class: "donation-card__button--yellow", text: "Đã đặt lịch" },
        "Cancelled": { class: "donation-card__button--red", text: "Đã huỷ" },
        "Completed": { class: "donation-card__button--green", text: "Đã hiến" },
    };

    const statusInfo = statusMap[status] || statusMap["Pending"];

    return (
        <div className="donation-card">
            <div className="donation-card__left">
                <img src={HistoryBlood} alt="blood" className="donation-card__image" />
            </div>

            <div className="donation-card__middle">
                <div className="donation-card__center">{center}</div>

                <div className="donation-card__detail">
                    <MdLocationOn color="#3b82f6" size={20} />
                    <span>{address}</span>
                </div>

                <div className="donation-card__detail">
                    <AiFillCalendar color="#fbbf24" size={18} />
                    <span>{date}</span>
                </div>

                <div className="donation-card__detail">
                    <FaHeart color="#f87171" size={18} />
                    <span>{amount ? `${amount} ml` : "Chưa rõ"}</span>
                </div>
            </div>

            <div className="donation-card__right">
                <button className={`donation-card__button ${statusInfo.class}`} disabled>
                    {statusInfo.text}
                </button>
            </div>
        </div>
    );
}