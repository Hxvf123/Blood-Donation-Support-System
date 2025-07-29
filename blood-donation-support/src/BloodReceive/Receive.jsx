import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./Receive.scss";
import { toast } from "react-toastify";

const staticBloodTypes = [
  { bloodTypeId: "BTI001", bloodName: "A+", compatibleFrom: ["BTI001", "BTI005"] },
  { bloodTypeId: "BTI002", bloodName: "A-", compatibleFrom: ["BTI002", "BTI006"] },
  { bloodTypeId: "BTI003", bloodName: "B+", compatibleFrom: ["BTI003", "BTI005"] },
  { bloodTypeId: "BTI004", bloodName: "B-", compatibleFrom: ["BTI004", "BTI006"] },
  { bloodTypeId: "BTI005", bloodName: "AB+", compatibleFrom: ["BTI001", "BTI003", "BTI005", "BTI007"] },
  { bloodTypeId: "BTI006", bloodName: "AB-", compatibleFrom: ["BTI002", "BTI004", "BTI006", "BTI008"] },
  { bloodTypeId: "BTI007", bloodName: "O+", compatibleFrom: ["BTI005"] },
  { bloodTypeId: "BTI008", bloodName: "O-", compatibleFrom: ["BTI006"] }
];

const staticComponents = [
  { componentTypeId: "BCT003", componentName: "Huyết tương" },
  { componentTypeId: "BCT004", componentName: "Tiểu cầu" },
  { componentTypeId: "BCT002", componentName: "Hồng cầu" },
  { componentTypeId: "BCT001", componentName: "Máu toàn phần" },
];



const schema = yup.object().shape({
  bloodTypeId: yup.string().required("Vui lòng chọn nhóm máu"),
  componentTypeId: yup.string().required("Vui lòng chọn loại chế phẩm"),
  quantity: yup
    .number()
    .typeError("Vui lòng nhập số")
    .positive("Phải lớn hơn 0")
    .required("Vui lòng nhập số lượng"),
  requestDate: yup.string().required("Vui lòng chọn ngày"),
});

const BloodReceiveForm = ({ onSuccess }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [bloodTypes, setBloodTypes] = useState([]);
  const [components, setComponents] = useState([]);
  const [selectedBloodType, setSelectedBloodType] = useState("");
  const [compatibleDonors, setCompatibleDonors] = useState([]);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {

    setBloodTypes(staticBloodTypes);
    setComponents(staticComponents);
  }, []);

  const handleBloodTypeChange = (e) => {
    const selectedId = e.target.value;
    setSelectedBloodType(selectedId);

    const selected = bloodTypes.find((b) => b.bloodTypeId === selectedId);
    if (selected && selected.compatibleFrom) {
      const compatible = bloodTypes.filter((b) =>
        selected.compatibleFrom.includes(b.bloodTypeId)
      );
      setCompatibleDonors(compatible);
    } else {
      setCompatibleDonors([]);
    }
  };

  const onSubmit = async (data) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.accessToken;

      const formData = new FormData();
      formData.append("bloodTypeId", data.bloodTypeId);
      formData.append("componentTypeId", data.componentTypeId);
      formData.append("quantity", data.quantity);
      formData.append("requestDate", data.requestDate);
      if (imageFile) {
        formData.append("img", imageFile); // đúng tên field backend
      }

      const res = await fetch("https://hienmau-se1864-eqfyh4edege7g5b0.koreacentral-01.azurewebsites.net/api/BloodReceive/register-receive", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const result = await res.json();
        toast.success("Gửi yêu cầu nhận máu thành công!");
        reset();
        setImageFile(null);
        onSuccess && onSuccess();
      } else {
        const err = await res.json();
        alert("Gửi yêu cầu thất bại: " + err.error);
      }
    } catch (err) {
      console.error("Lỗi khi gửi yêu cầu:", err);
      alert("Lỗi kết nối server.");
    }
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="blood-form">
      <h2 className="blood-form-title">Đăng ký nhận máu</h2>

      <div className="blood-form-group">
        <label>Nhóm máu</label>
        <select {...register("bloodTypeId")} onChange={handleBloodTypeChange}>
          <option value="">-- Chọn nhóm máu --</option>
          {bloodTypes.map((b) => (
            <option key={b.bloodTypeId} value={b.bloodTypeId}>
              {b.bloodName}
            </option>
          ))}
        </select>
        {errors.bloodTypeId && <p className="error">{errors.bloodTypeId.message}</p>}
      </div>

      {selectedBloodType && compatibleDonors.length > 0 && (
        <div className="blood-form-group">
          <label>Có thể nhận máu từ:</label>
          <div>
            {compatibleDonors.map((donor) => (
              <div key={donor.bloodTypeId}>{donor.bloodName}</div>
            ))}
          </div>
        </div>
      )}

      <div className="blood-form-group">
        <label>Loại chế phẩm</label>
        <select {...register("componentTypeId")}>
          <option value="">-- Chọn loại chế phẩm --</option>
          {components.map((c) => (
            <option key={c.componentTypeId} value={c.componentTypeId}>
              {c.componentName}
            </option>
          ))}
        </select>
        {errors.componentTypeId && <p className="error">{errors.componentTypeId.message}</p>}
      </div>

      <div className="blood-form-group">
        <label>Số lượng (ml)</label>
        <input type="number" {...register("quantity")} placeholder="VD: 450" />
        {errors.quantity && <p className="error">{errors.quantity.message}</p>}
      </div>

      <div className="blood-form-group">
        <label>Ngày yêu cầu</label>
        <input
          type="date"
          {...register("requestDate")}
          defaultValue={new Date().toISOString().split("T")[0]}
          min={new Date().toISOString().split("T")[0]}
        />
        {errors.requestDate && <p className="error">{errors.requestDate.message}</p>}
      </div>

      <div className="blood-form-group">
        <label>Tải ảnh liên quan đến bệnh lý (bắt buộc)</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
        />
      </div>

      <button type="submit" className="blood-submit-btn">Gửi yêu cầu</button>
    </form>
  );
};

export default BloodReceiveForm;
