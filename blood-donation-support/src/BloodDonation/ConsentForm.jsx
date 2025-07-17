import React, { useState, useEffect } from "react";
import './ConsentForm.scss';
import { toast } from 'react-toastify';
import axios from "axios";

const BloodDonationConsentForm = ({ data, onSubmit, onBack }) => {
  const [answers, setAnswers] = useState({
    q1: "", q2: "", q3: "", q4: "", q5: "", q6: "", q7: "",
    q8: "", q9: "", q10: "", q11: "", q12: "", q13: "", q14: "",
  });

  const [isIneligible, setIsIneligible] = useState(false);
  const [showReasonField, setShowReasonField] = useState(false);

  const handleChange = (question, value) => {
    setAnswers(prev => ({ ...prev, [question]: value }));
  };

  const answerToBool = (value) => value === "Có";

  const handleSubmit = async () => {
    const unanswered = Object.entries(answers).filter(([key, v]) => {
      if (key === "q14" && !showReasonField) return false;
      return v === "";
    });

    if (unanswered.length > 0) {
      toast.error("Vui lòng trả lời tất cả các câu hỏi trước khi đăng ký.");
      return;
    }

    if (isIneligible && !answers.q14.trim()) {
      toast.error("Vui lòng ghi rõ lý do nếu không đủ điều kiện hiến máu.");
      return;
    }

    const payload = {
      registerId: data?.registerId,
      userId: data?.userId,
      everDonated: answerToBool(answers.q1),
      chronicDisease: answerToBool(answers.q2),
      pastSevereIllness: answerToBool(answers.q3),
      surgeryLast12Months: answerToBool(answers.q4),
      riskBehaviorLast6Months: answerToBool(answers.q5),
      contactWithBlood: answerToBool(answers.q6),
      travelToEpidemicArea: answerToBool(answers.q7),
      fluSymptoms14Days: answerToBool(answers.q8),
      takingMedication7Days: answerToBool(answers.q9),
      pregnantOrBreastfeeding: answerToBool(answers.q10),
      abortionLast12Months: answerToBool(answers.q11),
      menstruation: answerToBool(answers.q12),
      hivTestConsent: answerToBool(answers.q13),
      reasonForPostpone: showReasonField ? answers.q14 : null,
    };

    try {
      const token = localStorage.getItem("accessToken"); // hoặc từ context

      const res = await axios.post(
        "http://localhost:5294/api/BloodDonation/screening-completion",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      toast.success("Đăng ký sàng lọc thành công!");
      if (onSubmit) onSubmit(res.data);
    } catch (error) {
      const errMsg = error?.response?.data?.message || "Lỗi khi gửi đơn sàng lọc.";
      toast.error(errMsg);
    }
  };

  const renderYesNoOptions = (name) => (
    <div className="yes-no-row">
      <label>
        <input type="radio" name={name} onChange={() => handleChange(name, "Có")} checked={answers[name] === "Có"} />
        Có
      </label>
      <label>
        <input type="radio" name={name} onChange={() => handleChange(name, "Không")} checked={answers[name] === "Không"} />
        Không
      </label>
    </div>
  );

  useEffect(() => {
    const riskQuestions = ["q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9", "q10", "q11", "q12"];
    const hasRisk = riskQuestions.some(q => answers[q] === "Có");
    setIsIneligible(hasRisk);
    setShowReasonField(hasRisk);
  }, [answers]);

  return (
    <div className="form-container">
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
        <span>4. Trong <strong>12 tháng</strong>, anh/chị có thực hiện phẫu thuật, truyền máu, xăm mình, xỏ khuyên không?</span>
        {renderYesNoOptions("q4")}
      </div>

      <div className="question">
        <span>5. Trong <strong>6 tháng</strong> gần đây, anh/chị có hành vi nguy cơ cao nhiễm HIV không?</span>
        {renderYesNoOptions("q5")}
      </div>

      <div className="question">
        <span>6. Anh/chị có từng tiếp xúc trực tiếp với máu người khác không?</span>
        {renderYesNoOptions("q6")}
      </div>

      <div className="question">
        <span>7. Anh/chị có đi đến khu vực có dịch bệnh truyền nhiễm không?</span>
        {renderYesNoOptions("q7")}
      </div>

      <div className="question">
        <span>8. Trong <strong>14 ngày</strong> gần đây, anh/chị có triệu chứng cảm cúm không?</span>
        {renderYesNoOptions("q8")}
      </div>

      <div className="question">
        <span>9. Trong <strong>7 ngày</strong> gần đây, anh/chị có đang sử dụng kháng sinh hoặc thuốc điều trị đặc biệt không?</span>
        {renderYesNoOptions("q9")}
      </div>

      <div className="question">
        <span>10. (Dành cho nữ) Chị đang mang thai hoặc đang cho con bú dưới 12 tháng tuổi không?</span>
        {renderYesNoOptions("q10")}
      </div>

      <div className="question">
        <span>11. (Dành cho nữ) Trong <strong>12 tháng</strong> gần đây, anh/chị có phá thai không?</span>
        {renderYesNoOptions("q11")}
      </div>

      <div className="question">
        <span>12. (Dành cho nữ) Hiện tại có đang trong kỳ kinh nguyệt không?</span>
        {renderYesNoOptions("q12")}
      </div>

      <div className="question">
        <span>13. Anh/chị có đồng ý thực hiện xét nghiệm HIV trên mẫu máu được lấy không?</span>
        {renderYesNoOptions("q13")}
      </div>

      {showReasonField && (
        <div className="question">
          <span>14. Vui lòng ghi rõ lí do:</span>
          <textarea
            name="q14"
            value={answers.q14}
            onChange={(e) => handleChange("q14", e.target.value)}
            placeholder="Nhập lý do tại đây..."
          />
        </div>
      )}

      <div className="buttons">
        <button className="register-button back-button" onClick={onBack}>Quay lại</button>
        <button className="register-button" onClick={handleSubmit}>Gửi đơn</button>
      </div>
    </div>
  );
};

export default BloodDonationConsentForm;
