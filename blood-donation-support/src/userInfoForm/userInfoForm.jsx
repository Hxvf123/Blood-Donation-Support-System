import React, { useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import DatePicker from 'react-datepicker';
import './userInfoForm.scss';
import { differenceInYears } from 'date-fns';
import axios from 'axios';
import { toast } from 'react-toastify';

const bloodTypes = [
  { id: "BTI001", name: "A+" },
  { id: "BTI002", name: "A−" },
  { id: "BTI003", name: "B+" },
  { id: "BTI004", name: "B−" },
  { id: "BTI005", name: "AB+" },
  { id: "BTI006", name: "AB−" },
  { id: "BTI007", name: "O+" },
  { id: "BTI008", name: "O−" }
];

const schema = yup.object({
  fullName: yup.string().required(),
  birthDate: yup
    .date()
    .nullable()
    .required()
    .test('is-18', '', (value) => value && differenceInYears(new Date(), value) >= 18),
  gender: yup.string().required(),
  phone: yup.string().required(),
  email: yup.string().email().required(),
  address: yup.string().required(),
  bloodGroup: yup.string().required(),
}).required();

const UserInfoForm = ({ onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      fullName: '',
      birthDate: null,
      gender: '',
      phone: '',
      email: '',
      address: '',
      bloodGroup: '',
    },
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = user?.accessToken;

        if (!token) {
          toast.warning("Không tìm thấy accessToken. Vui lòng đăng nhập lại.");
          return;
        }

        const response = await axios.get("http://localhost:5294/api/User/get-by-id", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = response.data.Data;

        if (data) {
  reset({
    fullName: data.FullName || '',
    birthDate: data.DayOfBirth ? new Date(data.DayOfBirth) : null,
    gender: data.Gender || '',
    phone: data.PhoneNumber || '',
    email: data.Email || '',
    address: data.Address || '',
    bloodGroup: data.BloodTypeId || '',
  });
} else {
  toast.error("Không nhận được dữ liệu người dùng.");
}
      } catch (error) {
        console.error('Không thể lấy thông tin người dùng:', error);
        toast.error('Không thể tải thông tin người dùng.');
      }
    };

    fetchUserInfo();
  }, [reset]);

  const onHandleSubmit = (data) => {
    if (onSubmit) {
      onSubmit(data); // chuyển sang trang update
    }
  };

  return (
    <div className="form-container">
      <h2>Thông Tin Của Bạn</h2>
      <Form onSubmit={handleSubmit(onHandleSubmit)}>
        <Form.Group className="mb-3 input-group">
          <Form.Label>Họ và tên</Form.Label>
          <Controller
            name="fullName"
            control={control}
            render={({ field }) => (
              <Form.Control {...field} type="text" disabled />
            )}
          />
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
                className="form-control"
                disabled
              />
            )}
          />
        </Form.Group>

        <Form.Group className="mb-3 input-group">
          <Form.Label>Giới tính</Form.Label>
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <Form.Select {...field} disabled>
                <option value="">--Chọn--</option>
                <option value="Male">Nam</option>
                <option value="Female">Nữ</option>
              </Form.Select>
            )}
          />
        </Form.Group>

        <Form.Group className="mb-3 input-group">
          <Form.Label>Số điện thoại</Form.Label>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <Form.Control {...field} type="tel" disabled />
            )}
          />
        </Form.Group>

        <Form.Group className="mb-3 input-group">
          <Form.Label>Email</Form.Label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Form.Control {...field} type="email" disabled />
            )}
          />
        </Form.Group>

        <Form.Group className="mb-3 input-group">
          <Form.Label>Địa chỉ</Form.Label>
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <Form.Control {...field} type="text" disabled />
            )}
          />
        </Form.Group>

        <Form.Group className="mb-3 input-group">
          <Form.Label>Nhóm máu</Form.Label>
          <Controller
            name="bloodGroup"
            control={control}
            render={({ field }) => (
              <Form.Select {...field} disabled>
                <option value="">-- Chọn nhóm máu --</option>
                {bloodTypes.map(bt => (
                  <option key={bt.id} value={bt.id}>{bt.name}</option>
                ))}
              </Form.Select>
            )}
          />
        </Form.Group>

        <div className="buttons">
          <button type="submit" className="register-button">
            Cập nhật thông tin
          </button>
        </div>
      </Form>
    </div>
  );
};

export default UserInfoForm;
