import React, { useState, useEffect } from "react";
import './BloodDonationConsentForm.css';
import { toast } from 'react-toastify';

const BloodDonationConsentForm = ({ data, onSubmit, onBack }) => {
  const [answers, setAnswers] = useState({
    q1: "", q2: "", q3: "", q4a: "", q4b: "", q4c: "", q4d: "",
    q5: "", q6: "", q7: "",
  });

  const [isIneligible, setIsIneligible] = useState(false);

  const handleChange = (question, value) => {
    setAnswers(prev => ({ ...prev, [question]: value }));
  };

  const handleSubmit = async () => {
    const unanswered = Object.entries(answers).filter(([_, v]) => v === "");
    if (unanswered.length > 0) {
      toast.error("⚠️ Vui lòng trả lời tất cả các câu hỏi trước khi đăng ký.");
      return;
    }

    if (isIneligible) {
      toast.error("❌ Bạn không đủ điều kiện để hiến máu.");
      return;
    }

    try {
      await onSubmit({ ...data, healthAnswers: answers });
      toast.success("✅ Đăng ký hiến máu thành công! Cảm ơn bạn 💖");
    } catch (error) {
      toast.error("😓 Đăng ký thất bại. Vui lòng thử lại sau.");
    }
  };

  const renderYesNoOptions = (name) => (
    <div className="yes-no-row">
      <label><input type="radio" name={name} onChange={() => handleChange(name, "Có")} /> Có</label>
      <label><input type="radio" name={name} onChange={() => handleChange(name, "Không")} /> Không</label>
    </div>
  );

  useEffect(() => {
    const riskQuestions = ["q2", "q3", "q4a", "q4b", "q4c", "q5", "q6"];
    const hasRisk = riskQuestions.some(q => answers[q] === "Có");
    setIsIneligible(hasRisk);
  }, [answers]);

  return (
    <div className="form-consentForm">
      <h2>Đơn đăng kí hiến máu</h2>

      <div className="question">
        <span>1. Anh/Chị đã từng hiến máu chưa?</span>
        {renderYesNoOptions("q1")}
      </div>

      <div className="question">
        <span>2. Hiện tại anh/chị có đang mắc bệnh cấp tính hoặc mãn tính không?</span>
        {renderYesNoOptions("q2")}
      </div>

      <div className="question">
        <span>3. Anh/chị có từng mắc các bệnh truyền nhiễm nghiêm trọng không?</span>
        {renderYesNoOptions("q3")}
      </div>

      <div className="question">
        <span>4. Trong vòng <strong>6 tháng</strong> gần đây, anh/chị có:</span>

        <div className="sub-question-row">
          <span className="sub-question">a. Phẫu thuật, truyền máu, xăm mình, xỏ khuyên?</span>
          {renderYesNoOptions("q4a")}
        </div>

        <div className="sub-question-row">
          <span className="sub-question">b. Quan hệ tình dục không an toàn hoặc có nguy cơ cao nhiễm HIV?</span>
          {renderYesNoOptions("q4b")}
        </div>

        <div className="sub-question-row">
          <span className="sub-question">c. Sử dụng ma túy hoặc chất kích thích qua đường tiêm?</span>
          {renderYesNoOptions("q4c")}
        </div>

        <div className="sub-question-row">
          <span className="sub-question">d. Không có yếu tố trên?</span>
          {renderYesNoOptions("q4d")}
        </div>
      </div>


      <div className="question">
        <span>5. Trong <strong>14 ngày</strong> gần đây, anh/chị có cảm cúm?</span>
        {renderYesNoOptions("q5")}
      </div>

      <div className="question">
        <span>6. Trong <strong>7 ngày</strong> gần đây, anh/chị có dùng kháng sinh hoặc thuốc điều trị đặc biệt (Corticoid)?</span>
        {renderYesNoOptions("q6")}
      </div>

      <div className="question">
        <span>7. (Dành cho nữ giới) Hiện có thai, hoặc nuôi con dưới 12 tháng tuổi?</span>
        {renderYesNoOptions("q7")}
      </div>

      <div className="buttons">
        <button className="register-button back-button" onClick={onBack}>Quay lại</button>
        <button className="register-button" onClick={handleSubmit}>Đăng ký</button>
      </div>
    </div>
  );
};

export default BloodDonationConsentForm;
