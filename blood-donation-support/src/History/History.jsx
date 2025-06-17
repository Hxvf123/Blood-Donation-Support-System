import React from "react";
import DonationCard from "./DonationCard";
import "./History.scss";

const donationHistory = [
    {
        id: 1,
        center: "Trung tâm hiến máu Quốc gia",
        address: "123 Đường ABC, Quận 1",
        date: "12/06/2025",
        amount: 350, // ml
    },
    {
        id: 2,
        center: "Bệnh viện Chợ Rẫy",
        address: "201B Nguyễn Chí Thanh, Q.5",
        date: "22/04/2025",
        amount: 450,
    },
    {
        id: 3,
        center: "Viện Huyết học",
        address: "14 Trần Thái Tông, Cầu Giấy",
        date: "10/01/2025",
        amount: 250,
    },
];

export default function DonationHistory() {
    return (
        <div className="donation-history">
            <h2 className="donation-history__title">Lịch sử hiến máu</h2>
            {donationHistory.map((item) => (
                <DonationCard key={item.id} {...item} />
            ))}
        </div>
    );
}
