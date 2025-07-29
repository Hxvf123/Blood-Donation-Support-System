import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { differenceInYears } from "date-fns";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import axios from "axios";
import "./userInfoForm.scss";
import ROUTE_PATH from "../Constants/route";

const bloodTypes = [
  { id: "BTI001", name: "A+" },
  { id: "BTI002", name: "A−" },
  { id: "BTI003", name: "B+" },
  { id: "BTI004", name: "B−" },
  { id: "BTI005", name: "AB+" },
  { id: "BTI006", name: "AB−" },
  { id: "BTI007", name: "O+" },
  { id: "BTI008", name: "O−" },
];

const schema = yup.object({
  fullName: yup.string().required("Vui lòng nhập Họ và Tên"),

  birthDate: yup
    .date()
    .nullable()
    .required("Vui lòng chọn ngày sinh")
    .test("is-18-60", "Tuổi phải từ 18 đến 60", function (value) {
      if (!value) return false;
      const age = differenceInYears(new Date(), value);
      return age >= 18 && age <= 60;
    }),

  gender: yup.string().required("Vui lòng chọn giới tính"),

  phone: yup
    .string()
    .matches(/^(0|\+84)[3|5|7|8|9][0-9]{8}$/, "Số điện thoại không hợp lệ")
    .required("Vui lòng nhập số điện thoại"),

  email: yup.string().email("Email không hợp lệ").required("Vui lòng nhập email"),

  address: yup.string().required("Vui lòng nhập địa chỉ"),

  bloodGroup: yup.string().required("Vui lòng chọn nhóm máu"),
});

const UpdateInfo = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      birthDate: null,
      gender: "",
      phone: "",
      email: "",
      address: "",
      bloodGroup: "",
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user?.accessToken;


        const response = await axios.get("https://hienmau-se1864-eqfyh4edege7g5b0.koreacentral-01.azurewebsites.net/api/User/get-by-id", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = response.data.Data;

        if (data) {
          const bloodType = bloodTypes.find(bt => bt.id === data.BloodTypeId)?.name || "";
          const genderVN =
            data.Gender === "Male" ? "Nam" :
            data.Gender === "Female" ? "Nữ" :
            data.Gender || "";

          reset({
            fullName: data.FullName || "",
            birthDate: data.DayOfBirth ? new Date(data.DayOfBirth) : null,
            gender: genderVN,
            phone: data.PhoneNumber || "",
            email: data.Email || "",
            address: data.Address || "",
            bloodGroup: bloodType,
          });
        } else {
          toast.error("Không nhận được dữ liệu người dùng.");
        }
      } catch (error) {
        console.error("Không thể lấy thông tin người dùng:", error);
        toast.error("Không thể tải thông tin người dùng.");
      }
    };

    fetchUserInfo();
  }, [reset]);

  const onSubmit = async (formData) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.accessToken;

      if (!token) {
        toast.warning("Không tìm thấy accessToken. Vui lòng đăng nhập lại.");
        return;
      }

      const selectedBloodType = bloodTypes.find(bt => bt.name === formData.bloodGroup);
      const bloodTypeId = selectedBloodType ? selectedBloodType.id : null;
      const genderAPI =
        formData.gender === "Nam" ? "Male" :
        formData.gender === "Nữ" ? "Female" :
        formData.gender;

      const payload = {
        fullName: formData.fullName,
        dayOfBirth: formData.birthDate.toISOString().split("T")[0],
        gender: genderAPI,
        phoneNumber: formData.phone,
        email: formData.email,
        address: formData.address,
        bloodTypeId: bloodTypeId,
      };

      await axios.put("https://hienmau-se1864-eqfyh4edege7g5b0.koreacentral-01.azurewebsites.net/api/User/update-profile", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("payload",payload)
      const response = await axios.get("https://hienmau-se1864-eqfyh4edege7g5b0.koreacentral-01.azurewebsites.net/api/User/get-by-id", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const updatedUser = response.data.Data;

      if (updatedUser) {
        localStorage.setItem("user", JSON.stringify({
          ...user,
          userId: updatedUser.UserId,
          fullName: updatedUser.FullName,
          birthDate: updatedUser.DayOfBirth,
          gender: updatedUser.Gender,
          phone: updatedUser.PhoneNumber,
          email: updatedUser.Email,
          address: updatedUser.Address,
          bloodType: updatedUser.BloodTypeId,
        }));

        toast.success("Cập nhật thành công!");
        navigate(ROUTE_PATH.USER_INFO);
      } else {
        toast.error("Không thể lấy dữ liệu người dùng sau khi cập nhật.");
      }

    } catch (err) {
      toast.error("Cập nhật thất bại.");
      console.error(err);
    }
  };

  return (
    <div className="form-container">
      <h2>Cập nhật thông tin người dùng</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3 input-group">
          <Form.Label>Họ và tên</Form.Label>
          <Controller
            name="fullName"
            control={control}
            render={({ field }) => (
              <Form.Control
                {...field}
                placeholder="Nhập họ và tên"
                isInvalid={!!errors.fullName}
              />
            )}
          />
          <Form.Control.Feedback type="invalid">
            {errors.fullName?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3 input-group">
          <Form.Label>Ngày sinh</Form.Label>
          <Controller
            name="birthDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                {...field}
                selected={field.value}
                onChange={field.onChange}
                dateFormat="dd/MM/yyyy"
                className={`form-control ${errors.birthDate ? "is-invalid" : ""}`}
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                maxDate={new Date()}
                placeholderText="dd/MM/yyyy"
              />
            )}
          />
          <div className="invalid-feedback d-block">
            {errors.birthDate?.message}
          </div>
        </Form.Group>

        <Form.Group className="mb-3 input-group">
          <Form.Label>Giới tính</Form.Label>
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <Form.Select {...field} isInvalid={!!errors.gender}>
                <option value="">-- Chọn giới tính --</option>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
              </Form.Select>
            )}
          />
          <Form.Control.Feedback type="invalid">
            {errors.gender?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3 input-group">
          <Form.Label>Số điện thoại</Form.Label>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <Form.Control
                {...field}
                placeholder="Nhập số điện thoại"
                isInvalid={!!errors.phone}
              />
            )}
          />
          <Form.Control.Feedback type="invalid">
            {errors.phone?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3 input-group">
          <Form.Label>Email</Form.Label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Form.Control
                {...field}
                placeholder="Nhập email"
                type="email"
                isInvalid={!!errors.email}
              />
            )}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3 input-group">
          <Form.Label>Địa chỉ</Form.Label>
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <Form.Control
                {...field}
                placeholder="Nhập địa chỉ"
                isInvalid={!!errors.address}
              />
            )}
          />
          <Form.Control.Feedback type="invalid">
            {errors.address?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3 input-group">
          <Form.Label>Nhóm máu</Form.Label>
          <Controller
            name="bloodGroup"
            control={control}
            render={({ field }) => (
              <Form.Select {...field} isInvalid={!!errors.bloodGroup}>
                <option value="">-- Chọn nhóm máu --</option>
                {bloodTypes.map((bt) => (
                  <option key={bt.id} value={bt.name}>{bt.name}</option>
                ))}
              </Form.Select>
            )}
          />
          <Form.Control.Feedback type="invalid">
            {errors.bloodGroup?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <div className="buttons">
          <button type="submit" className="register-button continue-button">
            Cập nhật
          </button>
        </div>
      </Form>
    </div>
  );
};

export default UpdateInfo;
