import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./BloodReceiveForm.css";

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

const BloodReceiveForm = ({ userId, onSuccess }) => {
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
    const fetchData = async () => {
      try {
        const bloodRes = await fetch("/api/blood-types");
        const compRes = await fetch("/api/blood-components");
        const bloodData = await bloodRes.json();
        const compData = await compRes.json();
        setBloodTypes(bloodData);
        setComponents(compData);
      } catch (err) {
        console.error("Lỗi tải dữ liệu:", err);
      }
    };
    fetchData();
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
      const formData = new FormData();
      formData.append("bloodTypeId", data.bloodTypeId);
      formData.append("componentTypeId", data.componentTypeId);
      formData.append("quantity", data.quantity);
      formData.append("requestDate", data.requestDate);
      formData.append("userId", userId);
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const res = await fetch("/api/blood-receive", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        alert("Gửi yêu cầu nhận máu thành công!");
        reset();
        setImageFile(null);
        onSuccess();
      } else {
        alert("Gửi yêu cầu thất bại.");
      }
    } catch (err) {
      console.error(err);
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
          <label>Nhóm máu có thể nhận từ:</label>
          <ul>
            {compatibleDonors.map((donor) => (
              <li key={donor.bloodTypeId}>{donor.bloodName}</li>
            ))}
          </ul>
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
        />
        {errors.requestDate && <p className="error">{errors.requestDate.message}</p>}
      </div>

      <div className="blood-form-group">
        <label>Tải ảnh liên quan đến bệnh lí (bắt buộc) </label>
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
