import React, { useEffect, useState } from "react";
import DonationCard from "./DonationCard";
import axios from "axios";

function DonationHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.accessToken;

      try {
        const res = await axios.get("http://localhost:5294/api/User/get-history-donation", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setHistory(res.data?.data || []);
      } catch (error) {
        console.error("Lỗi khi tải lịch sử hiến máu:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="donation-history">
      {history.length === 0 ? (
        <p>Chưa có lịch sử hiến máu.</p>
      ) : (
        history.map((item) => (
          <DonationCard
            key={item.registerId}
            center={item.eventName}
            address={item.donationLocation}
            date={item.registerDate}
            amount={item.volume}
            status={item.status}
          />
        ))
      )}
    </div>
  );
}

export default DonationHistory;