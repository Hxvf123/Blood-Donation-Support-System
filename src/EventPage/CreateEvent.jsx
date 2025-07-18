import React from "react";
import { useForm } from "react-hook-form";
import "./CreateEvent.css";

const CreateEventPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Submitted Event Data:", data);
    alert("Sự kiện đã được tạo!");
    reset();
  };

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
    </div>
  );
};

export default CreateEventPage;
