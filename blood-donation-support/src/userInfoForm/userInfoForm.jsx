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

const schema = yup.object({
  fullName: yup.string().required('Vui lòng nhập Họ và Tên'),
  birthDate: yup
    .date()
    .nullable()
    .required('Vui lòng chọn ngày sinh')
    .test('is-18', 'Bạn phải đủ 18 tuổi', (value) => {
      return value && differenceInYears(new Date(), value) >= 18;
    }),
  gender: yup.string().required('Vui lòng chọn giới tính'),
  phone: yup
    .string()
    .matches(/^(0|\+84)[3|5|7|8|9][0-9]{8}$/, 'Số điện thoại không hợp lệ')
    .required('Bắt buộc nhập số điện thoại'),
  email: yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
  address: yup.string().required('Vui lòng nhập địa chỉ'),
  bloodGroup: yup.string().required('Vui lòng nhập nhóm máu'),
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
        // 👉 Lấy accessToken từ localStorage
        const accessToken = JSON.parse(localStorage.getItem("user"))?.accessToken;

        if (!accessToken) {
          toast.error('Không tìm thấy accessToken. Vui lòng đăng nhập lại.');
          return;
        }

        const response = await axios.get('http://localhost:5294/api/User/get-by-id', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
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

  const onHandleSubmit = (data) => {
    if (onSubmit) {
      onSubmit(data);
    }
  };

  return (
    <div className="form-container">
      <h2>Thông Tin Của Bạn</h2>
      <Form onSubmit={handleSubmit(onHandleSubmit)}>
        {/* fullName */}
        <Form.Group className="mb-3 input-group">
          <Form.Label>Họ và tên</Form.Label>
          <Controller
            name="fullName"
            control={control}
            render={({ field }) => (
              <Form.Control {...field} type="text" placeholder="Nhập họ và tên" isInvalid={!!errors.fullName} />
            )}
          />
          <Form.Control.Feedback type="invalid">{errors.fullName?.message}</Form.Control.Feedback>
        </Form.Group>

        {/* birthDate */}
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
                placeholderText="dd/MM/yyyy"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                className={`form-control ${errors.birthDate ? 'is-invalid' : ''}`}
                maxDate={new Date()}
                autoComplete="off"
              />
            )}
          />
          <div className="invalid-feedback d-block">{errors.birthDate?.message}</div>
        </Form.Group>

        {/* gender */}
        <Form.Group className="mb-4 gender-group input-group">
          <Form.Label>Giới tính</Form.Label>
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <Form.Select {...field} isInvalid={!!errors.gender}>
                <option value="">--Chọn--</option>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
              </Form.Select>
            )}
          />
          <Form.Control.Feedback type="invalid">{errors.gender?.message}</Form.Control.Feedback>
        </Form.Group>

        {/* phone */}
        <Form.Group className="mb-3 input-group">
          <Form.Label>Số điện thoại</Form.Label>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <Form.Control {...field} type="tel" placeholder="Nhập số điện thoại" isInvalid={!!errors.phone} />
            )}
          />
          <Form.Control.Feedback type="invalid">{errors.phone?.message}</Form.Control.Feedback>
        </Form.Group>

        {/* email */}
        <Form.Group className="mb-3 input-group">
          <Form.Label>Email</Form.Label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Form.Control {...field} type="email" placeholder="Nhập email" isInvalid={!!errors.email} />
            )}
          />
          <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
        </Form.Group>

        {/* address */}
        <Form.Group className="mb-3 input-group">
          <Form.Label>Địa chỉ</Form.Label>
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <Form.Control {...field} type="text" placeholder="Nhập địa chỉ" isInvalid={!!errors.address} />
            )}
          />
          <Form.Control.Feedback type="invalid">{errors.address?.message}</Form.Control.Feedback>
        </Form.Group>

        {/* bloodGroup */}
        <Form.Group className="mb-3 input-group">
          <Form.Label>Nhóm máu</Form.Label>
          <Controller
            name="bloodGroup"
            control={control}
            render={({ field }) => (
              <Form.Select {...field} isInvalid={!!errors.bloodGroup}>
                <option value="">-- Chọn nhóm máu --</option>
                <option value="A+">A+</option>
                <option value="A-">A−</option>
                <option value="B+">B+</option>
                <option value="B-">B−</option>
                <option value="O+">O+</option>
                <option value="O-">O−</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB−</option>
              </Form.Select>
            )}
          />
          <Form.Control.Feedback type="invalid">{errors.bloodGroup?.message}</Form.Control.Feedback>
        </Form.Group>

        {/* submit button */}
        <div className="buttons">
          <button type="submit" className="register-button">
            Lưu thông tin
          </button>
        </div>
      </Form>
    </div>
  );
};

export default UserInfoForm;
