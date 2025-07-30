import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./CreateEvent.scss";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const CreateEventPage = () => {
  const [isAuthorized, setIsAuthorized] = useState(null); // null = loading, true/false = xác định quyền

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.role === "Manager") {
      setIsAuthorized(true);
    } else {
      toast.error("Bạn không có quyền truy cập trang này.");
      setIsAuthorized(false);
    }
  }, []);

  const onSubmit = async (data) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.accessToken;

    if (!token) {
      toast.warning("Không tìm thấy accessToken. Vui lòng đăng nhập lại.");
      return;
    }

    const formData = new FormData();
    formData.append("eventName", data.eventName);
    formData.append("startDate", data.startDate);
    formData.append("endDate", data.endDate);
    formData.append("description", data.description);
    formData.append("donationLocation", data.location);
    formData.append("img", data.image[0]);

    try {
      const response = await axios.post(
        "https://hienmau-se1864-eqfyh4edege7g5b0.koreacentral-01.azurewebsites.net/create-event",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Sự kiện đã được tạo!");
        reset();
      } else {
        toast.error("Tạo sự kiện thất bại.");
      }
    } catch (error) {
      console.error("API Error:", error);
      toast.error("Lỗi khi gọi API.");
    }
  };

  if (isAuthorized === null) return null;

  if (!isAuthorized) {
    return (
      <div className="create-event-page">
        <ToastContainer />
        <h2 style={{ color: "red", textAlign: "center", marginTop: "100px" }}>
          Bạn không có quyền truy cập trang này.
        </h2>
      </div>
    );
  }

  return (
    <div className="create-event-page">
      <div className="create-event-content">
        <div className="create-event-container">
          <h2>Tạo Sự Kiện Mới</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="event-form">
            <div className="form-group">
              <label>Tên sự kiện</label>
              <input
                type="text"
                {...register("eventName", { required: "Tên sự kiện không được để trống" })}
              />
              {errors.eventName && <p className="error">{errors.eventName.message}</p>}
            </div>

            <div className="form-group">
              <label>Ngày bắt đầu</label>
              <input
                type="date"
                {...register("startDate", { required: "Vui lòng chọn ngày bắt đầu" })}
              />
              {errors.startDate && <p className="error">{errors.startDate.message}</p>}
            </div>

            <div className="form-group">
              <label>Ngày kết thúc</label>
              <input
                type="date"
                {...register("endDate", { required: "Vui lòng chọn ngày kết thúc" })}
              />
              {errors.endDate && <p className="error">{errors.endDate.message}</p>}
            </div>

            <div className="form-group">
              <label>Ảnh sự kiện</label>
              <input type="file" {...register("image", { required: "Vui lòng chọn ảnh" })} />
              {errors.image && <p className="error">{errors.image.message}</p>}
            </div>

            <div className="form-group">
              <label>Mô tả</label>
              <textarea
                rows="4"
                {...register("description", { required: "Vui lòng nhập mô tả" })}
              />
              {errors.description && <p className="error">{errors.description.message}</p>}
            </div>

            <div className="form-group">
              <label>Địa chỉ</label>
              <input
                type="text"
                {...register("location", { required: "Vui lòng nhập địa chỉ" })}
              />
              {errors.location && <p className="error">{errors.location.message}</p>}
            </div>

            <button type="submit" className="submit-btn">Tạo sự kiện</button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreateEventPage;
