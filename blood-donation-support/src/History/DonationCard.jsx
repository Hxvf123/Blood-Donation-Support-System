import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { AiFillCalendar } from "react-icons/ai";
import { Modal, Button } from "react-bootstrap";
import "./DonationCard.scss";
import HistoryBlood from "../Img/HistoryBlood.png";

export default function DonationCard({ center, address, date, amount, status, onCancel }) {
    const [showModal, setShowModal] = useState(false);

    const statusMap = {
        "Đã đặt lịch": { class: "donation-card__button--yellow", text: "Đã đặt lịch" },
        "Đã huỷ": { class: "donation-card__button--red", text: "Đã huỷ" },
        "Đã hiến": { class: "donation-card__button--green", text: "Đã hiến" },
    };

    const statusInfo = statusMap[status] || statusMap["Đã đặt lịch"];

    const handleConfirm = () => {
        setShowModal(false);
        onCancel?.();
    };

    return (
        <>
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
                        <span>{amount} ml</span>
                    </div>
                </div>

                <div className="donation-card__right">
                    <div className="donation-card__button-group">
                        <button className={`donation-card__button ${statusInfo.class}`} disabled>
                            {statusInfo.text}
                        </button>

                        {status === "Đã đặt lịch" && (
                            <button
                                className="donation-card__button donation-card__button--cancel"
                                onClick={() => setShowModal(true)}
                            >
                                Hủy
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal xác nhận hủy */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận hủy đăng ký</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc chắn muốn <strong>hủy đăng ký hiến máu</strong> này không?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Đóng
                    </Button>
                    <Button variant="danger" onClick={handleConfirm}>
                        Xác nhận hủy
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
