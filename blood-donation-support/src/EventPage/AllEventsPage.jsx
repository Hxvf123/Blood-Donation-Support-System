import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AllEventsPage.css';

const AllEventsPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5294/api/events'); 
        setEvents(response.data);
      } catch (error) {
        console.error('Lỗi khi tải sự kiện:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="events-page">
      <h2 className="title">TẤT CẢ SỰ KIỆN</h2>
      <div className="event-list">
        {events.map((event) => (
          <div className="event-card" key={event.id}>
            <img src={event.imageUrl} alt={event.name} className="event-image" />
            <div className="event-content">
              <h3>{event.name}</h3>
              <p><strong>Thời gian:</strong> {event.startDate} - {event.endDate}</p>
              <p><strong>Địa điểm:</strong> {event.location}</p>
              <p>{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllEventsPage;
