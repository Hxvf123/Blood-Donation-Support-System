import React, { useEffect, useState } from "react";
import DonationCard from "./DonationCard";
import axios from "axios";
import { toast } from "react-toastify";

function DonationHistory() {
  const [history, setHistory] = useState([]);

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

  useEffect(() => {
    fetchData();
  }, []);

  const handleCancel = async (donationId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.accessToken;

    try {
      await axios.post(
        "http://localhost:5294/api/BloodDonation/cancel-donation",
        { donationId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Hủy đăng ký hiến máu thành công");
      fetchData();
    } catch (error) {
      toast.error("Hủy thất bại");
      console.error("Lỗi khi hủy đăng ký:", error);
    }
  };

  return (
    <div className="donation-history">
      {history.length === 0 ? (
        <p>Chưa có lịch sử hiến máu.</p>
      ) : (
        history.map((item) => (
          <DonationCard
            key={item.RegisterId}
            center={item.EventName}
            address={item.DonationLocation}
            date={item.RegisterDate}
            amount={item.Volume}
            status={item.Status}
            onCancel={() => handleCancel(item.RegisterId)} // truyền onCancel
          />
        ))
      )}
    </div>
  );
}

export default DonationHistory;
