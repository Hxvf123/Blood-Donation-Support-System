import React, { useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import './userInfoForm.scss';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import ROUTE_PATH from '../Constants/route';

const bloodTypes = [
  { id: "BTI001", name: "A+" },
  { id: "BTI002", name: "A−" },
  { id: "BTI003", name: "B+" },
  { id: "BTI004", name: "B−" },
  { id: "BTI005", name: "O+" },
  { id: "BTI006", name: "O−" },
  { id: "BTI007", name: "AB+" },
  { id: "BTI008", name: "AB−" }
];

const UserInfoForm = () => {
  const {
    control,
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
  });

  const navigate = useNavigate();

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
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data.data;

        reset({
          fullName: data.fullName || '',
          birthDate: data.dayOfBirth ? new Date(data.dayOfBirth) : null,
          gender: data.gender || '',
          phone: data.phoneNumber || '',
          email: data.email || '',
          address: data.address || '',
          bloodGroup: data.bloodTypeId || '',
        });
      } catch (error) {
        console.error('Không thể lấy thông tin người dùng:', error);
        toast.error('Không thể tải thông tin người dùng.');
      }
    };

    fetchUserInfo();
  }, [reset]);

  return (
    <div className="form-container">
      <h2>Thông Tin Của Bạn</h2>
      <Form>
        {/* Họ và tên */}
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

        {/* Ngày sinh */}
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

        {/* Giới tính */}
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

        {/* Số điện thoại */}
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

        {/* Email */}
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

        {/* Địa chỉ */}
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

        {/* Nhóm máu */}
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

        {/* Nút chuyển trang */}
        <div className="buttons">
          <button
            type="button"
            className="register-button"
            onClick={() => navigate(ROUTE_PATH.UPDATE)}
          >
            Chỉnh sửa thông tin
          </button>
        </div>
      </Form>
    </div>
  );
};

export default UserInfoForm;
