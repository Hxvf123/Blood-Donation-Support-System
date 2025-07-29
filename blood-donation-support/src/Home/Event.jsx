import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Event.scss';
import { Button, Modal } from "react-bootstrap"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const AllEventsPage = () => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchEvents = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = user?.accessToken;

        const res = await axios.get("https://hienmau-se1864-eqfyh4edege7g5b0.koreacentral-01.azurewebsites.net/GetAllEvents", {
          headers: { Authorization: `Bearer ${token}` }
        });

        const fetchedEvents = res.data?.Data;

        if (!Array.isArray(fetchedEvents)) {
          console.warn("Events không phải là mảng hợp lệ:", fetchedEvents);
          setEvents([]);
        } else {
          const formattedEvents = fetchedEvents.map((ev) => ({
            eventId: ev.EventId,
            eventName: ev.EventName,
            donationLocation: ev.DonationLocation,
            startDate: ev.StartDate,
            endDate: ev.EndDate,
            description: ev.Description,
            img: ev.Img,
          }));
          setEvents(formattedEvents);
        }

      } catch (err) {
        console.error("Lỗi khi tải danh sách sự kiện:", err);
        alert("Không thể tải danh sách sự kiện hiến máu.");
      }
    };

        fetchEvents();
    }, []);

    const handleCardClick = (event) => {
        setSelectedEvent(event);
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
        setSelectedEvent(null);
    };

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('vi-VN'); // xuất ra định dạng: dd/mm/yyyy
    };
    return (
        <div className="events-page" id="event-section">
            <h2 className="title text-black">SỰ KIỆN</h2>
            <Swiper
                modules={[Navigation]}
                spaceBetween={20}
                slidesPerView={3}
                navigation
                loop
                className="event-slider"
            >
                {events.map((event) => (
                    <SwiperSlide key={event.id}>
                        <div
                            className="event-card"
                            onClick={() => handleCardClick(event)}
                            style={{ cursor: 'pointer' }}
                        >
                            <img src={event.imageUrl} alt={event.name} className="event-image" />
                            <div className="event-content">
                                <h3>{event.name}</h3>
                                <p><strong>Thời gian:</strong> {formatDate(event.startDate)} - {formatDate(event.endDate)}</p>
                                <p><strong>Địa điểm:</strong> {event.location}</p>
                                <p>{event.description}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Modal hiển thị chi tiết */}
            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedEvent?.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedEvent && (
                        <>
                            <img
                                src={selectedEvent.imageUrl}
                                alt={selectedEvent.name}
                                className="img-fluid mb-3"
                            />
                            <p><strong>Thời gian:</strong> {formatDate(selectedEvent.startDate)} - {formatDate(selectedEvent.endDate)}</p>
                            <p><strong>Địa điểm:</strong> {selectedEvent.location}</p>
                            <p><strong>Mô tả:</strong> {selectedEvent.description}</p>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AllEventsPage;