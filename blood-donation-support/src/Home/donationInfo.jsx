import React, { useState } from "react";
import "./donationInfo.scss";


import who from "../Img/who_donation.png";
import process from "../Img/process.png";
import notation from "../Img/notation.png";

const DonationInfo = () => {
    const tabs = [
        {
            id: 1,
            label: "Ai có thể hiến máu?",
            icon: who,
            content: (
                <ul>
                    <li>Người khỏe mạnh trong độ tuổi từ đủ 18 đến 60 tuổi</li>
                    <li>Cân nặng: Nam ≥ 45 kg, Nữ ≥ 45 kg</li>
                    <li>
                        Thời gian tối thiểu giữa 2 lần hiến máu là 12 tuần đối với cả Nam và Nữ
                    </li>
                    <li>Không nghiện ma túy, rượu bia và các chất kích thích</li>
                    <li>
                        Không mắc các bệnh mãn tính hoặc cấp tính về tim mạch, huyết áp, hô hấp, dạ dày...
                    </li>
                    <li>
                        Không mắc hoặc không có các hành vi nguy cơ lây nhiễm HIV, viêm gan B, viêm gan C,
                        và các virus lây qua đường truyền máu
                    </li>
                </ul>
            ),
        },
        {
            id: 2,
            label: "Quy trình hiến máu",
            icon: process,
            content: (
                <ul>
                    <li>Đăng ký tại điểm tiếp nhận</li>
                    <li>Khám sàng lọc sức khỏe</li>
                    <li>Hiến máu trong 5–10 phút</li>
                    <li>Nghỉ ngơi, nhận giấy chứng nhận và quà</li>
                </ul>
            ),
        },
        {
            id: 3,
            label: "Những điều cần lưu ý",
            icon: notation,
            content: (
                <ul>
                    <li>Ngủ đủ giấc và ăn nhẹ trước khi hiến máu</li>
                    <li>Không uống rượu bia, hút thuốc trước khi hiến</li>
                    <li>Nghỉ ngơi ít nhất 10 phút sau khi hiến máu</li>
                    <li>Không vận động mạnh trong ngày hiến</li>
                </ul>
            ),
        },
    ];

    const [selectedTab, setSelectedTab] = useState(tabs[0]);

    return (
        <div className="donation-info">
            <div className="donation-info__sidebar">
                {tabs.map((tab) => (
                    <div
                        key={tab.id}
                        className={`tab-box ${selectedTab.id === tab.id ? "active" : ""}`}
                        onClick={() => setSelectedTab(tab)}
                    >
                        <img src={tab.icon} alt={tab.label} className="tab-icon" />
                        <span className="tab-label">{tab.label}</span>
                    </div>
                ))}
            </div>

            <div className="donation-info__detail">
                <div className="tab-content">{selectedTab.content}</div>
            </div>
        </div>
    );
};

export default DonationInfo;
